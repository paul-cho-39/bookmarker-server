import express, { Request, Response, NextFunction, Router } from 'express';
import { TransportData } from '../../../controllers/user/userData';
import { createUser } from '../../../model/auth/userAction';
import { getUserRecordById, inititateAuthentication } from '../../../middleware/user/getUserById';

const route = express.Router();

route.use('/signup', inititateAuthentication);

route.post('/signup', getUserRecordById, async (req: Request, res: Response) => {
   const { name } = req.body;
   const { email, emailVerified, uid, creationTime } = req.data as TransportData;
   await createUser(req.data as TransportData, name);
   console.log('JOB DONE!:D');

   res.json({ status: 'success', message: 'Added a user node' });
});

export default route;
