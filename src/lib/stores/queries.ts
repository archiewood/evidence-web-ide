import { writable } from 'svelte/store';

interface QueryResult {
  columns: string[];
  rows: any[][];
}

interface QueryStore {
  [key: string]: QueryResult;
}

export const queryResults = writable<QueryStore>({});