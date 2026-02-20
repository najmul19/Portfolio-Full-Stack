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
        <section className="">
            <div className="">
                <h2 className="section-heading mb-12">Work Experience</h2>

                <div className="relative">
                    {/* Vertical line - Subtle gradient */}
                    <div
                        className="absolute top-0 bottom-0 left-[23px] w-0.5 bg-gradient-to-b from-[var(--c-accent)] to-transparent opacity-20"
                    />

                    <div className="space-y-12">
                        {experiences.map((exp, idx) => (
                            <div
                                key={exp._id}
                                className="relative pl-12 md:pl-16 group"
                                data-aos="fade-left"
                                data-aos-delay={idx * 150}
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center border border-[var(--c-border)] z-10 bg-[var(--c-bg-alt)] shadow-xl transition-transform duration-300 group-hover:scale-110"
                                >
                                    <FiBriefcase
                                        className="text-lg text-[var(--c-accent)]"
                                    />
                                </div>

                                {/* Content */}
                                <div
                                    className="relative transition-all duration-300"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3
                                                    className="text-2xl font-bold tracking-tight text-[var(--c-text)] mb-1"
                                                    style={{ fontFamily: 'var(--font-heading)' }}
                                                >
                                                    {exp.position}
                                                </h3>
                                                <p className="text-lg font-semibold text-[var(--c-accent)]">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <time
                                                    className="tag bg-[var(--c-surface)] border-[var(--c-border)] text-[var(--c-text-muted)] font-mono py-1.5 px-3"
                                                >
                                                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                    {' — '}
                                                    {exp.current
                                                        ? 'Present'
                                                        : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </time>
                                                {exp.current && (
                                                    <span className="tag bg-[var(--c-success)]/10 text-[var(--c-success)] border-[var(--c-success)]/20 font-bold">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-lg leading-relaxed text-[var(--c-text-secondary)]">
                                            {exp.description}
                                        </p>

                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mt-2">
                                                {exp.technologies.map((tech, i) => (
                                                    <span key={i} className="tag text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
