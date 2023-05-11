"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../../../config/action");
// export type PostLibraryAction = typeof getFinishedDates | typeof editBooks;
// export type BookActionFunc<Func extends PostLibraryAction> = Func;
// lets run a speed test for fitting everthing under one go
class BookWrite {
    constructor(uid, book) {
        this.uid = uid;
        this.data = book;
    }
    //  have this and execute with id in another class?
    _executeQuery(cypher, params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = this.data) === null || _a === void 0 ? void 0 : _a.data.id;
            return (0, action_1.write)(cypher, Object.assign(Object.assign({}, params), { uid: this.uid, id: id }));
        });
    }
    _executeQueryWithoutUid(cypher, params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = this.data) === null || _a === void 0 ? void 0 : _a.data.id;
            return (0, action_1.write)(cypher, Object.assign(Object.assign({}, params), { id: !id ? this.id : id }));
        });
    }
    editBook(relType) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this._executeQuery(`
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
          relType: relType, 
          data: $data 
        }
      )
      YIELD value
      RETURN value
      `, {
                relType: relType,
                data: (_a = this.data) === null || _a === void 0 ? void 0 : _a.data,
            });
        });
    }
    initiatePrimaryBookSelection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._executeQuery(`
      MATCH (user:User { uid: $uid })-[rel:CURRENTLY_READING]-(b:Book {id: $id })
      CALL apoc.refactor.setType(rel,"CURRENTLY_READING:PRIMARY") yield input, output
      RETURN input, output
      `, {});
        });
    }
    changePrimaryBook() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._executeQuery(`
      MATCH (user:User { uid: $uid })-[rel:CURRENTLY_READING]-(b:Book {id: $id })
      OPTIONAL MATCH (user)-[rel2]-(primary:Book) WHERE type(rel2) = "CURRENTLY_READING:PRIMARY"
      WITH rel2, rel
      CALL apoc.refactor.setType(rel,"CURRENTLY_READING:PRIMARY") yield input, output
      WITH rel2
      CALL apoc.refactor.setType(rel2,"CURRENTLY_READING") yield input, output
      RETURN input, output
      `, {});
        });
    }
    deleteBook() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._executeQuery(`
      MATCH (user:User { uid: $uid })--(book:Book { id: $id })
      DETACH DELETE book
      `, {});
        });
    }
    getFinishedDates() {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.data, { year, month, day } = _a, props = __rest(_a, ["year", "month", "day"]);
            yield this._executeQuery(`
      MATCH (u:User { uid: $uid})
      MERGE (u)-[rel:FINISHED]-(b:Book { id: $id })
         ON MATCH SET 
            rel.dateAdded = datetime(), 
            rel.year = $year, 
            rel.month = $month, 
            `, {
                props: props.data,
                year: year,
                month: month,
                day: day,
            });
        });
    }
    createAuthors() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this._executeQueryWithoutUid(`
            MATCH (book:Book { id: $id })
            UNWIND $authors as author
            MERGE (auth:Author { name: author })
            MERGE (book)<-[:WROTE]-(auth)
            `, {
                authors: (_a = this.data) === null || _a === void 0 ? void 0 : _a.authors,
            });
        });
    }
    createCategories() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this._executeQueryWithoutUid(`
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
         `, {
                categories: (_a = this.data) === null || _a === void 0 ? void 0 : _a.categories,
            });
        });
    }
}
exports.default = BookWrite;
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
