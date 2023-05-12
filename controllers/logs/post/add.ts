import express, { Response, Request, NextFunction } from 'express';
import { LoggerIndexParam, UserAndBookParam } from '../../types/params';
import { LogType, LoggerData, ManualLoggerData } from '../../types/loggers';
import { endLogging, manualLogInput, startLogging } from '../../../model/logs/write/initiate';
import { createCustomSuccess } from '../../../constants/responseMessage';

async function addLogManually(
   req: Request<UserAndBookParam, {}, ManualLoggerData>,
   res: Response,
   next: NextFunction
) {
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

async function startLog(req: Request, res: Response, next: NextFunction) {
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
}

async function endLog(
   req: Request<LoggerIndexParam, {}, LoggerData>,
   res: Response,
   next: NextFunction
) {
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

// a redirect for nfc(?)
// router.use('/', async (req: Request, res: Response, next: NextFunction) => {
//    if (req.body.data.startTime) {
//       return res.redirect(`/${req.params.uid}/${req.params.id}/end`);
//    } else {
//       return res.redirect(`/${req.params.uid}/${req.params.id}/log-manually`);
//    }
// });

export { addLogManually, startLog, endLog };
