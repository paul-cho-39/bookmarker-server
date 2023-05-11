import express, { Response, Request, NextFunction } from 'express';
import { getCurrentLog } from '../../../model/logs/read/getLogger';
import { createCustomSuccess } from '../../../constants/responseMessage';
import { Record as NeoRecord } from 'neo4j-driver';
import { LogType } from '../../../controllers/types/loggers';

const router = express.Router();

router.get('/:uid/:id/current-log', async (req, res, next) => {
   const { uid, id } = req.params;
   try {
      const result = await getCurrentLog(uid, id);
      const logObject = result.records.map((record: NeoRecord) => record.toObject()) as LogType[];
      const logProperties = logObject[0].log.properties;

      const response = createCustomSuccess('OK');
      res.status(response.status).json({
         log: logProperties,
         message: response.message,
         success: !!logProperties,
      });
   } catch (err) {
      next(err);
   }
});

export default router;
