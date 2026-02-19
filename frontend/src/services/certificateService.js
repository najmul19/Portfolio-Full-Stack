import api from './api';

const certificateService = {
    getAll: async () => {
        const response = await api.get('/certificates');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/certificates', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/certificates/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/certificates/${id}`);
        return response.data;
    },
};

export default certificateService;
