import { Integer, Node } from 'neo4j-driver';
import { UserBookParam } from './books';

interface LogBasicParams extends UserBookParam {
   index?: number;
}

// logs
interface LogProperties {
   index: number;
}

interface LoggerData {
   meta: {
      feedback?: 0 | 1;
      pageCount?: number;
      location?: string;
      bookmarked?: boolean;
   };
}

interface EndLoggerData extends LoggerData {
   dates: {
      startTime: Date;
      endTime: Date;
   };
}

// notes
interface NoteProps {
   // id is provided using apoc
   bigIdea?: string;
   notes: string;
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
