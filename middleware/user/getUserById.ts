import getAuth from 'firebase-admin';
import UserData from '../../controllers/helpers/authentication/userData';
import { Request, Response, NextFunction } from 'express';
import { initiateUserConstraint } from '../../model/constraint-index/constraintModel';

const inititateAuthentication = async (_req: Request, _res: Response, next: NextFunction) => {
   const isUserInDatabase = await getAuth.auth().listUsers(1);
   //    test this one right now
   if (isUserInDatabase.users) {
      console.log('The constraints are working as intended');
      next('route');
   } else {
      await initiateUserConstraint();
      next();
   }
};

const getUserRecordById = async (req: Request, res: Response, next: NextFunction) => {
   const { idToken } = req.body;
   console.log('Is idToken being called', idToken);
   const user = new UserData();
   const userData = await user.getDecodedToken(idToken, res);
   req.data = { ...userData };
   next();
};

export { inititateAuthentication, getUserRecordById };
