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

export const getFixturesByDate = async (date) => {
  const response = await api.get(`/fixtures?league=61&season=2024&date=${date}`);
  return response.data.response;
};

export const getLeagueStandings = async () => {
  const response = await api.get('/standings?league=61&season=2024');
  return response.data.response[0].league.standings[0]; // liste des équipes
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