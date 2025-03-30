import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Content API
export const contentAPI = {
  generateContent: async (data: {
    prompt: string;
    contentType: 'general' | 'academic' | 'business' | 'creative' | 'technical';
    wordCount: number;
    title: string;
  }) => {
    const response = await api.post('/content/generate', data);
    return response.data;
  },

  humanizeContent: async (data: {
    contentId: string;
    humanityLevel: number;
  }) => {
    const response = await api.post('/content/humanize', data);
    return response.data;
  },

  getContentHistory: async () => {
    const response = await api.get('/content/history');
    return response.data;
  },

  getContent: async (id: string) => {
    const response = await api.get(`/content/${id}`);
    return response.data;
  },

  deleteContent: async (id: string) => {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  },
}; 