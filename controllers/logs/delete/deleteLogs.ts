import express, { Response, Request, NextFunction } from 'express';
import { LoggerIndexParam } from '../../types/params';
import { removeBookLog } from '../../../model/logs/write/remove';
import { createCustomSuccess } from '../../../constants/responseMessage';

async function deleteSingleLog(
   req: Request<LoggerIndexParam, {}, {}>,
   res: Response,
   next: NextFunction
) {
   const { id, uid, logIndex } = req.params;
   try {
      await removeBookLog(uid, id, logIndex);
      const response = createCustomSuccess('NO_CONTENT');
      res.status(response.status).json({ message: response.message });
   } catch (err) {
      next(err);
   }
}

// :TODO - complete deleting ALL logs associated with the book
async function deleteAllLogs(req: Request, res: Response, next: NextFunction) {
   const { id, uid } = req.params;
   try {
   } catch (err) {
      next(err);
   }
}

export { deleteSingleLog, deleteAllLogs };
