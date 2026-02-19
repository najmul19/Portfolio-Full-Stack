import api from './api';

const experienceService = {
    getAll: async () => {
        const response = await api.get('/experiences');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/experiences', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/experiences/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/experiences/${id}`);
        return response.data;
    },
};

export default experienceService;
