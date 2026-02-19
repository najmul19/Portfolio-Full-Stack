import api from './api';

const aboutService = {
    getAbout: async () => {
        const response = await api.get('/about');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/about', data);
        return response.data;
    },
    update: async (id, data) => {
        // The backend uses POST /api/about for both create and update (singleton pattern)
        // but the component calls update(id, data).
        const response = await api.post('/about', data);
        return response.data;
    },
};

export default aboutService;
