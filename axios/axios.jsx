import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const login = async (formData) => {
    try {
        const data = await taskApi.post(`/login`, formData, { withCredentials: true })
        return data
    } catch (error) {
        console.error(error);
        return { error: 'Login creation API error' }
    }
};