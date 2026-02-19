import api from './api';

const testimonialService = {
    getAll: async () => {
        const response = await api.get('/testimonials');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/testimonials', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/testimonials/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/testimonials/${id}`);
        return response.data;
    }
};

export default testimonialService;
