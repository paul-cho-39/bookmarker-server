import { Integer, Node } from 'neo4j-driver';
import { UserBookParam } from './books';

interface LogBasicParams extends UserBookParam {
   index?: number;
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

interface EndLoggerData extends LoggerData {
   startTime: Date;
   endTime: Date;
}

// notes
interface NoteProps {
   id: string;
   title?: string;
   body: string;
   logIndex?: number;
   quote?: string[]; // multiple quotes in a single note
   reference?: string | number; // page or url
}

interface NoteRelParamWithNoteProps {
   createdAt: Date | string;
   updatedAt: null;
}

interface NoteRelParamWithoutNoteProps {
   createdAt: null;
   updatedAt: Date | string;
}

type NoteRelParam<T> = T extends NoteProps
   ? NoteRelParamWithNoteProps
   : NoteRelParamWithoutNoteProps;

export type LogType = { log: Node<Integer, LogProperties> };
export type { LoggerData, EndLoggerData, LogBasicParams, NoteProps, NoteRelParam };
