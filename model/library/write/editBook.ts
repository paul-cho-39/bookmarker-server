import { read, write } from '../../../config/action';
import { BookSection } from '../../../controllers/types/books';

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
// TODO: have to use S3 buckets, multzer, multzer-s3 and amazon-service for this
export const addSection = async (uid: string, id: string, section: BookSection) => {
   await write(
      `
      MATCH (:User { uid: $uid })--(:Book { id: $id })
      
      `
   );
};
