import api from './api';

const aboutService = {
    get: async () => {
        const response = await api.get('/about');
        return response.data;
    },
    update: async (data) => {
        const response = await api.post('/about', data); // Since controller uses POST for createOrUpdate
        return response.data;
    },
};

export default aboutService;
