import { write } from '../../../config/action';
import { LogBasicParams, NoteProps } from '../../../controllers/types/loggers';

export const createNote = (params: LogBasicParams, noteParams: NoteProps, isPublic: boolean) => {
   const { id, uid, logIndex } = params;
   let query = `
        MATCH (user:User { uid: $uid })--(book:Book { id: $id })--(log:Log { index: $logIndex })
        CREATE (user)-[:WROTE]->(note:Note $params })-[:ABOUT]->(log)
        `;
   if (isPublic) {
      query += `CREATE (note)-[:SHARED]->(book)`;
   }
   return write(query, {
      uid: uid,
      id: id,
      logIndex: logIndex,
      params: noteParams,
   });
};

// a user writes the note
// if already created for that very logIndex then
