import { AsyncDuckDB } from '@duckdb/duckdb-wasm';
import * as duckdb from '@duckdb/duckdb-wasm';

let db: AsyncDuckDB | null = null;

export async function initDatabase() {
  if (db) return db;
  
  // Only initialize in browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
    const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
    
    // Create a blob URL for the worker
    const workerUrl = URL.createObjectURL(
      new Blob([`importScripts('${bundle.mainWorker}');`], { type: 'text/javascript' })
    );
    const worker = new Worker(workerUrl);
    
    const logger = new duckdb.ConsoleLogger();
    db = new AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    
    // Create initial tables
    const conn = await db.connect();
    await conn.query(`
      CREATE TABLE categories (
        name VARCHAR,
        revenue INTEGER
      );
      
      INSERT INTO categories VALUES
        ('Toys', 45000),
        ('Sporting Goods', 75000),
        ('Equipment', 95000),
        ('Gadgets', 85000);
    `);
    await conn.close();
    
    return db;
  } catch (error) {
    console.error('Failed to initialize DuckDB:', error);
    return null;
  }
}

export async function executeQuery(queryName: string, sql: string) {
  if (!db) {
    if (typeof window === 'undefined') {
      // Return mock data when running on server
      return {
        columns: ['category', 'revenue'],
        rows: [
          ['Toys', 45000],
          ['Sporting Goods', 75000],
          ['Equipment', 95000],
          ['Gadgets', 85000]
        ]
      };
    }
    throw new Error('Database not initialized');
  }
  
  const conn = await db.connect();
  try {
    const result = await conn.query(sql);
    return {
      columns: result.schema.fields.map(f => f.name),
      rows: result.toArray().map(row => 
        result.schema.fields.map(f => row[f.name])
      )
    };
  } finally {
    await conn.close();
  }
}