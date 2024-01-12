import axios from "axios";
import toast from "react-hot-toast";

const createAxiosInstance = (baseURL, tokenKey) => {
    const api = axios.create({ baseURL });

    api.interceptors.request.use((req) => {
        const token = localStorage.getItem(tokenKey);
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    });

    api.interceptors.response.use(
        async (response) => response,
        async (error) => {
            if (error.response && error.response.status === 406) {
                const originalRequest = error.config;
                const refreshToken = localStorage.getItem("refreshToken");

                if (refreshToken) {
                    try {
                        const response = await axios.post(
                            `${baseURL}/refresh-token`,
                            {},
                            {
                                headers: { authorization: `Bearer ${refreshToken}` },
                            }
                        );
                        const newToken = response.data.newAccessToken;
                        localStorage.setItem(tokenKey, newToken);
                        originalRequest.headers.Authorization = 'Bearer ' + newToken;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        handleSessionExpired();
                    }
                } else {
                    return Promise.reject(error);
                }
            } else if (error.response && error.response.status === 403) {
                handleSessionExpired();
            }
            return Promise.reject(error);
        }
    );
    const handleSessionExpired = () => {
        localStorage.clear();
        localStorage.setItem('sessionExpired', 'true');
        window.location.href = "/organization/login";
    };
    return api;
};

window.onload = () => {
    const sessionExpired = localStorage.getItem('sessionExpired');
    if (sessionExpired === 'true') {
        localStorage.removeItem('sessionExpired');
        toast.error('Session Expired, Please Login');
    }
};

export const adminApi = createAxiosInstance(`${process.env.REACT_APP_API_URL}/admin`, "adminToken");
export const organizationApi = createAxiosInstance(`${process.env.REACT_APP_API_URL}/organization`, "organizationToken");
export const employeeApi = createAxiosInstance(`${process.env.REACT_APP_API_URL}/employee`, "employeeToken");