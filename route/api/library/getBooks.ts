import express, { Response, Request, NextFunction } from 'express';
import { Record as NeoRecord } from 'neo4j-driver';
// bundle this together
import { getAllBooks, getCurrentBooks } from '../../../model/library/read/bookRead';

import getBookData from '../../../middleware/library/getBookData';
import CurrentBookFilter from '../../../controllers/helpers/library/currentBook';

import BookFilter from '../../../controllers/helpers/library/bookFilter';
import { convertArrayIntoObject } from '../../../controllers/helpers/covertArraytoObject';
import { AllBookResult, CurrentBookResult } from '../../../controllers/types/read';
import { createCustomSuccess } from '../../../constants/responseMessage';

const router = express.Router();

router.get('/books/:uid', async (req: Request, res: Response, next: NextFunction) => {
   console.log('fetching users library...');
   const { uid } = req.params;
   try {
      const userBooks = await getAllBooks(uid);
      const userListInArray = userBooks.records.map((record: NeoRecord<AllBookResult>) =>
         record.toObject()
      );
      const userBookLists = convertArrayIntoObject(userListInArray);
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ data: userBookLists, message: response.message });
   } catch (err) {
      next(err);
   }
});

router.get('/thumbnail/:id', getBookData, async (req, res, next: NextFunction) => {
   const bookGetter = new BookFilter(req.googleData);
   const thumbnail = bookGetter.getAvailableThumbnail;
   console.log('fetching the book thumbnail...');
   try {
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ thumbnail: thumbnail, message: response.message });
   } catch (err) {
      next(err);
   }
});

router.get('/current/:uid', async (req: Request, res: Response, next: NextFunction) => {
   console.log('Fetching users currently-reading lists...');
   const { uid } = req.params;
   try {
      const currentBookObj = await getCurrentBooks(uid);
      const userListInArray = currentBookObj.records.map((record: NeoRecord<CurrentBookResult>) =>
         record.toObject()
      );
      const books = new CurrentBookFilter(userListInArray);
      const currentBooks = books.shuffleData();
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ data: currentBooks, message: response.message });
   } catch (err) {
      next(err);
   }
});

export default router;
