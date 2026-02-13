import { Router } from 'express';
import { getMusicHandler } from '../controllers/musicController';

import { cacheMiddleware } from '../middleware/cacheMiddleware';

const router = Router();

// Cache results for 10 minutes (600 seconds)
router.get('/', cacheMiddleware(600), getMusicHandler);

export default router;
