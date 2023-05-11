import fetch from 'node-fetch';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { Items } from '../../controllers/types/books';
import { createCustomError } from '../../constants/responseMessage';

async function getBookData(req: Request, _res: Response, next: NextFunction) {
   const { id } = req.params;
   console.log('fetching google books id:', id);
   const key = process.env.GOOGLE_API_KEY;
   const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`;
   try {
      const response = await fetch(url);
      if (response && response.ok) {
         const data = (await response.json()) as Items<Record<string, string>>;
         req.googleData = data;
         next();
      }
   } catch (error) {
      return next(createCustomError('GOOGLE_BOOK_ERROR'));
   }
}

export default getBookData;
