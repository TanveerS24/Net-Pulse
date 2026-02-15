import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Traffic Simulation APIs
export const trafficAPI = {
  saveSimulation: (data) => api.post('/traffic/simulations', data),
  getAllSimulations: () => api.get('/traffic/simulations'),
  getSimulation: (id) => api.get(`/traffic/simulations/${id}`),
  getStatistics: () => api.get('/traffic/statistics'),
  deleteSimulation: (id) => api.delete(`/traffic/simulations/${id}`),
};

// Server Simulation APIs
export const serverAPI = {
  saveSimulation: (data) => api.post('/server/simulations', data),
  getAllSimulations: () => api.get('/server/simulations'),
  getSimulation: (id) => api.get(`/server/simulations/${id}`),
  getStatistics: () => api.get('/server/statistics'),
  deleteSimulation: (id) => api.delete(`/server/simulations/${id}`),
};

export default api;
