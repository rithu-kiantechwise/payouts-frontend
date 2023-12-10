import { organizationApi } from "../utils/Axios";

export const organizationLogin = async (credentials) => {
    try {
        const response = await organizationApi.post('/organization-login', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during organization login:', error);
        return error.response
    }
}

export const organizationRegister = async (credentials) => {
    try {
        const response = await organizationApi.post('/organization-register', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during organization register:', error);
        return error.response
    }
}

export const orgFreeTrialRegister = async (credentials) => {
    try {
        const response = await organizationApi.post('/free-register', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during organization register:', error);
        return error.response
    }
}

export const stripePayment = async (credentials) => {
    try {
        const response = await organizationApi.post(`/checkout-payment`, credentials, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const sendOTP = async (credentials) => {
    try {
        const response = await organizationApi.post('/send-otp', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during organization register:', error);
        return error.response
    }
}

export const fetchOrganizationData = async () => {
    try {
        const response = await organizationApi.get('/fetch-organization')

        return response;
    } catch (error) {
        console.error('Error during employee register:', error);
        return error.response
    }
}

export const orgForgotPassword = async (credentials) => {
    try {
        const response = await organizationApi.post('/forgot-password', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const orgResetPassword = async (credentials) => {
    try {
        const response = await organizationApi.post('/reset-password', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const employeeRegister = async (credentials) => {
    try {
        const response = await organizationApi.post('/create-employee', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee register:', error.response);
        return error.response
    }
}

export const getAllEmployees = async (credentials) => {
    try {
        const response = await organizationApi.get('/all-employees', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee register:', error);
        return error.response
    }
}

export const getEmployeeById = async (employeeID) => {
    try {
        const response = await organizationApi.get(`/employee-details/${employeeID}`)

        return response;
    } catch (error) {
        console.error('Error during employee register:', error);
        return error.response
    }
}

export const updateEmployee = async (id, credentials) => {
    try {
        const response = await organizationApi.put(`/update-employee/${id}`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee register:', error);
        return error.response
    }
}

export const deleteEmployee = async (employeeID) => {
    try {
        const response = await organizationApi.delete(`/delete-employee/${employeeID}`)

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const editOrgProfile = async (credentials) => {
    try {
        const response = await organizationApi.post(`/edit-profile`, credentials)

        return response;
    } catch (error) {
        console.error('Error during organization edit:', error);
        return error.response
    }
}

export const getReimbursement = async (credentials) => {
    try {
        const response = await organizationApi.get(`/get-reimbursement`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const updateReimbursement = async (credentials) => {
    try {
        const response = await organizationApi.put(`/update-reimbursement`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}