import { Request } from 'express';
import { TransportData } from '../controllers/helpers/authentication/userData';
import { BookData, Items, UserBookParam } from '../controllers/types/books';

declare global {
   namespace Express {
      export interface Request {
         data?: TransportData;
         id?: { uid: string };
         isNewUser: boolean;
         googleData: Items<Record<string, string>>;
         filteredBookData: BookData;
         logParams: UserBookParam & { index: number };
         neo4jDates: Record<string, string>;
      }
   }
}
