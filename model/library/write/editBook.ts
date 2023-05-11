import { read, write } from '../../../config/action';

// when editing time, what else can be combined to edit the time altogether?
export const editBookTime = async (uid: string, id: string, date: string) => {
   await write(
      `
        MATCH (u:User { uid: $uid })-[rel]-(book:Book { id: $id })
        WHERE type(rel) contains "CURRENTLY_READING" OR "FINISHED" as current_or_finished
        WITH current_or_finished, book
        SET current_or_finished.datetime = datetime($date)
        `,
      {
         uid: uid,
         id: id,
         date: date,
      }
   );
};

// if there is no thumbnail then give the user a choice to upload the book image?
