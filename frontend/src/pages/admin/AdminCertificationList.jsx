import { useEffect, useState } from 'react';
import certificateService from '../../services/certificateService';

const AdminCertificationList = () => {
    const [certificates, setCertificates] = useState([]);
    const [formData, setFormData] = useState({
        name: '', issuingOrganization: '', issueDate: '', credentialUrl: '', credentialId: '', description: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const data = await certificateService.getAll();
            setCertificates(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await certificateService.update(editingId, formData);
            } else {
                await certificateService.create(formData);
            }
            setFormData({ name: '', issuingOrganization: '', issueDate: '', credentialUrl: '', credentialId: '', description: '' });
            setEditingId(null);
            loadCertificates();
        } catch (error) {
            console.error(error);
            alert('Error saving certificate');
        }
    };

    const handleEdit = (cert) => {
        setFormData({
            name: cert.name,
            issuingOrganization: cert.issuingOrganization,
            issueDate: cert.issueDate.split('T')[0],
            credentialUrl: cert.credentialUrl || '',
            credentialId: cert.credentialId || '',
            description: cert.description || ''
        });
        setEditingId(cert._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this certificate?')) {
            try {
                await certificateService.delete(id);
                loadCertificates();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Certifications</h1>

            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Certificate Name" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input name="issuingOrganization" value={formData.issuingOrganization} onChange={handleChange} placeholder="Issuing Organization" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input name="credentialId" value={formData.credentialId} onChange={handleChange} placeholder="Credential ID" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                <input name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} placeholder="Credential URL" className="md:col-span-2 p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="3" className="md:col-span-2 p-2 rounded bg-dark-bg border border-gray-600 text-white"></textarea>

                <button type="submit" className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded">
                    {editingId ? 'Update Certificate' : 'Add Certificate'}
                </button>
            </form>

            <div className="space-y-4">
                {certificates.map(cert => (
                    <div key={cert._id} className="bg-secondary p-4 rounded flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-xl">{cert.name}</h3>
                            <p className="text-gray-400">{cert.issuingOrganization}</p>
                            <p className="text-gray-500 text-sm">{new Date(cert.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(cert)} className="text-accent hover:underline">Edit</button>
                            <button onClick={() => handleDelete(cert._id)} className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCertificationList;
