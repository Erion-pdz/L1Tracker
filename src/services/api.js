import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://v3.football.api-sports.io';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apisports-key': API_KEY
  }
});

export const getLiveMatches = async () => {
  const response = await api.get('/fixtures?live=all');
  return response.data.response;
};

export const getMatchStats = async (fixtureId) => {
  const response = await api.get(`/fixtures/statistics?fixture=${fixtureId}`);
  return response.data.response;
};

// Compositions des équipes
export const getLineUps = async (fixtureId) => {
  const response = await api.get(`/fixtures/lineups?fixture=${fixtureId}`);
  return response.data.response;
};

// Événements du match
export const getMatchEvents = async (fixtureId) => {
  const response = await api.get(`/fixtures/events?fixture=${fixtureId}`);
  return response.data.response;
};