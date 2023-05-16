interface UserAndBookParam {
   uid: string;
   id: string;
}

// not to be confused with the params which is the initial params
interface LoggerIndexParam extends UserAndBookParam {
   logIndex: string;
}

interface NoteIdParam extends UserAndBookParam {
   noteId: string;
}

export type { UserAndBookParam, LoggerIndexParam, NoteIdParam };
