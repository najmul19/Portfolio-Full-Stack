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

                <div className="relative space-y-12">
                    {/* Vertical Connecting Line */}
                    <div
                        className="absolute left-7 md:left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--c-accent)] via-[var(--c-accent)] to-transparent opacity-20 hidden sm:block"
                    />

                    {experiences.map((exp, idx) => (
                        <div
                            key={exp._id}
                            className="relative sm:pl-24 md:pl-28"
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            {/* Icon on the line */}
                            <div className="absolute left-0 top-2 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-accent)] shadow-xl z-10 hidden sm:flex group-hover:scale-110 transition-transform duration-300">
                                <FiBriefcase className="text-xl md:text-2xl" />
                            </div>

                            {/* Mobile Icon (inside card) */}
                            <div className="sm:hidden mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-accent)]">
                                <FiBriefcase className="text-lg" />
                            </div>

                            {/* Content Card */}
                            <div className="card p-6 md:p-8 hover:border-[var(--c-accent)]/20 transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3
                                            className="text-xl md:text-2xl font-bold tracking-tight text-[var(--c-text)]"
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
                                            className="tag bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-muted)] font-mono py-1 px-3 text-xs"
                                        >
                                            {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            {' — '}
                                            {exp.current
                                                ? 'Present'
                                                : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </time>
                                        {exp.current && (
                                            <span className="tag bg-[var(--c-success)]/10 text-[var(--c-success)] border border-[var(--c-success)]/20 font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-base md:text-lg leading-relaxed text-[var(--c-text-secondary)] mb-6">
                                    {exp.description}
                                </p>

                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                            <span key={i} className="tag text-xs px-2 py-1">
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
        </section>
    );
};

export default ExperienceTimeline;
