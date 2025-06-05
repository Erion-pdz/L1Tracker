import axios from 'axios';

const rapidApi = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'X-RapidAPI-Key': 'edee91a457msh3fc37d636c1f775p1a45adjsn26151db649e1',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  },
});

export const getTodayMatches = async () => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const response = await rapidApi.get('/fixtures', {
      params: { date: today },
    });
    return response.data.response;
  } catch (error) {
    console.error('Erreur getTodayMatches:', error);
    return [];
  }
};

export const getLiveMatches = async () => {
  try {
    const response = await rapidApi.get('/fixtures', {
      params: { live: 'all' },
    });
    return response.data.response;
  } catch (error) {
    console.error('Erreur getLiveMatches:', error);
    return [];
  }
};

export const getLeagueStandings = async (leagueId = 61, season = 2024) => {
  try {
    const response = await rapidApi.get('/standings', {
      params: { league: leagueId, season },
    });
    return response.data.response[0]?.league?.standings[0] || [];
  } catch (error) {
    console.error('Erreur getLeagueStandings:', error);
    return [];
  }
};

export default rapidApi;
