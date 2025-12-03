import axios from "axios"; 

const isDevelopment = import.meta.env.MODE === 'development'

const baseURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD 


const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: false, 
});


export default apiClient;