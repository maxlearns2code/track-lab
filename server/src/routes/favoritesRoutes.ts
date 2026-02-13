import { Router } from 'express';
import { addFavoriteHandler, getFavoritesHandler, removeFavoriteHandler } from '../controllers/favoritesController';

const router = Router();

router.get('/', getFavoritesHandler);
router.post('/', addFavoriteHandler);
router.delete('/:id', removeFavoriteHandler);

export default router;
