import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { isUserInSession } from '../model/auth/userAction';
import { Record as NeoRecord } from 'neo4j-driver';
import { createCustomError } from '../constants/responseMessage';

async function authenticateUser(req: Request, _res: Response, next: NextFunction) {
   const { uid, id } = req.params;
   console.log('Checking if user has session...', uid);
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
