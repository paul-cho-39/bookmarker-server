// import { Record as NeoRecord } from "neo4j-driver"

export type AnyWrites = Record<string, any>;

export interface Query<T> {
   records: NeoRecord<T>[];
   summary: any;
}

interface NeoRecord<T> {
   keys: string[];
   length: number;
   get: (key: string) => T;
   has: (key: string) => boolean;
   toObject: () => T;
}
