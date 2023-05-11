import { ManagedTransaction, Record as NeoRecord, QueryResult } from 'neo4j-driver';
import { AnyWrites } from '../controllers/types/cypher';
import driver from './driver';

export const read = async <Transaction extends Record<string, any>>(
   cypher: string,
   param?: AnyWrites
): Promise<QueryResult<Transaction>> => {
   const session = driver.session();
   try {
      const res = await session.executeRead((tx: ManagedTransaction) =>
         tx.run<QueryResult<Transaction>>(cypher, param)
      );
      // const result = res.records.map((record: Record) => record.toObject());
      return res;
   } catch (err) {
      console.log(`Query failed from ${err}`);
      return {} as QueryResult<Transaction>;
   } finally {
      await session.close();
   }
};

export const write = async <TWrite extends AnyWrites>(cypher: string, param?: TWrite) => {
   const session = driver.session();
   try {
      const res = await session.executeWrite((tx: ManagedTransaction) => tx.run(cypher, param));
      const result = res.records.map((record: NeoRecord) => record.toObject());
      return result;
   } catch (err) {
      console.log(`Session cannot write cypher ${err}`);
   } finally {
      await session.close();
   }
};

// TODO:
// Can be better if writing a class after understanding neo4j a bit more?
// have to write when neo4j database comes back as
// 1) lists of objects, 2) lists of array 3) string 4) integer/float/number
// and create a class from the mentioned output
// also with transaction: look iunto the JS driver
// https://github.com/neo4j/neo4j-javascript-driver#a-note-on-numbers-and-the-integer-type
