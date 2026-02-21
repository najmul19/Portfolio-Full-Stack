import { useEffect, useState } from 'react';
import educationService from '../../services/educationService';
import { FiBookOpen } from 'react-icons/fi';

const EducationTimeline = () => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const data = await educationService.getAll();
                const sorted = data.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // Newest first
                setEducations(sorted);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEducation();
    }, []);

    if (educations.length === 0) return null;

    return (
        <section className="">
            <div className="">
                <h2 className="section-heading mb-12">Education</h2>

                <div className="relative space-y-12">
                    {/* Vertical Connecting Line */}
                    <div
                        className="absolute left-7 md:left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--c-accent)] via-[var(--c-accent)] to-transparent opacity-20 hidden sm:block"
                    />

                    {educations.map((edu, idx) => (
                        <div
                            key={edu._id}
                            className="relative sm:pl-24 md:pl-28"
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            {/* Icon on the line */}
                            <div className="absolute left-0 top-2 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-[var(--c-bg)] border border-[var(--c-border)] text-[var(--c-accent)] shadow-xl z-10 hidden sm:flex group-hover:scale-110 transition-transform duration-300">
                                <FiBookOpen className="text-xl md:text-2xl" />
                            </div>

                            {/* Mobile Icon (inside card) */}
                            <div className="sm:hidden mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-accent)]">
                                <FiBookOpen className="text-lg" />
                            </div>

                            {/* Content Card */}
                            <div className="card p-6 md:p-8 hover:border-[var(--c-accent)]/20 transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3
                                            className="text-xl md:text-2xl font-bold tracking-tight text-[var(--c-text)]"
                                            style={{ fontFamily: 'var(--font-heading)' }}
                                        >
                                            {edu.degree}
                                        </h3>
                                        {edu.fieldOfStudy && (
                                            <p className="text-lg font-semibold text-[var(--c-accent)]">
                                                {edu.fieldOfStudy}
                                            </p>
                                        )}
                                        <p className="text-base text-[var(--c-text-secondary)] font-medium">
                                            {edu.institution}
                                        </p>
                                    </div>
                                    <time
                                        className="tag bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-muted)] font-mono py-1 px-3 text-xs"
                                    >
                                        {new Date(edu.startDate).getFullYear()} — {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                                    </time>
                                </div>

                                {edu.description && (
                                    <p className="text-base md:text-lg leading-relaxed text-[var(--c-text-secondary)]">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationTimeline;
