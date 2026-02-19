import { useEffect, useState } from 'react';
import experienceService from '../../services/experienceService';
import { FiBriefcase } from 'react-icons/fi';

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await experienceService.getAll();
                const sorted = data.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setExperiences(sorted);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExperience();
    }, []);

    if (experiences.length === 0) return null;

    return (
        <section className="py-20 px-6" style={{ background: 'var(--c-bg-alt)' }}>
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <h2 className="section-heading mb-10">Work Experience</h2>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div
                        className="absolute top-0 bottom-0 left-[19px] w-px"
                        style={{ background: 'var(--c-border)' }}
                    />

                    <div className="space-y-8">
                        {experiences.map((exp) => (
                            <div key={exp._id} className="relative pl-12 group">
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10"
                                    style={{
                                        background: 'var(--c-bg)',
                                        borderColor: 'var(--c-accent)',
                                    }}
                                >
                                    <FiBriefcase
                                        className="text-sm"
                                        style={{ color: 'var(--c-accent)' }}
                                    />
                                </div>

                                {/* Card - Matching Publications Style */}
                                <div
                                    className="card p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                    style={{ borderLeft: '4px solid var(--c-accent)' }}
                                >

                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                                        <div>
                                            <h3
                                                className="text-xl font-bold mb-1"
                                                style={{
                                                    fontFamily: 'var(--font-heading)',
                                                }}
                                            >
                                                {exp.position}
                                            </h3>
                                            <p
                                                className="text-sm font-semibold"
                                                style={{ color: 'var(--c-text)' }}
                                            >
                                                {exp.company}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <time
                                                className="text-xs font-mono py-1 px-2 rounded-full inline-block border"
                                                style={{
                                                    background: 'var(--c-bg-alt)',
                                                    color: 'var(--c-text-secondary)',
                                                    borderColor: 'var(--c-border-light)'
                                                }}
                                            >
                                                {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                {' — '}
                                                {exp.current
                                                    ? 'Present'
                                                    : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            </time>
                                            {exp.current && (
                                                <span
                                                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                                                    style={{
                                                        background: 'rgba(34,197,94,0.1)',
                                                        color: 'var(--c-success)',
                                                    }}
                                                >
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p
                                        className="text-sm leading-relaxed mb-4"
                                        style={{ color: 'var(--c-text-muted)' }}
                                    >
                                        {exp.description}
                                    </p>

                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="tag"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
