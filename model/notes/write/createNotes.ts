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
   const { id, uid, logIndex } = params;
   let query = `
        MATCH (user:User { uid: $uid })--(book:Book { id: $id })--(log:Log { index: $logIndex })
        CREATE (user)-[WROTE { createdAt: $createdAt }]->(note:Note $params })-[:ABOUT]->(log)
        rel = $relParams
        `;
   if (isPublic) {
      query += `CREATE (note)-[:SHARED]->(book)`;
   }
   return write(query, {
      uid: uid,
      id: id,
      logIndex: logIndex,
      relParams: relParams.createdAt,
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

// to do this requires "noteId" - meaning that it would require
// adding a favorite note even though it is not their notes
export const addNoteToFavorite = (uid: string, noteId: string) => {
   return write(
      `
        MATCH (u:User { uid: $uid }), (n:Note { id: $noteId })
        CREATE (u)-[:FAVORITED_NOTE]-(n)
        `,
      {
         uid: uid,
         noteId: noteId,
      }
   );
};

// TODO: save this in another file that is more fitting
export const deleteNoteFromFavorite = (uid: string, noteId: string) => {
   return write(
      `
        MATCH (u:User { uid: $uid })-[rel:FAVORITE_NOTE]-(n:Note { id: $noteId })
        DELETE rel;
        `,
      {
         uid: uid,
         noteId: noteId,
      }
   );
};

// TODO: create a helper where the logIndex and uniqueId is assigned to noteId
