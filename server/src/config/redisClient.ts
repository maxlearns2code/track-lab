import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: redisUrl,
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

// Connect immediately when this module is imported (or called explicitly)
const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

connectRedis();

export default client;
