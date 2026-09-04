import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from backend or root
dotenv.config({ path: path.join(__dirname, '../backend/.env') });
dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://kmce_admin:kmce_secret_password@localhost:5432/kmce_pathyakram';

async function runDatabaseInit() {
  console.log('🚀 Initializing KMCE Pathyakram Database...');
  console.log(`📡 Connecting to: ${connectionString.replace(/:[^:@]+@/, ':****@')}`);

  const client = new Client({
    connectionString,
    ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech') || connectionString.includes('supabase.co')
      ? { rejectUnauthorized: false }
      : false,
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL successfully!');

    // Read and run schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    console.log('📜 Applying database schema from schema.sql...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    await client.query(schemaSql);
    console.log('✅ Schema tables created successfully!');

    // Read and run seed.sql
    const seedPath = path.join(__dirname, 'seed.sql');
    console.log('🌱 Populating initial dataset from seed.sql...');
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    await client.query(seedSql);
    console.log('✅ Initial KMCE records seeded successfully!');

    console.log('\n🎉 Database setup complete! Ready for backend server.');
  } catch (err: any) {
    console.error('\n⚠️ Could not connect to PostgreSQL:', err.message);
    console.log('👉 Make sure PostgreSQL is running (e.g. `docker compose up -d` in database/ or check your DATABASE_URL in backend/.env).');
  } finally {
    await client.end().catch(() => {});
  }
}

runDatabaseInit();
