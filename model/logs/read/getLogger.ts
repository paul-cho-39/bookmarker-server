// in the three menu button create another menu that will add a log(?)

import { read } from '../../../config/action';

// for this to work it will be the same implementation -- it will add
export const getBookLogs = async (uid: string, id: string) => {
   return await read(
      `
      `
   );
};

// think of how the data will come back as(?);
// TODO: write typescript
export const getCurrentLog = async (uid: string, id: string) => {
   return await read(
      `
      MATCH (:User { uid: $uid })--(book:Book {id: $id})-[rel:LOGGED]-(log:Log)
      WHERE rel.complete = false
      WITH log
      ORDER BY log.index DESC
      LIMIT 1
      RETURN log as log
      `,
      {
         uid: uid,
         id: id,
      }
   );
};

export const getPastLogs = async (uid: string, count: number = 10) => {
   return await read(
      `
      MATCH (:User { $uid })--()--(log:Log)
      `
   );
};

// get the past 10 records of users past records
// and allow the users to edit them in the spot like recording new page read
// the time, whether they like it or not

// 1) get log indexId with startTime(?)
// 2) then use this logic to subtract the hours
// 3) so tomorrow, when testing it should work fine
