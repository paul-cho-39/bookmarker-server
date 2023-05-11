import { write } from '../../config/action';

export const userIdConstraint = async () => {
   await write(
      `
     CREATE CONSTRAINT user_email_constraint IF NOT EXISTS 
     FOR (u:User) REQUIRE u.email IS UNIQUE
        `
   );
};

export const userEmailConstraint = async () => {
   await write(`
    CREATE CONSTRAINT user_id_constraint IF NOT EXISTS
    FOR (u:User) REQUIRE u.uid IS UNIQUE
    `);
};

// create index for book and author(?)
export const bookIdIndex = async () => {
   await write(
      `
       CREATE INDEX book_id_index IF NOT EXISTS
       FOR (b:Book) ON (b.id) 
       `
   );
};

export const initiateUserConstraint = async () => {
   await userIdConstraint()
      .then(async () => {
         await userEmailConstraint().then(async () => {
            await bookIdIndex();
         });
      })
      .catch((error) => console.log('Error:', error));
};

// ** requires enterprise version
export const loggerIndexConstraint = async () => {
   await write(
      `
      CREATE CONSTRAINT ON (book:Book) ASSERT UNIQUE (book)<-[:LOGGED]-(log:Log) ASSERT log.index IS UNIQUE
      `
   );
};
