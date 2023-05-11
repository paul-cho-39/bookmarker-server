import express, { Response, Request, NextFunction } from 'express';
import { editFavoriteSession } from '../../../model/logs/write/writeLogger';
import { createCustomSuccess } from '../../../constants/responseMessage';
import { checkBookmarkedValue } from '../../../middleware/log/favoriteSession';

const router = express.Router();

router.post(
   `/:uid/:id/:logIndex/favorite-session`,
   checkBookmarkedValue,
   async (req, res, next) => {
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
);

export default router;
