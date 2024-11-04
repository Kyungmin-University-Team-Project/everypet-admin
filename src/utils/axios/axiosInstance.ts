import axios from "axios";
import { reissueToken } from "../auth/token";
import CryptoJS from 'crypto-js';  // CryptoJS 가져오기

const secretKey = process.env.REACT_APP_CRYPTOJS_KEY;
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    // 응답이 성공적으로 돌아왔을 때
    (response) => {
        return response;
    },
    // 에러 처리
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await reissueToken();
            if (newToken) {
                originalRequest.headers['access'] = newToken;
                // console.log('토큰 재발급 성공:', newToken);
                // 원래 요청을 재실행
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('every-pet-ceo-access');

        if (token && secretKey) {
            const bytes = CryptoJS.AES.decrypt(token, secretKey);
            const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
            console.log(decryptedToken);
            config.headers['access'] = decryptedToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
