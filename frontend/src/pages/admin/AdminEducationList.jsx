import { useEffect, useState } from 'react';
import educationService from '../../services/educationService';

const AdminEducationList = () => {
    const [educations, setEducations] = useState([]);
    const [formData, setFormData] = useState({
        institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false, description: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadEducations();
    }, []);

    const loadEducations = async () => {
        try {
            const data = await educationService.getAll();
            setEducations(data.data);
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
            if (editingId) {
                await educationService.update(editingId, formData);
            } else {
                await educationService.create(formData);
            }
            setFormData({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false, description: '' });
            setEditingId(null);
            loadEducations();
        } catch (error) {
            console.error(error);
            alert('Error saving education');
        }
    };

    const handleEdit = (edu) => {
        setFormData({
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: edu.startDate.split('T')[0],
            endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
            current: edu.current || false,
            description: edu.description || ''
        });
        setEditingId(edu._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this education?')) {
            try {
                await educationService.delete(id);
                loadEducations();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Education</h1>

            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                <input name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} placeholder="Field of Study" className="p-2 rounded bg-dark-bg border border-gray-600 text-white" required />

                <div className="flex gap-4">
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="flex-1 p-2 rounded bg-dark-bg border border-gray-600 text-white" required />
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.current} className="flex-1 p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                </div>

                <label className="flex items-center gap-2 text-white">
                    <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} />
                    Current Student
                </label>

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="3" className="md:col-span-2 p-2 rounded bg-dark-bg border border-gray-600 text-white"></textarea>

                <button type="submit" className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded">
                    {editingId ? 'Update Education' : 'Add Education'}
                </button>
            </form>

            <div className="space-y-4">
                {educations.map(edu => (
                    <div key={edu._id} className="bg-secondary p-4 rounded flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-xl">{edu.degree} in {edu.fieldOfStudy}</h3>
                            <p className="text-gray-400">{edu.institution}</p>
                            <p className="text-gray-500 text-sm">
                                {new Date(edu.startDate).toLocaleDateString()} - {edu.current ? 'Present' : new Date(edu.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(edu)} className="text-accent hover:underline">Edit</button>
                            <button onClick={() => handleDelete(edu._id)} className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEducationList;
