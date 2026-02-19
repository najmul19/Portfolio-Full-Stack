import api from './api';

const messageService = {
    getAll: async () => {
        const response = await api.get('/messages');
        return response.data;
    },
    send: async (data) => {
        const response = await api.post('/messages', data);
        return response.data;
    },
    updateStatus: async (id, data) => {
        const response = await api.put(`/messages/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/messages/${id}`);
        return response.data;
    },
};

export default messageService;
