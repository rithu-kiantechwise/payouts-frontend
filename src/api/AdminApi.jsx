import { adminApi } from "../utils/Axios";

export const adminLogin = async (credentials) => {
    try {
        const response = await adminApi.post('/admin-login', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during admin login:', error);
        return error.response
    }
}

export const adminRegister = async (credentials) => {
    try {
        const response = await adminApi.post('/admin-register', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during admin register:', error);
        return error.response
    }
}

export const fetchAdminData = async () => {
    try {
        const response = await adminApi.get(`/fetch-admin`)

        return response;
    } catch (error) {
        console.error('Error during fetching data:', error);
        return error.response
    }
}

export const getAllOrganizations = async (credentials) => {
    try {
        const response = await adminApi.get('/fetch-organization', {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during admin register:', error);
        return error.response
    }
}

export const blockOrganization = async (credentials) => {
    try {
        const response = await adminApi.put(`/block-organization`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during fetching data:', error);
        return error.response
    }
}

export const unblockOrganization = async (credentials) => {
    try {
        const response = await adminApi.put(`/unblock-organization`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during fetching data:', error);
        return error.response
    }
}

export const organizationRegisterByAdmin = async (credentials) => {
    try {
        const response = await adminApi.post('/add-organization', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during admin register:', error);
        return error.response
    }
}

export const adminForgotPassword = async (credentials) => {
    try {
        const response = await adminApi.post('/forgot-password', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const adminResetPassword = async (credentials) => {
    try {
        const response = await adminApi.post('/reset-password', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}