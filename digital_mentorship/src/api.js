import axios from "axios";

export const MAX_FILE_SIZE = 12 * 1024 * 1024; 
export const API_URL = 'http://127.0.0.1:8000/';

export const AuthClientId = process.env.REACT_APP_MS_CLIENT_ID;
export const Auth_Ms_redirectUri = process.env.REACT_APP_MS_REDIRECT_URL;
export const TINYEMCE_API_KEY = process.env.REACT_APP_TINYEMCE_API_KEY;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getLoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;  
};

export const getUserCount = async () => {
    try {
        const response = await api.get('/api/userCount'); 
        return response.data.count;  
    } catch (error) {
        console.error("Error fetching user count:", error);
        return 0;  
    }
};


export const getUserData = async (token) => {
    try {
        const response = await api.get('/api/users/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;  
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;  
    }
};

export default api;



