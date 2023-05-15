import { Request, Response, NextFunction } from 'express';
import { isUserInSession } from '../model/auth/userAction';
import { Record as NeoRecord } from 'neo4j-driver';
import { createCustomError } from '../constants/responseMessage';

async function authenticateUser(req: Request, _res: Response, next: NextFunction) {
   const { uid, id } = req.params;
   try {
      const user = await isUserInSession(uid);
      const hasSession = user.records.map((record: NeoRecord) => record.get('user')).toString();
      if (!hasSession) {
         return next(createCustomError('UNAUTHORIZED_ACCESS'));
      }
      next();
   } catch (error) {
      return next(createCustomError('INVALID_EMAIL'));
   }
}

export default authenticateUser;
