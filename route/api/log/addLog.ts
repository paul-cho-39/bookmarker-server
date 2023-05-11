import express, { Response, Request, NextFunction } from 'express';
import {
   endLogging,
   manualLogInput,
   removeBookLog,
   startLogging,
} from '../../../model/logs/write/writeLogger';
import { ManualLoggerData, LoggerData, LogType } from '../../../controllers/types/loggers';
import { UserAndBookParam, LoggerIndexParam } from '../../../controllers/types/params';
import { createCustomSuccess } from '../../../constants/responseMessage';
import checkTime from '../../../middleware/log/checkTime';

const router = express.Router();

// router.use('/', async (req: Request, res: Response, next: NextFunction) => {
//    if (req.body.data.startTime) {
//       return res.redirect(`/${req.params.uid}/${req.params.id}/end`);
//    } else {
//       return res.redirect(`/${req.params.uid}/${req.params.id}/log-manually`);
//    }
// });

router.post(
   '/:uid/:id/manual-log',
   async (req: Request<UserAndBookParam, {}, ManualLoggerData>, res, next) => {
      const { id, uid } = req.params;
      const data: ManualLoggerData = req.body;
      console.log('data has been recieved: ', data);
      try {
         await manualLogInput(uid, id, data);
         const response = createCustomSuccess('CREATED');
         res.status(response.status).json({ message: response.message });
      } catch (err) {
         next(err);
      }
   }
);

// INITIAL logger not manual
// TEST: have to test whether this works at all
// the point is NOT TO increase logIndex
// so if that is the case redirect(?);

// or is there a way for cleaning up old logs?

router.post('/:uid/:id/start', async (req, res, next) => {
   const { id, uid } = req.params;
   const { startTime } = req.body as { startTime: string };
   try {
      const result = (await startLogging(uid, id, startTime)) as LogType[];
      const properties = result[0].log.properties;
      const response = createCustomSuccess('OK');
      console.log('log finished', response);
      res.status(response.status).json({ log: properties, message: response.message });
   } catch (err) {
      next(err);
   }
});

// do not increase the logIndex(?) if the startTime has not passed 12 hours mark
// then

router.post(
   '/:uid/:id/:logIndex/end',
   async (req: Request<LoggerIndexParam, {}, LoggerData>, res, next) => {
      const { id, uid, logIndex } = req.params;
      const data: LoggerData = req.body;
      try {
         await endLogging(uid, id, logIndex, data);
         const response = createCustomSuccess('CREATED');
         res.status(response.status).json({ message: response.message });
      } catch (err) {
         next(err);
      }
   }
);

router.delete(
   '/:uid/:id/:logIndex/delete',
   async (req: Request<LoggerIndexParam, {}, {}>, res, next) => {
      const { id, uid, logIndex } = req.params;
      try {
         await removeBookLog(uid, id, logIndex);
         const response = createCustomSuccess('NO_CONTENT');
         res.status(response.status).json({ message: response.message });
      } catch (err) {
         next(err);
      }
   }
);

export default router;

// For here, whenever this is called, it will increase the "logIndex" and create a new "Log" node and set the increased "logIndex" as its property.
// Create a middleware sort for expressJS to check the condition whether to increase "logIndex" and create a new "Log" node.
// The condition is 1) :LOGGED { startTime } - the property "startTime" with

// see if the data is persisted
// if not then have to add middleware for this
