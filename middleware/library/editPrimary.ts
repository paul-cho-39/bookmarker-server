import { Request, Response, NextFunction } from 'express';
import BookWrite from '../../model/library/write/bookWrite';

async function selectPrimary(req: Request, _res: Response, next: NextFunction) {
   const { uid } = req.params;
   const { currentlyReading } = req.body;
   console.log('The users currently reading library:', currentlyReading);
   if (currentlyReading.length <= 1) {
      let id: string = currentlyReading[0];
      const bookWrite = new BookWrite(uid, id);
      await bookWrite.initiatePrimaryBookSelection();
      next();
   }
   next();
}

export default selectPrimary;
