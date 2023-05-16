import { write } from '../../../config/action';
import { LogBasicParams, NoteProps, NoteRelParam } from '../../../controllers/types/loggers';

// :CONSIDER for logs, can include chapters/sections which can be used, but the downside is
// misinformation
export const createNote = (
   params: LogBasicParams,
   noteParams: NoteProps,
   relParams: NoteRelParam<NoteProps>,
   isPublic: boolean
) => {
   const { id, uid, index } = params;
   let query = `
        MATCH (user:User { uid: $uid })--(book:Book { id: $id })--(log:Log { index: $logIndex })
        CREATE (user)-[WROTE { createdAt: $createdAt }]->(note:Note $params })-[:ABOUT]->(log)
        note.id = apoc.create.uuid()
        `;
   if (isPublic) {
      query += `CREATE (note)-[:SHARED]->(book)`;
   }
   return write(query, {
      uid: uid,
      id: id,
      logIndex: index,
      createdAt: relParams.createdAt,
      params: noteParams,
   });
};
