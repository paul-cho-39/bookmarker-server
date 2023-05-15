interface UserAndBookParam {
   uid: string;
   id: string;
}

interface LoggerIndexParam extends UserAndBookParam {
   logIndex: number;
}

interface NoteIdParam extends UserAndBookParam {
   noteId: string;
}

export type { UserAndBookParam, LoggerIndexParam, NoteIdParam };
