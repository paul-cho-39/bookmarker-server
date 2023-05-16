import { Request, Response, NextFunction } from 'express';
import { LoggerIndexParam } from '../../controllers/types/params';

export const paramLogConverter = (
   req: Request<LoggerIndexParam, {}, {}>,
   _res: Response,
   next: NextFunction
) => {
   console.log('param log converter starting...');
   const { logIndex, ...rest } = req.params;
   const index = typeof logIndex === 'string' ? parseInt(logIndex) : logIndex;
   req.logParams = { ...rest, index };
   next();
};
