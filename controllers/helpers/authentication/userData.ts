import getAuth from 'firebase-admin';
import { Response } from 'express';

class UserData {
   static _uid?: string | null;
   static _email?: string;
   async getDecodedToken(idToken: string, res: Response) {
      try {
         const decodedToken = await getAuth.auth().verifyIdToken(idToken);
         UserData._uid = decodedToken.uid;
         const userData = await this.getUsersData(decodedToken.uid);
         return transportDataToNeo4j(userData);
      } catch (error) {
         res.status(404).end({ status: false, message: error });
      }
   }
   async getUsersData(uid: string) {
      if (!UserData._uid) {
         throw new Error("Can't find variable: uid");
      }
      const userData = await getAuth.auth().getUser(UserData._uid ?? uid);
      return userData;
   }
   get uid() {
      return UserData._uid;
   }
}

type UserRecord = Awaited<ReturnType<UserData['getUsersData']>>;
type TransportData = Partial<ReturnType<typeof transportDataToNeo4j>>;

const transportDataToNeo4j = (user: UserRecord) => {
   const userInfo = {
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
      displayName: user.displayName,
      creationTime: user.metadata.creationTime,
   };
   return userInfo;
};

export default UserData;
export { UserRecord, transportDataToNeo4j };
