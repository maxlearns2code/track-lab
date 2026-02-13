import { Pool } from 'pg';

const connectionString = process.env.PG_CONNECTION_STRING || 'postgres://user:password@localhost:5432/tracklab';

const pool = new Pool({
  connectionString,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
