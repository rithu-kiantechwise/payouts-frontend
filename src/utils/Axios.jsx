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
                        localStorage.clear()
                        toast.error('Please signin again')
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

export const adminApi = createAxiosInstance("http://localhost:8000/admin", "adminToken");
export const organizationApi = createAxiosInstance("http://localhost:8000/organization", "organizationToken");
export const employeeApi = createAxiosInstance("http://localhost:8000/employee", "employeeToken");


// export const adminApi = axios.create({
//     baseURL: `http://localhost:8000/admin`,
// });
// adminApi.interceptors.request.use((req) => {
//     if (localStorage.getItem("adminToken")) {
//         req.headers.Authorization = "Bearer " + localStorage.getItem("adminToken");
//     }
//     return req;
// });

// export const organizationApi = axios.create({
//     baseURL: `http://localhost:8000/organization`,
// });
// organizationApi.interceptors.request.use((req) => {
//     if (localStorage.getItem("organizationToken")) {
//         req.headers.Authorization = "Bearer " + localStorage.getItem("organizationToken");
//     }
//     return req;
// });

// export const employeeApi = axios.create({
//     baseURL: `http://localhost:8000/employee`,
// });
// employeeApi.interceptors.request.use((req) => {
//     if (localStorage.getItem("employeeToken")) {
//         req.headers.Authorization = "Bearer " + localStorage.getItem("employeeToken");
//     }
//     return req;
// });