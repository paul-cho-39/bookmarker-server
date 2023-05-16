import { Request, Response, NextFunction } from 'express';
import { createCustomError } from '../../constants/responseMessage';

interface TimeBodyParam {
   time: {
      currentTime: Date;
      startTime: Date;
   };
   threshold: number;
}

// this is not a promise
const checkTime = (req: Request<{}, {}, TimeBodyParam>, _res: Response, next: NextFunction) => {
   // the current time is passed
   const { time, threshold } = req.body;
   const { startTime, currentTime } = time;

   // TODO: have to get the currentTime and see if it works for date here
   // const threshold = 12 * 60 * 60 * 1000; // 12 hours

   // if it passes this it wont record
   if (currentTime.getTime() - startTime.getTime() >= threshold) {
      next(createCustomError('INVALID_INPUT'));
   }
   next();
};

export default checkTime;

// 1) separate the logic
// 2) GET and retrieve the logs
// 3) no logs using Math.min(log, 0);
// 4) if it is the 'SAME LOG' AND 'checkTime'
// then throw an error;
