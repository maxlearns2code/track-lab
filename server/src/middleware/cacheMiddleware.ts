import { NextFunction, Request, Response } from 'express';
import redisClient from '../config/redisClient';

// Helper to generate a cache key based on the request URL
const getCacheKey = (req: Request) => `cache:${req.originalUrl}`;

export const cacheMiddleware = (durationSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = getCacheKey(req);

    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        // Cache Hit! Return the cached JSON
        console.log(`Cache HIT for ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      // Cache Miss - we need to capture the response
      console.log(`Cache MISS for ${key}`);

      // We override the res.json method to intercept the data before sending it
      const originalJson = res.json;

      res.json = (body: any): Response => {
        // Save to Redis asynchronously (don't block response)
        redisClient.setEx(key, durationSeconds, JSON.stringify(body))
          .catch(err => console.error('Redis save error', err));

        // Call the original json method to actually send the response
        return originalJson.call(res, body);
      };

      next();
    } catch (error) {
      console.error('Redis Middleware Error', error);
      next(); // If Redis fails, just proceed without caching
    }
  };
};
