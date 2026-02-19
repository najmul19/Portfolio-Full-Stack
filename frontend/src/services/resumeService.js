import api from './api';

const resumeService = {
    getAll: async () => {
        const response = await api.get('/resumes');
        return response.data;
    },
    getActive: async () => {
        const response = await api.get('/resumes/active');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/resumes', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/resumes/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/resumes/${id}`);
        return response.data;
    }
};

export default resumeService;
