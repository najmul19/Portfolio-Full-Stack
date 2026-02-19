import api from './api';

const publicationService = {
    getAll: async () => {
        const response = await api.get('/publications');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/publications', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/publications/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/publications/${id}`);
        return response.data;
    },
};

export default publicationService;
