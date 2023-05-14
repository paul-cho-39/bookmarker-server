import { v4 as uuidv4 } from 'uuid';

export default function getNoteId() {
   const noteId = uuidv4();
   return noteId;
}
