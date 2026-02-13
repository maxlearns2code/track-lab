import pool from '../config/db';

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    jamendo_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    image VARCHAR(512),
    audio_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

export const initDb = async () => {
  try {
    const client = await pool.connect();
    await client.query(createTablesQuery);
    client.release();
    console.log('Database initialized: "favorites" table ready.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};
