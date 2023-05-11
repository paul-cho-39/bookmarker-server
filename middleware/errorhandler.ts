import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
   status: number;
   code: string;
}

function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
   // the most basic of error most will be handled using http-errors
   console.error(err.stack);
   res.status(err.status || 500);
   res.json({
      status: err.status,
      message: err.message,
      code: err.code,
   });
}

export default errorHandler;
