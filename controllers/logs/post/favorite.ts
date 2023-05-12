import { Response, Request, NextFunction } from 'express';
import { editFavoriteSession } from '../../../model/logs/write/initiate';
import { createCustomSuccess } from '../../../constants/responseMessage';

async function toggleFavoriteSession(req: Request, res: Response, next: NextFunction) {
   const { uid, id, logIndex } = req.params;
   const { bookmarked } = req.body;
   const convertedLogIndex = typeof logIndex === 'string' ? parseInt(logIndex) : logIndex;
   try {
      await editFavoriteSession(uid, id, bookmarked, convertedLogIndex);
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ message: response.message });
   } catch (err) {
      next(err);
   }
}

export { toggleFavoriteSession };
