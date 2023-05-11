import { Request, Response, NextFunction } from 'express';
import { createCustomError } from '../../constants/responseMessage';

export const checkBookmarkedValue = async (req: Request, res: Response, next: NextFunction) => {
   if (typeof req.body.bookmarked !== 'boolean') {
      next(createCustomError('INVALID_INPUT'));
   }
   next();
};
