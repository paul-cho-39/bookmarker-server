import { Integer, Node } from 'neo4j-driver';

interface LoggerData {
   feedback?: 0 | 1;
   pageCount?: number;
   notes?: string;
   comment?: string;
   location?: string;
}

interface ManualLoggerData extends LoggerData {
   startTime: Date;
   endTime: Date;
}

// logs
interface LogProperties {
   // add more here
   index: number;
   bookmarked?: boolean;
}

export type LogType = { log: Node<Integer, LogProperties> };

export type { LoggerData, ManualLoggerData };
