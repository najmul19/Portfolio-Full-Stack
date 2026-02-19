import { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';

const AdminPublicationList = () => {
    const [publications, setPublications] = useState([]);
    const [formData, setFormData] = useState({ title: '', publisher: '', date: '', url: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { loadPublications(); }, []);

    const loadPublications = async () => {
        try {
            const data = await publicationService.getAll();
            setPublications(data.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await publicationService.update(editingId, formData);
            else await publicationService.create(formData);
            setFormData({ title: '', publisher: '', date: '', url: '', description: '' });
            setEditingId(null);
            loadPublications();
        } catch (error) { alert('Error saving publication'); }
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, publisher: item.publisher, date: item.date.split('T')[0], url: item.url || '', description: item.description || '' });
        setEditingId(item._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete?')) {
            await publicationService.delete(id);
            loadPublications();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Publications</h1>
            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher" className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <input name="url" value={formData.url} onChange={handleChange} placeholder="URL" className="p-2 rounded bg-dark-bg text-white border border-gray-600" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="2" className="md:col-span-2 p-2 rounded bg-dark-bg text-white border border-gray-600"></textarea>
                <button type="submit" className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            </form>
            <div className="space-y-4">
                {publications.map(item => (
                    <div key={item._id} className="bg-secondary p-4 rounded flex justify-between">
                        <div><h3 className="bold">{item.title}</h3><p className="text-gray-400">{item.publisher} - {new Date(item.date).toLocaleDateString()}</p></div>
                        <div className="space-x-2"><button onClick={() => handleEdit(item)} className="text-accent">Edit</button><button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminPublicationList;
