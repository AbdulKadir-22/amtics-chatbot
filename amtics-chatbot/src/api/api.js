import axios from 'axios';

const getBaseURL = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Ensure URL doesn't end with a slash to avoid double slashes in requests
    url = url.replace(/\/$/, '');

    // Common mistake check: if the user provided the domain but forgot /api
    if (!url.endsWith('/api') && !url.includes('/api/')) {
        // Only append if it looks like a base domain (heuristic)
        if (url.includes('render.com') || url.includes('localhost')) {
            url += '/api';
        }
    }

    if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_API_URL) {
        console.log(`[API Config]: Using baseURL -> ${url}`);
    }

    return url;
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for easy data access and error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        console.error('[API Error]:', message);
        return Promise.reject(new Error(message));
    }
);

export default api;
