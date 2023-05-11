import { read } from '../../../config/action';
import { AllBookResult, CurrentBookResult } from '../../../controllers/types/read';

// simple match to match when user is selecting books from list of search
export const getAllBooks = async (uid: string) => {
   const result = await read<AllBookResult>(
      `
       MATCH (u:User { uid: $uid })
       OPTIONAL MATCH (u)-[r1]-(b1:Book) WHERE type(r1) CONTAINS "CURRENTLY_READING"
       OPTIONAL MATCH (u)-[r2:WANT_TO_READ]-(b2:Book)
       OPTIONAL MATCH (u)-[r3]-(b3:Book) WHERE type(r3) CONTAINS "FINISHED"
       RETURN COLLECT(DISTINCT(b1.id)) as reading, COLLECT(DISTINCT(b2.id)) as want, COLLECT(DISTINCT(b3.id)) as finished
       `,
      {
         uid: uid,
      }
   );
   return result;
};

// currently reading is viewed in the front page with LOGS?
// require author, thumbnail, title, subtitle, logs of the book
export const getCurrentBooks = async (uid: string) => {
   return await read<CurrentBookResult>(
      `
      MATCH (u:User { uid: $uid })-[rel]-(bookLists:Book:Book)-[:WROTE]-(a:Author:Author)
      WHERE type(rel) CONTAINS "CURRENTLY_READING"
      WITH bookLists, a.name as author, rel, rel.dateAdded AS unconvertedDate,
      CASE 
         WHEN type(rel) = 'CURRENTLY_READING:PRIMARY' THEN 'PRIMARY'
         ELSE 'CURRENTLY_READING'
      END as relType
      WITH *
      RETURN 
         DISTINCT(bookLists.title) as title, 
         bookLists.id as id,
         bookLists.subtitle as subtitle, 
         bookLists.thumbnail as thumbnail, 
         toString(unconvertedDate) as date,
         relType as type, 
         COLLECT(author) as authors  
      `,
      {
         uid: uid,
      }
   );
};
