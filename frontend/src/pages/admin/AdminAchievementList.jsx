import { useEffect, useState } from 'react';
import achievementService from '../../services/achievementService';

const AdminAchievementList = () => {
    const [achievements, setAchievements] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', icon: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { loadAchievements(); }, []);

    const loadAchievements = async () => {
        try {
            const data = await achievementService.getAll();
            setAchievements(data.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await achievementService.update(editingId, formData);
            else await achievementService.create(formData);
            setFormData({ title: '', description: '', date: '', icon: '' });
            setEditingId(null);
            loadAchievements();
        } catch (error) { alert('Error saving achievement'); }
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, description: item.description, date: item.date.split('T')[0], icon: item.icon || '' });
        setEditingId(item._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete?')) {
            await achievementService.delete(id);
            loadAchievements();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Achievements</h1>
            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                <input name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon URL/Class" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="2" className="md:col-span-2 p-2 rounded bg-dark-bg border border-gray-600 text-white" required></textarea>
                <button type="submit" className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            </form>
            <div className="space-y-4">
                {achievements.map(item => (
                    <div key={item._id} className="bg-secondary p-4 rounded flex justify-between">
                        <div><h3 className="bold">{item.title}</h3><p className="text-gray-400">{item.description}</p></div>
                        <div className="space-x-2"><button onClick={() => handleEdit(item)} className="text-accent">Edit</button><button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminAchievementList;
