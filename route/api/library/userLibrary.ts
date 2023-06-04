import express, { Response, Request, NextFunction } from 'express';
import { BookAction, BookRelationTypes } from '../../../controllers/types/books';
import { bookHandler, selectPrimary } from '../../../controllers/library';

const router = express.Router();

router.use(['/:uid/:id/reading', '/:uid/:id/finished/rereading'], selectPrimary);

const routes = [
   { url: '/:uid/:id/reading', props: 'CURRENTLY_READING', action: 'edit' },
   { url: '/:uid/:id/reading/include-page', props: 'CURRENTLY_READING', action: 'editPage' },
   { url: '/:uid/:id/want', props: 'WANT_TO_READ', action: 'edit' },
   { url: '/:uid/:id/finished', props: 'FINISHED', action: 'edit' },
   { url: '/:uid/:id/finished/dates', props: null, action: 'finished' },
   { url: '/:uid/:id/remove', props: null, action: 'remove' },
];

// remove here will use POST verb
routes.forEach((route) => {
   const { url, props, action } = route;
   const requestHandler = async (req: Request, res: Response, next: NextFunction) => {
      await bookHandler(req, res, next, action as BookAction, props as BookRelationTypes);
   };
   router.post(url, requestHandler);
});

export default router;
