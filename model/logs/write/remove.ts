import { write } from '../../../config/action';
import { LogBasicParams } from '../../../controllers/types/loggers';

export const removeBookLog = async (basicParams: LogBasicParams) => {
   const { uid, id, index } = basicParams;
   return await write(
      `
       MATCH (:User { uid: $uid })--(book:Book {id: $id })-[logRel:LOGGED]-(log:Log { index: $loggerIndex})
       OPTIONAL MATCH (book)--(logs:Log) WHERE logs.index >= $loggerIndex 
       SET logs.index = logs.index - 1
       WITH log, logRel
       DETACH DELETE logRel, log 
       `,
      {
         uid: uid,
         id: id,
         loggerIndex: index,
      }
   );
};

export const removeAllLogsInBook = async (uid: string, id: string) => {
   return await write(
      `
       MATCH (:User { uid: $uid })--(:Book {id: $id })-[logRel:LOGGED]-(log:Log)
       DETACH DELETE log, logRel
       `,
      {
         uid: uid,
         id: id,
      }
   );
};
