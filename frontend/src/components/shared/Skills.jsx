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
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="section-heading section-heading-center">
                        Technical Expertise
                    </h2>
                    <p
                        className="mt-4 text-sm max-w-xl mx-auto"
                        style={{ color: 'var(--c-text-muted)' }}
                    >
                        Core competencies across Machine Learning, AI Automation, and Full Stack Engineering
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(category => (
                        <div
                            key={category}
                            className="
                                group
                                card 
                                p-6 
                                h-full
                                bg-[var(--c-surface)]
                                border border-[var(--c-border)]
                                shadow-sm
                                transition-all duration-300 ease-out
                                hover:-translate-y-1
                                hover:shadow-lg
                                hover:border-[var(--c-accent)]
                                hover:ring-1 hover:ring-[var(--c-accent)]
                            "
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
                                            // className="
                                            //     text-xs font-medium 
                                            //     px-2.5 py-1 
                                            //      rounded-xl
                                            //     transition-all duration-200
                                            //     border border-[var(--c-border-light)]
                                            //     hover:bg-[var(--c-accent)]
                                            //     hover:text-white
                                            //     hover:border-[var(--c-accent)]
                                            //     cursor-default
                                            // "
                                            className="
px-4 py-1.5
text-sm font-medium
rounded-full
transition-all duration-300
bg-[#1e293b]
text-cyan-400
hover:bg-[#0f172a]
hover:text-cyan-300
hover:shadow-[0_0_12px_rgba(34,211,238,0.4)]
"

                                            style={{
                                                background: 'var(--c-bg-alt)',
                                                color: 'var(--c-text)',
                                            }}
                                        >
                                            {skill.icon && (
                                                <img
                                                    src={skill.icon}
                                                    alt=""
                                                    className="inline w-4 h-4 mr-1.5"
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
