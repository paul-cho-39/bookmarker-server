import express, { Request, Response, NextFunction, Router } from 'express';
import { deleteUser } from '../../../model/auth/userAction';

const route = express.Router();

route.delete('/deleteAccount', async (req, res) => {
   const { email } = req.body;
   await deleteUser(email);

   console.log(
      `Successfully deleted the user node with email: ${email} and nodes and relationship associated with this node`
   );
   res.status(200).json({ status: true, message: 'Successfully deleted the account' });
});

export default route;
