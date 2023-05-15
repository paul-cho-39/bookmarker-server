import { read } from '../../../config/action';

export const isNoteUsers = (uid: string, noteId: string) => {
   return read(
      `
        MATCH (:User { uid: $uid })--(note:Note { id: $noteId })
        RETURN note.id as noteId
        `,
      {
         uid: uid,
         noteId: noteId,
      }
   );
};
