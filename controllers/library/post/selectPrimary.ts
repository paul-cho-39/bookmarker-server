import { Request, Response, NextFunction } from 'express';
import BookWrite from '../../../model/library/write/bookWrite';
import { createCustomSuccess } from '../../../constants/responseMessage';

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

async function editPrimary(req: Request, res: Response, next: NextFunction) {
   const { uid, id } = req.params;
   console.log('Changing primary book...', id);
   const editor = new BookWrite(uid, id);
   try {
      await editor.changePrimaryBook();
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ message: response.message });
   } catch (err) {
      next(err);
   }
}

export { selectPrimary, editPrimary };
