import { writable } from 'svelte/store';
import type { TableInfo } from '$lib/types/database';

const mockTables: TableInfo[] = [
  {
    name: 'categories',
    columns: [
      { name: 'id', type: 'integer' },
      { name: 'name', type: 'text' },
      { name: 'products', type: 'integer' },
      { name: 'revenue', type: 'numeric' }
    ]
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'integer' },
      { name: 'name', type: 'text' },
      { name: 'category_id', type: 'integer' },
      { name: 'price', type: 'numeric' }
    ]
  }
];

export const tables = writable<TableInfo[]>(mockTables);