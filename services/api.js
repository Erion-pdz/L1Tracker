import axios from 'axios';

const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io', 
  headers: {
    'x-apisports-key': '53e22d9745134dbe32f2e4f854964a89', 
  },
});

export const getMatchStats = async (fixtureId) => {
  const response = await api.get(`/fixtures/statistics?fixture=${fixtureId}`);
  return response.data.response;
};

export const getLineUps = async (fixtureId) => {
  const response = await api.get(`/fixtures/lineups?fixture=${fixtureId}`);
  return response.data.response;
};

export const getMatchEvents = async (fixtureId) => {
  const response = await api.get(`/fixtures/events?fixture=${fixtureId}`);
  return response.data.response;
};

export const getFixturesByDate = async (date = '2024-05-19', leagueId = 61) => {
  try {
    const response = await api.get('/fixtures', {
      params: {
        date,
        league: leagueId,
        season: 2023,
      },
    });

    return response.data.response;
  } catch (error) {
    console.error('Erreur API getFixturesByDate:', error);
    return [];
  }
};

export const getLeagueStandings = async () => {
  try {
    const response = await api.get('/standings', {
      params: {
        league: 61,
        season: 2024,
      },
    });

    const standingsData = response.data.response;

    if (
      standingsData &&
      standingsData.length > 0 &&
      standingsData[0].league &&
      standingsData[0].league.standings &&
      standingsData[0].league.standings.length > 0
    ) {
      return standingsData[0].league.standings[0];
    } else {
      console.warn('Données de classement manquantes ou invalides');
      return [];
    }
  } catch (error) {
    console.error('Erreur API getLeagueStandings:', error);
    return [];
  }
};


export const getTeamById = async (id) => {
  const response = await api.get(`/teams?id=${id}`);
  return response.data.response[0];
};

export const getLiveMatches = async () => {
  const response = await api.get('/fixtures?live=all&league=61&season=2024');
  return response.data.response;
};

export default api;