import { useEffect, useState } from 'react';
import testimonialService from '../../services/testimonialService';

const AdminTestimonialList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', role: '', company: '', message: '', rating: 5 });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { loadTestimonials(); }, []);

    const loadTestimonials = async () => {
        try {
            const data = await testimonialService.getAll();
            setTestimonials(data.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await testimonialService.update(editingId, formData);
            else await testimonialService.create(formData);
            setFormData({ name: '', role: '', company: '', message: '', rating: 5 });
            setEditingId(null);
            loadTestimonials();
        } catch (error) { alert('Error saving testimonial'); }
    };

    const handleEdit = (item) => {
        setFormData({ name: item.name, role: item.role, company: item.company, message: item.message, rating: item.rating });
        setEditingId(item._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete?')) {
            await testimonialService.delete(id);
            loadTestimonials();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Testimonials</h1>
            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" className="p-2 rounded bg-dark-bg text-white border border-gray-600" required />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows="3" className="md:col-span-2 p-2 rounded bg-dark-bg text-white border border-gray-600" required></textarea>
                <button type="submit" className="md:col-span-2 bg-accent text-primary font-bold py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            </form>
            <div className="space-y-4">
                {testimonials.map(item => (
                    <div key={item._id} className="bg-secondary p-4 rounded flex justify-between">
                        <div>
                            <h3 className="bold">{item.name} <span className="text-sm font-normal text-gray-400">({item.role} @ {item.company})</span></h3>
                            <p className="text-yellow-400">{'★'.repeat(item.rating)}</p>
                            <p className="text-gray-300 italic">"{item.message}"</p>
                        </div>
                        <div className="space-x-2"><button onClick={() => handleEdit(item)} className="text-accent">Edit</button><button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminTestimonialList;
