import { Response, Request, NextFunction } from 'express';
import { createCustomSuccess } from '../../../constants/responseMessage';
import { LoggerIndexParam } from '../../types/params';
import { NoteProps, NoteRelParam } from '../../types/loggers';
import { createNote } from '../../../model/notes/write/createNotes';

// checking the authentication when editing notes that it verifies

// in the front end it will have a header that will send
// to api endpoint depending on the headerStatus
// it will send to notes/:uid/:id/add-notes

interface NoteBodyProps {
   noteBody: NoteProps;
   noteRel: NoteRelParam<NoteProps>;
}

export async function writeNote(
   req: Request<LoggerIndexParam, {}, NoteBodyProps>,
   res: Response,
   next: NextFunction,
   isPublic: boolean
) {
   // parse the data here(?)
   const { noteBody, noteRel } = req.body;
   try {
      createNote(req.logParams, noteBody, noteRel, isPublic);
      const response = createCustomSuccess('CREATED');
      res.status(response.status).send(response.message);
   } catch (err) {
      next(err);
   }
}
