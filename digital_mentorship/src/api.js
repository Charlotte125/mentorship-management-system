// import axios from 'axios';

// const API_URL = ' http://127.0.0.1:8000/'; 

// export const fetchData = async () => {
//     try {
//         const response = await axios.get(API_URL);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// };



import axios from "axios";
import { useEffect, useState } from "react";
export const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12 MB in bytes

export const API_URL = ' http://127.0.0.1:8000/';
export const AuthClientId = process.env.REACT_APP_MS_CLIENT_ID
export const Auth_CompStaffing_Tenant = process.env.REACT_APP_MS_COMPSTAFIFNG_TENANT
export const Auth_Ms_redirectUri = process.env.REACT_APP_MS_REDIRECT_URL
export const TINYEMCE_API_KEY = process.env.REACT_APP_TINYEMCE_API_KEY
const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        } return config
    }, (error) => {
        return Promise.reject(error)
    }
)


export default api
