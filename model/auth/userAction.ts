import { read, write } from '../../config/action';
import { TransportData } from '../../controllers/types/authentication';

// ORIGINAL VERSION BEFORE ADDING NUMBER OF ACCOUNTS
const createUser = async (data: TransportData, name?: string) => {
   const { email, emailVerified, uid, displayName, creationTime } = data;
   await write(
      `

        CREATE
        (u:User { uid: $uid, name: $name, email: $email,  emailVerified: $emailVerified, creationTime: $creationTime })
        WITH u
        CREATE (u)-[:HAS_SESSION]->(:Account { logginedInAt: datetime() })
     `,
      {
         uid: uid,
         name: !displayName ? name : displayName,
         email: email,
         emailVerified: emailVerified,
         creationTime: creationTime,
      }
   );
};

const signInUser = async (uid: string) => {
   await write(
      `
      MATCH (user:User { uid: $uid })
      MERGE (user)-[:HAS_SESSION]->(:Account { logginedInAt: datetime() })
        `,
      {
         uid: uid,
      }
   );
};

const signOutUser = async (email: string) => {
   await write(
      `
      MATCH(u:User { email: $email })-[r:HAS_SESSION]->(a:Account)
      DETACH DELETE r, a 
      `,
      {
         email: email,
      }
   );
};

const deleteUser = async (email: string) => {
   await write(
      `
      MATCH(u:User { email: $email })
      DETACH DELETE u
      `,
      {
         email: email,
      }
   );
};

const isUserInSession = async (uid: string) => {
   const user = await read(
      `
      MATCH(u:User { uid: $uid })-[:HAS_SESSION]-(:Account)
      RETURN u as user
      `,
      {
         uid: uid,
      }
   );
   return user;
};

export { createUser, signInUser, signOutUser, deleteUser, isUserInSession };
