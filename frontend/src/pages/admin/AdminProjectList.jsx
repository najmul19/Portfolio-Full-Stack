import { useEffect, useState } from 'react';
import axios from 'axios';
import projectService from '../../services/projectService';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaStar, FaRegStar } from 'react-icons/fa';

const AdminProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '', // Comma separated
        liveLink: '',
        githubLink: '',
        thumbnail: '',
        featured: false
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await projectService.getAll();
            setProjects(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Using ImgBB API
            // Ideally this API key should be in .env (VITE_IMGBB_API_KEY)
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY_HERE';

            if (apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
                alert('Please configure VITE_IMGBB_API_KEY in your .env file');
                setUploading(false);
                return;
            }

            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
            setFormData(prev => ({ ...prev, thumbnail: response.data.data.url }));
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('Image upload failed. Check your API key or internet connection.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                techStack: typeof formData.techStack === 'string'
                    ? formData.techStack.split(',').map(t => t.trim()).filter(t => t)
                    : formData.techStack
            };

            if (editingId) {
                await projectService.update(editingId, payload);
            } else {
                await projectService.create(payload);
            }

            resetForm();
            loadProjects();
        } catch (error) {
            console.error(error);
            alert('Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(', '),
            liveLink: project.liveLink || '',
            githubLink: project.githubLink || '',
            thumbnail: project.thumbnail || '',
            featured: project.featured || false
        });
        setEditingId(project._id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.delete(id);
                loadProjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            techStack: '',
            liveLink: '',
            githubLink: '',
            thumbnail: '',
            featured: false
        });
        setEditingId(null);
        setFormVisible(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                {!formVisible && (
                    <button
                        onClick={() => setFormVisible(true)}
                        className="bg-accent text-primary px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-opacity-90"
                    >
                        <FaPlus /> Add Project
                    </button>
                )}
            </div>

            {formVisible && (
                <div className="bg-secondary p-6 rounded-lg mb-8 shadow-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{editingId ? 'Edit Project' : 'New Project'}</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-white"><FaTimes /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Project Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white focus:border-accent outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Technologies (comma separated)</label>
                                <input
                                    name="techStack"
                                    value={formData.techStack}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white focus:border-accent outline-none"
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white focus:border-accent outline-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Live Demo URL</label>
                                <input
                                    name="liveLink"
                                    value={formData.liveLink}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white focus:border-accent outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">GitHub URL</label>
                                <input
                                    name="githubLink"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-dark-bg border border-gray-600 text-white focus:border-accent outline-none"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Thumbnail Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-opacity-90 cursor-pointer"
                                />
                                {uploading && <p className="text-accent text-sm mt-1">Uploading...</p>}
                                {formData.thumbnail && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-400 mb-1">Preview:</p>
                                        <img src={formData.thumbnail} alt="Preview" className="h-20 w-auto rounded border border-gray-600" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center h-full pt-6">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded border-gray-600 text-accent focus:ring-accent bg-dark-bg"
                                    />
                                    <span className="text-white">Mark as Featured Project</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 rounded text-gray-300 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className={`px-6 py-2 rounded bg-accent text-primary font-bold hover:bg-opacity-90 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {editingId ? 'Update Project' : 'Save Project'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Project List Table */}
            <div className="bg-secondary rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
                            <tr>
                                <th className="p-4 w-16">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Tech Stack</th>
                                <th className="p-4 w-24 text-center">Featured</th>
                                <th className="p-4 w-32 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">Loading projects...</td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">No projects found. Add one above!</td>
                                </tr>
                            ) : (
                                projects.map(project => (
                                    <tr key={project._id} className="hover:bg-gray-700/50 transition-colors">
                                        <td className="p-4">
                                            {project.thumbnail ? (
                                                <img src={project.thumbnail} alt="" className="w-10 h-10 rounded object-cover border border-gray-600" />
                                            ) : (
                                                <div className="w-10 h-10 rounded bg-gray-600 flex items-center justify-center text-xs">No Img</div>
                                            )}
                                        </td>
                                        <td className="p-4 font-medium text-white">{project.title}</td>
                                        <td className="p-4 text-sm text-gray-400 max-w-xs truncate">
                                            {project.techStack.join(', ')}
                                        </td>
                                        <td className="p-4 text-center">
                                            {project.featured ? (
                                                <FaStar className="inline text-yellow-400" />
                                            ) : (
                                                <FaRegStar className="inline text-gray-600" />
                                            )}
                                        </td>
                                        <td className="p-4 text-right space-x-3">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="text-gray-400 hover:text-accent transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProjectList;
