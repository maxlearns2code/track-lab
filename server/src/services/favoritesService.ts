import pool from '../config/db';

export interface Favorite {
  jamendo_id: string;
  name: string;
  artist_name: string;
  image: string;
  audio_url: string;
}

export const addFavorite = async (fav: Favorite) => {
  const query = `
    INSERT INTO favorites (jamendo_id, name, artist_name, image, audio_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [fav.jamendo_id, fav.name, fav.artist_name, fav.image, fav.audio_url];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getFavorites = async () => {
  const result = await pool.query('SELECT * FROM favorites ORDER BY created_at DESC');
  return result.rows;
};

export const removeFavorite = async (jamendoId: string) => {
  const query = 'DELETE FROM favorites WHERE jamendo_id = $1 RETURNING *';
  const result = await pool.query(query, [jamendoId]);
  return result.rows[0];
};
