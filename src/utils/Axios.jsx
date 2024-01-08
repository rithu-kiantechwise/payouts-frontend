import axios from "axios";
import toast from "react-hot-toast";

const createAxiosInstance = (baseURL, tokenKey) => {
    const api = axios.create({ baseURL });

    api.interceptors.request.use((req) => {
        const token = localStorage.getItem(tokenKey);
        if (token) {
            req.headers.Authorization = "Bearer " + token;
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
                         if (refreshError.response && refreshError.response.status === 401) {
                            // Unauthorized, clear authentication-related items
                            localStorage.removeItem(tokenKey);
                            localStorage.removeItem("refreshToken");
                            toast.error('Session expired. Please signin again');
                        } else {
                            // Other refresh errors
                            toast.error('Failed to refresh token. Please signin again');
                        }
                    }
                } else {
                    // window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );
    return api;
};

export const adminApi = createAxiosInstance(`${process.env.REACT_APP_API_URL}/admin`, "adminToken");
export const organizationApi = createAxiosInstance(`https://api.payouts.online/organization`, "organizationToken");
export const employeeApi = createAxiosInstance(`${process.env.REACT_APP_API_URL}/employee`, "employeeToken");