import { Response, Request, NextFunction } from 'express';
import { createCustomSuccess } from '../../../constants/responseMessage';
import BookFilter from '../../helpers/library/bookFilter';

async function googleThumbnail(req: Request, res: Response, next: NextFunction) {
   const bookGetter = new BookFilter(req.googleData);
   const thumbnail = bookGetter.getAvailableThumbnail;
   console.log('fetching the book thumbnail...');
   try {
      const response = createCustomSuccess('OK');
      res.status(response.status).json({ thumbnail: thumbnail, message: response.message });
   } catch (err) {
      next(err);
   }
}

export default googleThumbnail;
