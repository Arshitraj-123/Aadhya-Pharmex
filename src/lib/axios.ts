import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'https://pharmaceutical-distribution-management-4gsq.onrender.com'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authCodes = ['AUTH_MISSING', 'AUTH_EXPIRED', 'AUTH_INVALID'];
    
    if (
      error.response &&
      error.response.status === 401 &&
      authCodes.includes(error.response.data?.code)
    ) {
      console.warn("Session expired or invalid. Logging out...");
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
