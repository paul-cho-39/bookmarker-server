interface UserAndBookParam {
   uid: string;
   id: string;
}

interface LoggerIndexParam extends UserAndBookParam {
   logIndex: number;
}

export type { UserAndBookParam, LoggerIndexParam };
