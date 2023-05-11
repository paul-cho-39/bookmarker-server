import { write } from '../../../config/action';
import {
   BookData,
   BookRelationTypes,
   FinishedBookUpdateProps,
} from '../../../controllers/types/books';

// export type PostLibraryAction = typeof getFinishedDates | typeof editBooks;
// export type BookActionFunc<Func extends PostLibraryAction> = Func;

// lets run a speed test for fitting everthing under one go
export default class BookWrite {
   private uid: string;
   private id?: string | undefined;
   private data?: BookData | FinishedBookUpdateProps;
   constructor(uid: string, id?: string, book?: BookData) {
      this.uid = uid;
      this.data = book;
      this.id = id;
   }

   //  have this and execute with id in another class?
   private async _executeQuery(cypher: string, params: Record<string, any>) {
      const id = this.data?.data.id;
      return write(cypher, { ...params, uid: this.uid, id: !id ? this.id : id });
   }

   private async _executeQueryWithoutUid(cypher: string, params: Record<string, any>) {
      const id = this.data?.data.id;
      return write(cypher, { ...params, id: !id ? this.id : id });
   }

   public async editBook(relType: BookRelationTypes) {
      await this._executeQuery(
         `
      MATCH (u:User { uid: $uid })
      OPTIONAL MATCH (b:Book { id: $id })
      WITH u, b
      CALL apoc.do.case(
        [
          b is NOT NULL, 
          "MATCH (u)-[r]-(b) 
          CALL apoc.refactor.setType(r, relType) YIELD input, output 
          RETURN input, output",
          b is NULL,
          'MERGE (new:Book { id: id}) ON CREATE SET new = data 
          WITH u, new CALL apoc.create.relationship(u, $relType, { dateAdded: datetime() }, new )
          YIELD rel RETURN rel'
        ], 
        'CREATE (u)-[:READING]->(b)', 
        {
          u: u, 
          b: b, 
          id: $id,
          relType: $relType, 
          data: $data 
        }
      )
      YIELD value
      RETURN value
      `,
         {
            relType: relType,
            data: this.data?.data,
         }
      );
   }

   public async initiatePrimaryBookSelection() {
      await this._executeQuery(
         `
      MATCH (user:User { uid: $uid })-[rel:CURRENTLY_READING]-(b:Book {id: $id })
      CALL apoc.refactor.setType(rel,"CURRENTLY_READING:PRIMARY") yield input, output
      RETURN input, output
      `,
         {}
      );
   }

   public async changePrimaryBook() {
      await this._executeQuery(
         `
      MATCH (user:User { uid: $uid })-[rel:CURRENTLY_READING]-(b:Book {id: $id })
      OPTIONAL MATCH (user)-[rel2]-(primary:Book) WHERE type(rel2) = "CURRENTLY_READING:PRIMARY"
      WITH rel2, rel
      CALL apoc.refactor.setType(rel,"CURRENTLY_READING:PRIMARY") yield input, output
      WITH rel2
      CALL apoc.refactor.setType(rel2,"CURRENTLY_READING") yield input, output
      RETURN input, output
      `,
         {}
      );
   }

   public async deleteBook() {
      await this._executeQuery(
         `
      MATCH (user:User { uid: $uid })--(book:Book { id: $id })
      DETACH DELETE book
      `,
         {}
      );
   }

   public async getFinishedDates() {
      const { year, month, day, ...props } = this.data as FinishedBookUpdateProps;
      await this._executeQuery(
         `
      MATCH (u:User { uid: $uid})
      MERGE (u)-[rel:FINISHED]-(b:Book { id: $id })
         ON MATCH SET 
            rel.dateAdded = datetime(), 
            rel.year = $year, 
            rel.month = $month, 
            `,
         {
            props: props.data,
            year: year,
            month: month,
            day: day,
         }
      );
   }
   public async createAuthors() {
      const authors = this.data?.authors;
      if (!authors) return;
      await this._executeQueryWithoutUid(
         `
            MATCH (book:Book { id: $id })
            UNWIND $authors as author
            MERGE (auth:Author { name: author })
            MERGE (book)<-[:WROTE]-(auth)
            `,
         {
            authors: this.data?.authors,
         }
      );
   }
   // TODO: contemplate whether to include sections
   // does it entail good enough details to include in the section or not?
   public async createCategories() {
      const categories = this.data?.categories;
      if (!categories) return;
      await this._executeQueryWithoutUid(
         `
         MATCH (book:Book { id: $id })
         UNWIND $categories as category
         WITH category[0] as titles, category, book
         UNWIND titles as title
         MERGE (cat:Category { name: title })
         WITH cat, category[1] as sections, book
         UNWIND sections as section 
         MERGE (sec:Section { name: section })
   
         WITH book, sec, cat
         MERGE (cat)<-[:IN_SECTION]-(sec)<-[:HAS_SECTION]-(book)
         MERGE (book)-[:IN_CATEGORY]->(cat)
         `,
         {
            categories: categories,
         }
      );
   }
}

