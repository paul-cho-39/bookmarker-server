import express, { Request, Response } from 'express';
import { signOutUser } from '../../../model/auth/userAction';

const route = express.Router();

route.delete('/signout', async (req: Request, res: Response) => {
   console.log('The user is attempting to signout');
   const { email } = req.body;
   await signOutUser(email);

   console.log('JOB DONE (DELETING) :D');
   res.status(201).json({ status: true, message: 'User successfully signed out' });
});

export default route;
