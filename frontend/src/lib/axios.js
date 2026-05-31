import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

const axiosInstance = axios.create({
	baseURL: apiBaseUrl,
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;