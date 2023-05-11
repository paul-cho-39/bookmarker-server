import express, { Request, Response, NextFunction, Router } from 'express';
import { TransportData, transportDataToNeo4j } from '../../../controllers/user/userData';
import { read } from '../../../config/action';
import { Record as DataRecord } from 'neo4j-driver';
import { createUser, signInUser } from '../../../model/auth/userAction';
import getAuth from 'firebase-admin';

const route = express.Router();

route.use('/provider', async (req: Request, res: Response, next: NextFunction) => {
   console.log('Request for provider is starting...');
   const { email } = req.body;
   try {
      const userData = await getAuth.auth().getUserByEmail(email);
      req.data = { ...transportDataToNeo4j(userData) };
      next();
   } catch (err) {
      next(err);
   }
});

route.use('/provider', async (req: Request, res: Response, next: NextFunction) => {
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
      .map((record: DataRecord) => record.get('user'))
      .toString();
   req.isNewUser = isUserInDatabase?.length < 1;
   next();
});

// POSSIBLE TODO: when user recieves its first time then possibly change
route.post('/provider', async (req: Request, res: Response) => {
   const data = req.data as TransportData;
   if (req.isNewUser) {
      await createUser(req.data as TransportData);
   } else {
      await signInUser(data.uid as string);
   }
   console.log('JOB DONE WITH PROVIDERS :D');
   const message = req.isNewUser ? 'Created a new node for user' : 'Session is linked to the user';
   res.json({ success: true, message: message });
});

export default route;
