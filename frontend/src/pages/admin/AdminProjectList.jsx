import { useEffect, useState } from 'react';
import projectService from '../../services/projectService';

const AdminProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await projectService.getAll();
            setProjects(data.data);
        } catch (error) {
            console.error(error);
        }
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

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <button className="bg-accent text-primary px-4 py-2 rounded font-bold">Add New Project</button>
            </div>

            <div className="bg-secondary rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-700 text-gray-200">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Tech Stack</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                        {projects.map(project => (
                            <tr key={project._id} className="hover:bg-gray-600/50">
                                <td className="p-4">{project.title}</td>
                                <td className="p-4">{project.techStack.join(', ')}</td>
                                <td className="p-4 space-x-2">
                                    <button className="text-accent hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProjectList;
