import { write } from '../../../config/action';
import { LogBasicParams, NoteProps } from '../../../controllers/types/loggers';

// :CONSIDER for logs, can include chapters/sections which can be used, but the downside is
// misinformation
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

export const editNote = (noteId: string, noteParams: Omit<NoteProps, 'noteId'>) => {
   return write(
      `
        MATCH (note:Note { id: $noteId }) 
        SET note += $noteParams
        `,
      {
         noteId: noteId,
         noteParams: noteParams,
      }
   );
};

// TODO: create a helper where the logIndex and uniqueId is assigned to noteId
