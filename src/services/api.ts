import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (unauthorized) by redirecting to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  getProfile: () => api.get('/api/profile'),
  updateProfile: (profileData) => api.put('/api/profile', profileData), // Changed from /update to match backend
  uploadProfileImage: (formData) => api.post('/api/profile/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  changePassword: (passwordData) => api.put('/api/profile/change-password', passwordData),
};

// Media services
export const mediaService = {
  // Get all media files
  getAllMedia: () => api.get('/api/media'),
  
  // Upload media files
  uploadMedia: (formData, onUploadProgress) => api.post('/api/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  }),
  
  // Delete media file
  deleteMedia: (mediaId) => api.delete(`/api/media/${mediaId}`)
};

// Schedule services
export const scheduleService = {
  createSchedule: (scheduleData) => api.post('/api/schedule', scheduleData),
  getSchedules: () => api.get('/api/schedule'),
  getScheduleById: (id) => api.get(`/api/schedule/${id}`),
  updateSchedule: (id, scheduleData) => api.put(`/api/schedule/${id}`, scheduleData),
  deleteSchedule: (id) => api.delete(`/api/schedule/${id}`),
};


export default api;