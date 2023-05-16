import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
   body: {
      dates?: Record<string, string>;
   } & Record<any, any>;
}

export async function processDates(req: CustomRequest, _res: Response, next: NextFunction) {
   // all request with dates should be coming with dates objects
   if (req.body.dates) {
      const dateObj = req.body.dates;
      console.log('the date obj is: ', dateObj);
      req.neo4jDates = Object.entries(dateObj).reduce(
         (acc: Record<string, string>, [key, value]: [string, string]) => {
            const date = new Date(value);
            const neo4jDate = date.toISOString().split('T')[0];
            const neo4jDateTime = date.toISOString();

            acc[key] = neo4jDateTime;
            return acc;
         },
         {}
      );
   }
   next();
}
