import { Request, Response, NextFunction } from 'express';
import { BookAction, BookRelationTypes } from '../../types/books';
import filterBookData from '../../helpers/library/bookData';
import BookWrite from '../../../model/library/write/bookWrite';
import { createCustomSuccess } from '../../../constants/responseMessage';

export default async function bookHandler(
   req: Request,
   res: Response,
   next: NextFunction,
   bookAction: BookAction,
   relType?: BookRelationTypes
) {
   const { uid, id } = req.params;
   const googleData = req.googleData;
   const data = filterBookData(googleData);

   const bookWrite = new BookWrite(uid, id, data);
   console.log('handling the books and processing...');
   try {
      switch (bookAction) {
         case 'edit':
            await bookWrite.editBook(relType as BookRelationTypes);
            break;
         case 'finished':
            await bookWrite.getFinishedDates();
            break;
         case 'remove':
            await bookWrite.deleteBook();
      }

      await Promise.all([bookWrite.createAuthors(), bookWrite.createCategories()]);
      const customSuccess = createCustomSuccess('CREATED');

      res.status(customSuccess.status).json({
         status: customSuccess.status,
         message: customSuccess.message,
      });
   } catch (err) {
      next(err);
   }
}
