import { marked } from 'marked';

interface SQLResult {
  columns: string[];
  rows: any[];
}

export function executeSQLQuery(sql: string): SQLResult {
  // This is a mock implementation
  // In a real app, this would connect to a database
  return {
    columns: ['id', 'name'],
    rows: [
      [1, 'John'],
      [2, 'Jane']
    ]
  };
}