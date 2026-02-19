import api from './api';

const achievementService = {
    getAll: async () => {
        const response = await api.get('/achievements');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/achievements', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/achievements/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/achievements/${id}`);
        return response.data;
    }
};

export default achievementService;
