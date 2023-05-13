import { Integer, Node } from 'neo4j-driver';
import { UserBookParam } from './books';

interface LogBasicParams extends UserBookParam {
   logIndex?: number;
}

// logs
interface LogProperties {
   // add more here
   index: number;
   bookmarked?: boolean;
}

interface LoggerData extends LogProperties {
   feedback?: 0 | 1;
   pageCount?: number;
   comment?: string;
   location?: string;
}

interface ManualLoggerData extends LoggerData {
   startTime: Date;
   endTime: Date;
}

// notes
interface NoteProps {
   title?: string;
   body: string;
   logIndex?: number;
   createdAt: Date | string;
   updatedAt?: Date | string;
   quote?: string;
   reference?: string | number; // page
}

export type LogType = { log: Node<Integer, LogProperties> };

export type { LoggerData, ManualLoggerData, LogBasicParams, NoteProps };
