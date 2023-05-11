import { Request, Response, NextFunction, Router } from 'express';
import { createCustomSuccess } from '../../constants/responseMessage';
import { TransportData } from '../types/authentication';
import { createUser, signInUser, signOutUser } from '../../model/auth/userAction';

async function signup(req: Request, res: Response, next: NextFunction) {
   const { name } = req.body;
   try {
      await createUser(req.data as TransportData, name);
      const response = createCustomSuccess('CREATED');
      res.json({ status: response.status, message: response.message });
   } catch (err) {
      next(err);
   }
}

async function signin(req: Request, res: Response, next: NextFunction) {
   console.log('The user is attempting to sign in');
   const { uid } = req.data as TransportData;
   try {
      await signInUser(uid as string);
      const response = createCustomSuccess('OK');
      res.json({ status: response.status, message: response.message });
   } catch (err) {
      next(err);
   }
}

async function signout(req: Request, res: Response, next: NextFunction) {
   console.log('The user is attempting to signout');
   const { email } = req.body;
   try {
      await signOutUser(email);
      const response = createCustomSuccess('NO_CONTENT');
      res.json({ status: response.status, message: response.message });
   } catch (err) {
      next(err);
   }
}

async function signinWithProviderasync(req: Request, res: Response, next: NextFunction) {
   const data = req.data as TransportData;
   if (req.isNewUser) {
      await createUser(req.data as TransportData);
   } else {
      await signInUser(data.uid as string);
   }
   try {
      const message = req.isNewUser ? 'Created' : 'OK';
      const response = createCustomSuccess('OK', message);
      res.json({ success: response.status, message: response.message });
   } catch (err) {
      next(err);
   }
}

export { signup, signout, signin, signinWithProviderasync };
