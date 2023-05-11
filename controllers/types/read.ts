import { Node, Integer, Relationship } from 'neo4j-driver';

type Current = Node<Integer, { current: string[] }>;
type Want = Node<Integer, { want: string[] }>;
type Finished = Node<Integer, { finished: string[] }>;

export interface AllBookResult {
   reading: string[];
   want: string[];
   finished: string[];
}

export interface CurrentBookResult {
   id: string;
   title: string;
   subtitle: string;
   thumbnail: string;
   date: string | Date;
   type: 'CURRENTLY_READING' | 'PRIMARY' | 'DUMMY';
   authors: string[];
}
