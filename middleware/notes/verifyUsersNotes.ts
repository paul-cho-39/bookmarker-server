import { Request, Response, NextFunction } from 'express';
import { createCustomError } from '../../constants/responseMessage';

const verifyUsersNote = (req: Request, res: Response, next: NextFunction) => {
   // ensuring that when the user is editing it is their own
};
