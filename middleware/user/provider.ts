import { Request, Response, NextFunction } from 'express';
import { Record as NeoRecord } from 'neo4j-driver';
import { read } from '../../config/action';
import { TransportData, UserRecord } from '../../controllers/types/authentication';
import getAuth from 'firebase-admin';

function createParseProviderData(transportDataToNeo4j: (value: UserRecord) => TransportData) {
   return async function parseProviderData(req: Request, res: Response, next: NextFunction) {
      const { email } = req.body;
      try {
         const userData = await getAuth.auth().getUserByEmail(email);
         req.data = { ...transportDataToNeo4j(userData) };
         next();
      } catch (err) {
         next(err);
      }
   };
}

async function checkUserStatus(req: Request, res: Response, next: NextFunction) {
   const { email } = req.body;
   const user = await read(
      `
         MATCH(u:User { email: $email })
         RETURN u.email as user
         `,
      {
         email: email,
      }
   );
   const isUserInDatabase: string = user.records
      .map((record: NeoRecord) => record.get('user'))
      .toString();
   req.isNewUser = isUserInDatabase?.length < 1;
   next();
}

export { checkUserStatus, createParseProviderData };
