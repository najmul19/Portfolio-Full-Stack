import { useEffect, useState } from 'react';
import aboutService from '../../services/aboutService';

const AdminAbout = () => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        email: '',
        phone: '',
        location: '',
        social: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: ''
        },
        avatar: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        loadAbout();
    }, []);

    const loadAbout = async () => {
        try {
            const data = await aboutService.getAbout();
            if (data.data) {
                // Determine if we need to set specific fields or spread
                // Assuming data.data matches structure
                const aboutData = data.data;
                // Ensure social object exists
                if (!aboutData.social) aboutData.social = { github: '', linkedin: '', twitter: '', instagram: '' };
                setFormData(aboutData);
            }
        } catch (error) {
            console.error(error);
            // If no about data, we stay with defaults
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        if (e.target.name.startsWith('social_')) {
            const socialKey = e.target.name.split('_')[1];
            setFormData({
                ...formData,
                social: { ...formData.social, [socialKey]: e.target.value }
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Strip MongoDB metadata before sending
            const { _id, __v, createdAt, updatedAt, ...cleanData } = formData;

            if (_id) {
                await aboutService.update(_id, cleanData);
            } else {
                await aboutService.create(cleanData);
            }
            setSuccessMsg('Profile updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
            loadAbout();
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Profile & Socials</h1>
            {successMsg && (
                <div className="bg-green-600 text-white px-4 py-3 rounded mb-4 max-w-4xl">
                    {successMsg}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded space-y-6 max-w-4xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-1">Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-1">Bio</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Location</label>
                        <input name="location" value={formData.location} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Avatar URL</label>
                        <input name="avatar" value={formData.avatar} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-6">
                    <h2 className="text-xl font-bold mb-4 text-accent">Social Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-1">GitHub</label>
                            <input name="social_github" value={formData.social?.github || ''} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">LinkedIn</label>
                            <input name="social_linkedin" value={formData.social?.linkedin || ''} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">YouTube</label>
                            <input name="social_youtube" value={formData.social?.youtube || ''} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Facebook</label>
                            <input name="social_facebook" value={formData.social?.facebook || ''} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Twitter (X)</label>
                            <input name="social_twitter" value={formData.social?.twitter || ''} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Instagram</label>
                            <input name="social_instagram" value={formData.social?.instagram || ''} onChange={handleChange} className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-accent text-primary font-bold py-3 px-8 rounded w-full md:w-auto">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default AdminAbout;
