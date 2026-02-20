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

                <div className="relative">
                    {/* Vertical line - Subtle gradient */}
                    <div
                        className="absolute top-0 bottom-0 left-[23px] w-0.5 bg-gradient-to-b from-[var(--c-accent)] to-transparent opacity-20"
                    />

                    <div className="space-y-12">
                        {educations.map((edu, idx) => (
                            <div
                                key={edu._id}
                                className="relative pl-16 group"
                                data-aos="fade-right"
                                data-aos-delay={idx * 150}
                            >
                                {/* Dot */}
                                <div
                                    className="absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center border border-[var(--c-border)] z-10 bg-[var(--c-bg-alt)] shadow-xl transition-transform duration-300 group-hover:scale-110"
                                >
                                    <FiBookOpen
                                        className="text-lg text-[var(--c-accent)]"
                                    />
                                </div>

                                {/* Content */}
                                <div
                                    className="relative transition-all duration-300"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <h3
                                                    className="text-2xl font-bold tracking-tight text-[var(--c-text)] mb-1"
                                                    style={{ fontFamily: 'var(--font-heading)' }}
                                                >
                                                    {edu.degree}
                                                </h3>
                                                {edu.fieldOfStudy && (
                                                    <p className="text-lg font-semibold text-[var(--c-accent)]">
                                                        {edu.fieldOfStudy}
                                                    </p>
                                                )}
                                                <p className="text-base text-[var(--c-text-secondary)] font-medium mt-1">
                                                    {edu.institution}
                                                </p>
                                            </div>
                                            <time
                                                className="tag bg-[var(--c-surface)] border-[var(--c-border)] text-[var(--c-text-muted)] font-mono py-1.5 px-3"
                                            >
                                                {new Date(edu.startDate).getFullYear()} — {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                                            </time>
                                        </div>

                                        {edu.description && (
                                            <p className="text-lg leading-relaxed text-[var(--c-text-secondary)]">
                                                {edu.description}
                                            </p>
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

export default EducationTimeline;
