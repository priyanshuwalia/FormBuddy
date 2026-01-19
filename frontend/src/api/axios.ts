import axios from "axios";

const API = axios.create({
    baseURL: "https://form-buddy-ux2b.vercel.app/api",
    withCredentials: true,
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config


})
export default API;