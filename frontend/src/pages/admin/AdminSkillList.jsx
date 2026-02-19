import { useEffect, useState } from 'react';
import skillService from '../../services/skillService';

const AdminSkillList = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ name: '', category: '', icon: '' });

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            const data = await skillService.getAll();
            setSkills(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        try {
            await skillService.create(newSkill);
            setNewSkill({ name: '', category: '', icon: '' });
            loadSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this skill?')) {
            try {
                await skillService.delete(id);
                loadSkills();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

            {/* Simple Add Form */}
            <form onSubmit={handleAddSkill} className="bg-secondary p-4 rounded mb-8 flex gap-4">
                <input
                    placeholder="Skill Name"
                    value={newSkill.name}
                    onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="p-2 rounded bg-dark-bg border border-gray-600 w-1/4 text-white"
                    required
                />
                <input
                    placeholder="Category (Frontend, Tools...)"
                    value={newSkill.category}
                    onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="p-2 rounded bg-dark-bg border border-gray-600 w-1/4 text-white"
                    required
                />
                <input
                    placeholder="Icon URL (Optional)"
                    value={newSkill.icon}
                    onChange={e => setNewSkill({ ...newSkill, icon: e.target.value })}
                    className="p-2 rounded bg-dark-bg border border-gray-600 w-1/4 text-white"
                />
                <button type="submit" className="bg-accent text-primary font-bold px-4 py-2 rounded">Add</button>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map(skill => (
                    <div key={skill._id} className="bg-secondary p-4 rounded flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{skill.name}</h3>
                            <p className="text-sm text-gray-400">{skill.category}</p>
                        </div>
                        <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSkillList;
