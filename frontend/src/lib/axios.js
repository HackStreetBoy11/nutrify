import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "developmnet" ? "http://localhost:5000/api" : "api",
    withCredentials: true // sending cookie with every request
})