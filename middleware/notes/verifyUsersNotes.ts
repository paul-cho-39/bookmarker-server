import { Request, Response, NextFunction } from 'express';
import { createCustomError } from '../../constants/responseMessage';
import { isNoteUsers } from '../../model/notes/read/verifyNotes';

// ensuring that when the user is editing it is their own
export const verifyUsersNote = async (req: Request, _res: Response, next: NextFunction) => {
   try {
      const { uid, noteId } = req.params;
      const checkId = await isNoteUsers(uid, noteId);
      const verified = checkId.records.map((record) => record.get('noteId'));
      if (!verified) {
         return next(createCustomError('UNAUTHORIZED_ACCESS'));
      }
      next();
   } catch (err) {
      next(err);
   }
};
