import { Request, Response } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../services/favoritesService';

export const getFavoritesHandler = async (req: Request, res: Response) => {
  try {
    const favorites = await getFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

export const addFavoriteHandler = async (req: Request, res: Response) => {
  const { jamendo_id, name, artist_name, image, audio_url } = req.body;

  if (!jamendo_id || !name || !audio_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newFavorite = await addFavorite({ jamendo_id, name, artist_name, image, audio_url });
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

export const removeFavoriteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await removeFavorite(id);
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};
