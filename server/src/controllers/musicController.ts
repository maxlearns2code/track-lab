import { Request, Response } from 'express';
import { getTracksByVibe } from '../services/jamendoService';

export const getMusicHandler = async (req: Request, res: Response) => {
  const { vibe } = req.query;

  if (!vibe || typeof vibe !== 'string') {
    return res.status(400).json({ error: 'Vibe tag is required (e.g. ?vibe=rock)' });
  }

  try {
    const tracks = await getTracksByVibe(vibe);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch music' });
  }
};
