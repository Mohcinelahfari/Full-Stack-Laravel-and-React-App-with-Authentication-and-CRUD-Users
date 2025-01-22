import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

// Request Interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                // Optional: Redirect to login page
                // window.location.href = '/login';
            } else if (response.status === 403) {
                console.error("Access denied: You do not have the necessary permissions.");
            }
        } else {
            console.error("Network error: Please check your connection or server status.");
        }
        throw error;
    }
);

export default axiosClient;
