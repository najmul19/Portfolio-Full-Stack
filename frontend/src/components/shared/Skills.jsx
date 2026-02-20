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

    const categories = [...new Set(skills.map(skill => skill.category))];

    if (skills.length === 0) return null;

    return (
        <section className="">
            <div className="">
                <div className="text-center mb-14">
                    <h2 className="section-heading section-heading-center">
                        Technical Expertise
                    </h2>
                    <p
                        className="mt-4 text-sm max-w-xl mx-auto px-4 md:px-0"
                        style={{ color: 'var(--c-text-muted)' }}
                    >
                        Core competencies across Machine Learning, AI Automation, and Full Stack Engineering
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map(category => (
                        <div
                            key={category}
                            className="group card p-6 md:p-8 h-full"
                            data-aos="fade-up"
                        >
                            {/* Heading */}
                            <h3
                                className="text-base font-bold mb-4 pb-3 border-b border-[var(--c-border-light)] flex items-center gap-2"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--c-accent)',
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                                    style={{ background: 'var(--c-accent)' }}
                                />
                                {category}
                            </h3>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                                {skills
                                    .filter(s => s.category === category)
                                    .map(skill => (
                                        <span
                                            key={skill._id}
                                            className="tag"
                                        >
                                            {skill.icon && (
                                                <img
                                                    src={skill.icon}
                                                    alt=""
                                                    className="inline w-4 h-4 mr-2"
                                                />
                                            )}
                                            {skill.name}
                                        </span>
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
