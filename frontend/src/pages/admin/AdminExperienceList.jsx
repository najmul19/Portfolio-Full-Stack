import { useEffect, useState } from 'react';
import experienceService from '../../services/experienceService';

const AdminExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({
        company: '', role: '', startDate: '', endDate: '', current: false, description: '', location: '', technologies: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        try {
            const data = await experienceService.getAll();
            setExperiences(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert technologies string to array if needed (simplified for this demo)
            const payload = {
                ...formData,
                technologies: formData.technologies.split(',').map(t => t.trim())
            };

            if (editingId) {
                await experienceService.update(editingId, payload);
            } else {
                await experienceService.create(payload);
            }

            setFormData({ company: '', role: '', startDate: '', endDate: '', current: false, description: '', location: '', technologies: '' });
            setEditingId(null);
            loadExperiences();
        } catch (error) {
            console.error(error);
            alert('Error saving experience');
        }
    };

    const handleEdit = (exp) => {
        setFormData({
            company: exp.company,
            role: exp.role,
            startDate: exp.startDate.split('T')[0],
            endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
            current: exp.current,
            description: exp.description,
            location: exp.location,
            technologies: exp.technologies.join(', ')
        });
        setEditingId(exp._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this experience?')) {
            try {
                await experienceService.delete(id);
                loadExperiences();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Experience</h1>

            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.current} className="p-2 rounded bg-dark-bg border border-gray-600 text-white" />

                <label className="flex items-center gap-2 text-white">
                    <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} />
                    Current Job
                </label>

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="3" className="md:col-span-2 p-2 rounded bg-dark-bg border border-gray-600 text-white"></textarea>
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                <input name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Technologies (comma separated)" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" />

                <button type="submit" className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded">
                    {editingId ? 'Update Experience' : 'Add Experience'}
                </button>
            </form>

            <div className="space-y-4">
                {experiences.map(exp => (
                    <div key={exp._id} className="bg-secondary p-4 rounded flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-xl">{exp.role} @ {exp.company}</h3>
                            <p className="text-gray-400 text-sm">
                                {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(exp)} className="text-accent hover:underline">Edit</button>
                            <button onClick={() => handleDelete(exp._id)} className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminExperienceList;
