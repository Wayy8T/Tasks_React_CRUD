// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Địa chỉ API của bạn
    headers: {
        'Content-Type': 'application/json',
    }
});

// Thêm interceptor để tự động thêm token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;