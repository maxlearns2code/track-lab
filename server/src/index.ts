import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { initDb } from './models/initDb';

dotenv.config();

// Initialize DB
initDb();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

import musicRoutes from './routes/musicRoutes';
import weatherRoutes from './routes/weatherRoutes';

app.use('/api/weather', weatherRoutes);
app.use('/api/music', musicRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
