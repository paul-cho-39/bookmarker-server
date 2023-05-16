import { write } from '../../../config/action';
import { LogBasicParams, LoggerData, ManualLoggerData } from '../../../controllers/types/loggers';

// do not think there will be start logging and end logging
// if the nfc can be scanned without the app and recieve the input for new Date();
// then input the date to the data?

// so if the nfc is to be scanned and the data is to be added automatically without opening the app
// recieving input -- a) current datetime

export const startLogging = async (uid: string, id: string, startDate: string) => {
   return await write(
      `
        MATCH (u:User { uid: $uid })--(book:Book { id: $id })
        with book
        OPTIONAL MATCH (book)--(log:Log)
        WITH COALESCE(MAX(log.index), 0) as totalIndex, book
        CREATE (newLog:Log { index: totalIndex })-[:LOGGED {startDate: $startDate, complete: false }]->(book)
        WITH newLog
        CALL apoc.atomic.add(newLog, 'index', 1)
        YIELD newValue
        RETURN newLog as log
        `,
      {
         uid: uid,
         id: id,
         startDate: startDate,
      }
   );
};

export const endLogging = async (baseParams: LogBasicParams, loggerData: LoggerData) => {
   const { uid, id, index } = baseParams;
   return await write(
      `
        MATCH (:User { uid: $uid })--(book:Book { id: $id })-[rel:LOGGED]-(log:Log { index: $logIndex })
        WITH book, rel, log
        MERGE (book)-[rel]-(log)
            ON MATCH SET 
                rel.endDate: $date,
                rel.complete = true,
                log = $data
        `,
      {
         uid: uid,
         id: id,
         logIndex: index,
         data: loggerData,
      }
   );
};

export const manualLogInput = async (uid: string, id: string, loggerData: ManualLoggerData) => {
   const { startTime, endTime, ...data } = loggerData;
   return await write(
      `
      MATCH (u:User { uid: $uid })--(book:Book { id: $id })
        WITH book
        OPTIONAL MATCH (book)-[:LOGGED]-(log:Log)
        WITH COALESCE(MAX(log.index), 0) as totalIndex, book
        CREATE (newLog:Log { index: totalIndex, property: $data })-[:LOGGED { startDate: $startTime, endDate: $endTime, complete: true }]->(book)
        WITH newLog
        CALL apoc.atomic.add(newLog, 'index', 1)
        YIELD newValue
        RETURN newValue as logIndex
      `,
      {
         uid: uid,
         id: id,
         startTime: startTime,
         endTime: endTime,
         data: data,
      }
   );
};

export const editFavoriteSession = async (baseParams: LogBasicParams, isBookmarked: boolean) => {
   const { uid, id, index } = baseParams;
   return await write(
      `
      MATCH (:User { uid: $uid })--(:Book { id: $id })--(log:Log { index: $logIndex })
      WITH log
      SET log.isBookmarked = $isBookmarked
      `,
      {
         uid: uid,
         id: id,
         logIndex: index,
         isBookmarked: isBookmarked,
      }
   );
};
