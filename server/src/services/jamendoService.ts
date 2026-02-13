import axios from 'axios';

const BASE_URL = 'https://api.jamendo.com/v3.0/tracks/';

export const getTracksByVibe = async (tag: string) => {
  const clientId = process.env.JAMENDO_CLIENT_ID;

  if (!clientId) {
    throw new Error('JAMENDO_CLIENT_ID is not configured');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        client_id: clientId,
        format: 'jsonpretty',
        limit: 10,
        tags: tag, // e.g. 'rock', 'pop', 'sad', 'happy'
        include: 'musicinfo',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching music:', error);
    throw new Error('Failed to fetch music data');
  }
};
