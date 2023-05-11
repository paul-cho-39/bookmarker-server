import express, { Response, Request, NextFunction } from 'express';
import { BookAction, BookRelationTypes } from '../../../controllers/types/books';
// bundle this together
import bookHandler from '../../../controllers/library/editBookHandler';
import selectPrimary from '../../../controllers/library/selectPrimary';

const router = express.Router();

router.use(['/:uid/:id/reading', '/:uid/:id/finished/rereading'], selectPrimary);

const routes = [
   { url: '/:uid/:id/reading', props: 'CURRENTLY_READING', action: 'edit' },
   { url: '/:uid/:id/want', props: 'WANT_TO_READ', action: 'edit' },
   { url: '/:uid/:id/finished', props: 'FINISHED', action: 'edit' },
   { url: '/:uid/:id/finished/rereading', props: 'FINISHED:CURRENTLY_READING', action: 'edit' },
   { url: '/:uid/:id/finished/dates', props: null, action: 'finished' },
   { url: '/:uid/:id/remove', props: null, action: 'remove' },
];

routes.forEach((route) => {
   const { url, props, action } = route;
   router.post(url, async (req: Request, res: Response, next: NextFunction) => {
      await bookHandler(req, res, next, action as BookAction, props as BookRelationTypes);
   });
});

export default router;
