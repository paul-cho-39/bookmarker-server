import { Response, Request, NextFunction } from 'express';
import { editFavoriteSession } from '../../../model/logs/write/initiate';
import { createCustomSuccess } from '../../../constants/responseMessage';

async function toggleFavoriteSession(req: Request, res: Response, next: NextFunction) {
   const { bookmarked } = req.body;
   try {
      await editFavoriteSession(req.logParams, bookmarked);
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ message: response.message });
   } catch (err) {
      next(err);
   }
}

export { toggleFavoriteSession };
