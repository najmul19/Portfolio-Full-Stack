import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized (e.g., clear token and redirect to login)
        if (error.response && error.response.status === 401) {
            // Optional: Clear token if it's invalid/expired
            // localStorage.removeItem('token');
            // window.location.href = '/login'; // Or use a more React-way to redirect
        }
        return Promise.reject(error);
    }
);

export default api;
