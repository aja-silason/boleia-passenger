import axios from "axios";
import { API_CONFIG } from "./config";

export const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    // baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true
});