// From here on out
// export const editBooks = async (uid: string, book: BookData, relType: BookRelationTypes) => {
//    const data = book?.data;
//    await write(
//       `
//       MATCH (u:User { uid: $uid })
//       OPTIONAL MATCH (b:Book { id: $id })
//       WITH u, b
//       CALL apoc.do.case([b is NOT NULL,
//           "MATCH (u)-[r]-(b)
//           CALL apoc.refactor.setType(r, relType) YIELD input, output
//           RETURN input, output",
//           b is NULL,
//           'MERGE (new:Book { id: id}) ON CREATE SET new = data
//           WITH u, new CALL apoc.create.relationship(u, $relType, { dateAdded: datetime() }, new )
//           YIELD rel RETURN rel'
//       ], 'CREATE (u)-[:READING]->(b)', {
//          u: u,
//          b: b,
//          id: $id,
//          relType: $relType,
//          data: $data
//       })
//       YIELD value
//       RETURN value
//         `,
//       {
//          uid: uid,
//          id: data?.id,
//          relType: relType,
//          data: data,
//       }
//    );
// };

// export const initiatePrimaryBookSelection = async (uid: string, id: string) => {
//    await write(
//       `
//       MATCH (user:User { uid: $uid })-[rel:CURRENTLY_READING]-(b:Book {id: $id )
//       CALL apoc.refactor.setType(rel,"CURRENTLY_READING:PRIMARY") yield input, output
//       RETURN input, output
//       `,
//       {
//          uid: uid,
//          id: id,
//       }
//    );
// };

// export const changePrimaryBook = async (uid: string, id: string) => {
//    await write(
//       `
//       MATCH (user:User { uid: $uid })-[rel:CURRENTLY_READING]-(b:Book {id: $id )
//       OPTIONAL MATCH (user)-[rel2]-(primary:Book) WHERE type(rel2) = "CURRENTLY_READING:PRIMARY"
//       WITH rel2, rel
//       CALL apoc.refactor.setType(rel,"CURRENTLY_READING:PRIMARY") yield input, output
//       WITH rel2
//       CALL apoc.refactor.setType(rel2,"CURRENTLY_READING") yield input, output
//       RETURN input, output
//       `,
//       {
//          uid: uid,
//          id: id,
//       }
//    );
// };

// // this should give warning to users
// export const deleteBook = async (uid: string, id: string) => {
//    await write(
//       `
//       MATCH (user:User { uid: $uid })--(book:Book { id: $id })
//       DETACH DELETE book
//       `,
//       {
//          uid: uid,
//          id: id,
//       }
//    );
// };

// export const getFinishedDates = async (uid: string, data: FinishedBookUpdateProps) => {
//    const { year, month, day, ...props } = data;
//    await write(
//       `
//       MATCH (u:User { uid: $uid})
//       MERGE (u)-[rel:FINISHED]-(b:Book { id: $id })
//          ON MATCH SET
//             rel.dateAdded = datetime(),
//             rel.year = $year,
//             rel.month = $month,
//             rel.day = $day
//          ON CREATE SET
//             b = $props,
//             rel.dateAdded = datetime(),
//             rel.year = $year,
//             rel.month = $month,
//             rel.day = $day
//       `,
//       {
//          uid: uid,
//          id: props.data.id,
//          props: props.data,
//          year: year,
//          month: month,
//          day: day,
//       }
//    );
// };

// export const createAuthors = async (book: BookData) => {
//    const authors = book?.authors;
//    if (!authors) return;
//    write(
//       `
//       MATCH (book:Book { id: $id })
//       UNWIND $authors as author
//       MERGE (auth:Author { name: author })
//       MERGE (book)<-[:WROTE]-(auth)
//       `,
//       {
//          id: book?.data.id,
//          authors: authors,
//       }
//    );
// };

// consider whether to have subcategories
// the concept is that it can get real messy?
// export const createCategory = async (book: BookData) => {
//    const id = book?.data.id;
//    const categories = book?.categories;
//    if (!categories) return;
//    write(
//       `
//       MATCH (book:Book { id: $id })
//       UNWIND $categories as category
//       WITH category[0] as titles, category, book
//       UNWIND titles as title
//       MERGE (cat:Category { name: title })
//       WITH cat, category[1] as sections, book
//       UNWIND sections as section
//       MERGE (sec:Section { name: section })

//       WITH book, sec, cat
//       MERGE (cat)<-[:IN_SECTION]-(sec)<-[:HAS_SECTION]-(book)
//       MERGE (book)-[:IN_CATEGORY]->(cat)
//       `,
//       {
//          id: id,
//          categories: categories,
//       }
//    );
// };

// ability to edit the book but this should be in a diferent POST
