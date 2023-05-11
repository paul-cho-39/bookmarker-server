import { Response, Request, NextFunction } from 'express';
import { Record as NeoRecord } from 'neo4j-driver';

import { convertArrayIntoObject } from '../../helpers/covertArraytoObject';
import { AllBookResult, CurrentBookResult } from '../../types/read';
import { createCustomSuccess } from '../../../constants/responseMessage';
import { getAllBooks, getCurrentBooks } from '../../../model/library/read/bookRead';
import CurrentBookFilter from '../../helpers/library/currentBook';

async function getUserBooks(req: Request, res: Response, next: NextFunction) {
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
}

async function getUsersCurrentlyReading(req: Request, res: Response, next: NextFunction) {
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
}

export { getUserBooks, getUsersCurrentlyReading };
