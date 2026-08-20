import apiClient from './apiClient';

export const registerUser = async (userData: any)=>{
    const response = await apiClient.post('/Auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials: any) => {
    const response = await apiClient.post('/Auth/login', credentials);
    const token = response.data.token;

    if (token){
        localStorage.setItem('token', token);
    }
    
    return response.data;
};