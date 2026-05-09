import axios from "axios";

export const api = axios.create({
    // baseURL: API_CONFIG.BASE_URL,
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true
});