import { Router } from 'express';
import { getWeatherHandler } from '../controllers/weatherController';

const router = Router();

router.get('/', getWeatherHandler);

export default router;
