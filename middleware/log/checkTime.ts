import { Request, Response, NextFunction } from 'express';
import { createCustomError } from '../../constants/responseMessage';

// will return false EVERY TIME
const checkTime = async (req: Request, res: Response, next: NextFunction) => {
   const { startTime } = req.body as { startTime: string };
   const convertedStartTime = new Date(startTime);

   const currentDate = Date.now();
   const threshold = 12 * 60 * 60 * 1000; // 12 hours
   if (currentDate - convertedStartTime.getTime() <= threshold) {
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
