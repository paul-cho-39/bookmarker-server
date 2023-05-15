import { write } from '../../../config/action';
import { NoteProps } from '../../../controllers/types/loggers';

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
