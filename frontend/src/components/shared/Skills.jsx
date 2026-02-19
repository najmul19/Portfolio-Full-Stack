import { useEffect, useState } from 'react';
import skillService from '../../services/skillService';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await skillService.getAll();
                setSkills(data.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, []);

    // Group skills by category
    const categories = [...new Set(skills.map(skill => skill.category))];

    return (
        <section className="py-20 px-6 bg-secondary/20">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map(category => (
                        <div key={category} className="bg-secondary p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-accent border-b border-gray-600 pb-2">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.filter(s => s.category === category).map(skill => (
                                    <div key={skill._id} className="flex items-center gap-2 bg-dark-bg px-3 py-2 rounded">
                                        {skill.icon && <img src={skill.icon} alt="" className="w-5 h-5" />}
                                        <span className="text-sm font-medium">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
