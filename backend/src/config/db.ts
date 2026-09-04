import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://kmce_admin:kmce_secret_password@localhost:5432/kmce_pathyakram';

const isSsl = connectionString.includes('sslmode=require') || 
              connectionString.includes('neon.tech') || 
              connectionString.includes('supabase.co');

export const pool = new Pool({
  connectionString,
  ssl: isSsl ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 3000,
});

let dbConnected = false;

// Test connection on boot
export async function testDbConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    dbConnected = true;
    console.log('✅ PostgreSQL Database connected successfully!');
    return true;
  } catch (err: any) {
    dbConnected = false;
    console.log('ℹ️  PostgreSQL offline or connecting... (Fallback in-memory mode active)');
    console.log('   Run `cd database && docker compose up -d` or check DATABASE_URL to enable live database storage.');
    return false;
  }
}

export function isConnected(): boolean {
  return dbConnected;
}

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
