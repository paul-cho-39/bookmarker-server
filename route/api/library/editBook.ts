import express, { Response, Request, NextFunction } from 'express';
import BookWrite from '../../../model/library/write/bookWrite';
import { createCustomSuccess } from '../../../constants/responseMessage';

const router = express.Router();

// for this one it is changing the priamry book?
router.post('/:uid/:id/edit-primary', async (req: Request, res: Response, next: NextFunction) => {
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
});

export default router;
