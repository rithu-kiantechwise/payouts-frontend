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
        console.error('Error during org register:', error);
        return error.response
    }
}

export const orgFreeTrialRegister = async (credentials) => {
    try {
        const response = await organizationApi.post('/free-register', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during free register:', error);
        return error.response
    }
}

export const activatePremiumSubscription = async (credentials) => {
    try {
        const response = await organizationApi.post('/premium-register', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during activate register:', error);
        return error.response
    }
}

export const cancelPremiumSubscription = async (credentials) => {
    try {
        const response = await organizationApi.post('/cancel-register', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during cancel register:', error);
        return error.response
    }
}

export const createPayment = async (credentials) => {
    try {
        const response = await organizationApi.post(`/checkout-payment`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during stripe payment:', error);
        return error.response
    }
}

export const verifyPayment = async (credentials) => {
    try {
        const response = await organizationApi.post(`/verify-payment`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during stripe payment:', error);
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
        const response = await organizationApi.get('/all-employees', {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee register:', error);
        return error.response
    }
}

export const getEmployeeById = async (credentials) => {
    try {
        const response = await organizationApi.get(`/employee-details`, {
            withCredentials: true,
            params: credentials,
        })

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
        const response = await organizationApi.get(`/get-reimbursement`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const updateReimbursementStatus = async (credentials) => {
    try {
        const response = await organizationApi.put(`/update-reimbursement`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const getLeaveDetails = async (credentials) => {
    try {
        const response = await organizationApi.get(`/get-leaves`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const getEmployeeAttendance = async (credentials) => {
    try {
        const response = await organizationApi.get(`/get-attendance`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee attendance:', error);
        return error.response
    }
}

export const getEmployeeSalary = async (credentials) => {
    try {
        const response = await organizationApi.get(`/get-salary`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee salary:', error);
        return error.response
    }
}

export const getNotification = async (credentials) => {
    try {
        const response = await organizationApi.get(`/get-notification`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee salary:', error);
        return error.response
    }
}

export const deleteNotification = async (credentials) => {
    try {
        const response = await organizationApi.post(`/delete-notification`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const unreadNotification = async (credentials) => {
    try {
        const response = await organizationApi.post(`/unread-notification`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const updateLeaveStatus = async (credentials) => {
    try {
        const response = await organizationApi.put(`/update-leave`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const updateSelectedEmployeesTaxes = async (credentials) => {
    try {
        const response = await organizationApi.post(`/update-selected-taxes`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const updateAllEmployeesTaxes = async (credentials) => {
    try {
        const response = await organizationApi.post(`/update-all-taxes`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}