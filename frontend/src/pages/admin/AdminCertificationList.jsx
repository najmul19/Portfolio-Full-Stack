import { useEffect, useRef, useState } from 'react';
import certificateService from '../../services/certificateService';

const ACCEPTED = '.pdf,.jpg,.jpeg,.png';

const AdminCertificationList = () => {
    const [certificates, setCertificates] = useState([]);
    const [formData, setFormData] = useState({
        name: '', issuingOrganization: '', issueDate: '',
        credentialUrl: '', credentialId: '', description: '',
        fileUrl: '', fileType: null,
    });
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [filePreview, setFilePreview] = useState(null); // { url, type }
    const fileInputRef = useRef(null);

    useEffect(() => { loadCertificates(); }, []);

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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isPdf = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');

        if (!isPdf && !isImage) {
            alert('Only PDF, JPG, JPEG, PNG files are allowed.');
            return;
        }

        // 10MB limit
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            alert(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum allowed is 10MB.`);
            return;
        }

        setUploading(true);
        try {
            const base64 = await toBase64(file);

            // Call our new backend upload endpoint
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    dataUri: base64,
                    filename: file.name
                })
            });

            const json = await res.json();
            if (!json.success) throw new Error(json.error || 'Upload failed');

            const url = json.url;
            setFormData(prev => ({
                ...prev,
                fileUrl: url,
                fileType: isImage ? 'image' : 'pdf'
            }));
            setFilePreview({ url, type: isImage ? 'image' : 'pdf' });

        } catch (err) {
            console.error(err);
            alert('File upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const clearFile = () => {
        setFormData(prev => ({ ...prev, fileUrl: '', fileType: null }));
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await certificateService.update(editingId, formData);
            } else {
                await certificateService.create(formData);
            }
            setFormData({ name: '', issuingOrganization: '', issueDate: '', credentialUrl: '', credentialId: '', description: '', fileUrl: '', fileType: null });
            setEditingId(null);
            setFilePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            loadCertificates();
        } catch (error) {
            console.error(error);
            const msg = error?.response?.data?.error || error?.message || 'Unknown error';
            alert('Error saving certificate: ' + msg);
        }
    };

    const handleEdit = (cert) => {
        setFormData({
            name: cert.name,
            issuingOrganization: cert.issuingOrganization,
            issueDate: cert.issueDate.split('T')[0],
            credentialUrl: cert.credentialUrl || '',
            credentialId: cert.credentialId || '',
            description: cert.description || '',
            fileUrl: cert.fileUrl || '',
            fileType: cert.fileType || null,
        });
        setEditingId(cert._id);
        if (cert.fileUrl) {
            setFilePreview({ url: cert.fileUrl, type: cert.fileType || 'image' });
        } else {
            setFilePreview(null);
        }
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

                {/* File Upload */}
                <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-1">Certificate File (PDF, JPG, JPEG, PNG)</label>
                    <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-dark-bg border border-gray-600 text-white px-4 py-2 rounded hover:border-accent transition-colors">
                            {uploading ? 'Uploading...' : 'Choose File'}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={ACCEPTED}
                                onChange={handleFileChange}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                        {formData.fileUrl && !uploading && (
                            <button type="button" onClick={clearFile} className="text-red-400 text-sm hover:text-red-300">✕ Remove</button>
                        )}
                        {uploading && <span className="text-accent text-sm animate-pulse">Uploading file…</span>}
                    </div>

                    {/* Preview */}
                    {filePreview && !uploading && (
                        <div className="mt-3 p-3 bg-dark-bg border border-gray-700 rounded">
                            {filePreview.type === 'image' ? (
                                <img src={filePreview.url} alt="Certificate preview" className="max-h-48 rounded object-contain" />
                            ) : (
                                <div className="flex items-center gap-2 text-gray-300">
                                    <span className="text-2xl">📄</span>
                                    <a href={filePreview.url} target="_blank" rel="noreferrer" className="text-accent underline text-sm">
                                        View PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button type="submit" disabled={uploading} className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded disabled:opacity-50">
                    {editingId ? 'Update Certificate' : 'Add Certificate'}
                </button>
            </form>

            <div className="space-y-4">
                {certificates.map(cert => (
                    <div key={cert._id} className="bg-secondary p-4 rounded flex justify-between items-start gap-4">
                        <div className="flex gap-4 items-start flex-1">
                            {/* Thumbnail */}
                            {cert.fileUrl && cert.fileType === 'image' && (
                                <img src={cert.fileUrl} alt={cert.name} className="w-16 h-16 object-cover rounded border border-gray-600 flex-shrink-0" />
                            )}
                            {cert.fileUrl && cert.fileType === 'pdf' && (
                                <a href={cert.fileUrl} target="_blank" rel="noreferrer" className="w-16 h-16 flex items-center justify-center bg-dark-bg rounded border border-gray-600 flex-shrink-0 text-2xl hover:border-accent">
                                    📄
                                </a>
                            )}
                            <div>
                                <h3 className="font-bold text-xl">{cert.name}</h3>
                                <p className="text-gray-400">{cert.issuingOrganization}</p>
                                <p className="text-gray-500 text-sm">{new Date(cert.issueDate).toLocaleDateString()}</p>
                                {cert.credentialUrl && (
                                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-accent text-xs underline">View Credential</a>
                                )}
                            </div>
                        </div>
                        <div className="space-x-2 flex-shrink-0">
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
