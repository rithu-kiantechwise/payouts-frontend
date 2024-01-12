import { employeeApi } from "../utils/Axios"

export const employeeLogin = async (credentials) => {
    try {
        const response = await employeeApi.post('/employee-login', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const employeeLogout = async () => {
    try {
        const response = await employeeApi.post('/employee-logout', null, { withCredentials: true });

        return response;
    } catch (error) {
        console.error('Error during employee logout:', error);
        return error.response;
    }
};

export const fetchEmployeeData = async (credentials) => {
    try {
        const response = await employeeApi.post(`/fetch-employee`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee register:', error);
        return error.response
    }
}

export const empForgotPassword = async (credentials) => {
    try {
        const response = await employeeApi.post('/forgot-password', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const empResetPassword = async (credentials) => {
    try {
        const response = await employeeApi.post('/reset-password', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const sendOTP = async (credentials) => {
    try {
        const response = await employeeApi.get('/send-otp', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const verifyOTP = async (credentials) => {
    try {
        const response = await employeeApi.post('/verify-otp', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const employeeCheckout = async (credentials) => {
    try {
        const response = await employeeApi.post('/attendance-checkout', credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee login:', error);
        return error.response
    }
}

export const newReimbursement = async (formData) => {

    try {
        const response = await employeeApi.post('/create-reimbursement', formData, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during new reimbursement:', error);
        return error.response
    }
}

export const editEmpProfile = async (credentials) => {
    try {
        const response = await employeeApi.post(`/edit-profile`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee edit:', error);
        return error.response
    }
}

export const getSalaryDetails = async (credentials) => {
    try {
        const response = await employeeApi.get(`/salary-details`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const getAttendanceDetails = async (credentials) => {
    try {
        const response = await employeeApi.get(`/attendance-details`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const applyLeave = async (credentials) => {
    try {
        const response = await employeeApi.post(`/new-leave`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const updateLeave = async (credentials) => {
    try {
        const response = await employeeApi.post(`/edit-leave`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const getAllLeave = async (credentials) => {
    try {
        const response = await employeeApi.get(`/get-leave`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const getUpcomingLeave = async (credentials) => {
    try {
        const response = await employeeApi.get(`/upcoming-leave`, credentials, { withCredentials: true })

        return response;
    } catch (error) {
        console.error('Error during employee deletion:', error);
        return error.response
    }
}

export const fetchLeaveDetails = async (credentials) => {
    try {
        const response = await employeeApi.get(`/leave-details`, {
            withCredentials: true,
            params: credentials,
        })

        return response;
    } catch (error) {
        console.error('Error during leave fetch:', error);
        return error.response
    }
}