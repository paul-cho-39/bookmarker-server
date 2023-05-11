import express, { Request, Response, NextFunction } from 'express';
import { TransportData } from '../../../controllers/user/userData';
import { signInUser } from '../../../model/auth/userAction';
import { getUserRecordById } from '../../../middleware/user/getUserById';

const route = express.Router();

route.post('/signin', getUserRecordById, async (req: Request, res: Response) => {
   console.log('The user is attempting to sign in');
   const { uid } = req.data as TransportData;
   await signInUser(uid as string);
   console.log('JOB DONE [SIGN IN]! :D');
   res.json({ status: true, message: 'Successfully created a path and a node' });
});

// TODO: creates a new node to signal that the user 'HAS_SESSION'

export default route;
