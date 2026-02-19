import api from './api';

const educationService = {
    getAll: async () => {
        const response = await api.get('/education');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/education', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/education/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/education/${id}`);
        return response.data;
    },
};

export default educationService;
