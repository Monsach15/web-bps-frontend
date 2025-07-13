import apiClient from '../api/axios';

export const authService = {
    async login(email, password) {
        try {
            await apiClient.get('/sanctum/csrf-cookie');
            
            const response = await apiClient.post('/login', { email, password });
            return response.data;
        } catch (error) {
            throw new Error('Gagal login: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        }
    },
    async logout() {
        try {
            const response = await apiClient.post('/logout');
            return response.data;
        } catch (error) {
            throw new Error('Gagal logout: ' + error.response?.data?.message || 'Terjadi kesalahan');
        }
    }
}