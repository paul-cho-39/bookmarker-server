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

// adding the entire note
// CONSIDER: this does NOT create a snapshot of the note so if the note is changed
// the favorited part of the note is changed as well
export const addNoteToFavorite = (uid: string, noteId: string) => {
   return write(
      `
         MATCH (user:User { uid: $uid }), (note:Note { id: $noteId })
         CREATE (user)-[:FAVORITED_NOTE { dateAdded: datetime() }]->(note)
         `,
      {
         uid: uid,
         noteId: noteId,
      }
   );
};

// for adding another users notes and highlight them so it can be added to their
// notes(?)
// features: would like to implement this where if the user adds another users note
// then this note is REFERENCED back to the original user

export const addPartialNoteToFavorite = (
   uid: string,
   noteId: string,
   noteParams: Partial<NoteProps>
) => {
   const favoriteNoteParam = { ...noteParams, uid: uid, id: noteId };
   return write(
      `
        MATCH (user:User { uid: $uid }), (note:Note { id: $noteId })
        CREATE (fn:FavoritedNote)
        SET fn = $favoriteNoteParam
        CREATE (user)-[:FAVORITED_NOTE]->(fn) 
        CREATE (fn)-[:BASED_ON { dateAdded: datetime() }]->(note)
           `,
      {
         uid: uid,
         id: noteId,
         favoriteNoteParam: favoriteNoteParam,
      }
   );
};
