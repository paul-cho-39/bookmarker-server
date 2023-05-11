import UserData, { transportDataToNeo4j } from '../helpers/authentication/userData';

type CreateUserProps = {
   id: string;
   name: string;
   email: string;
};

type UserRecord = Awaited<ReturnType<UserData['getUsersData']>>;
type TransportData = Partial<ReturnType<typeof transportDataToNeo4j>>;

export type { CreateUserProps, UserRecord, TransportData };
