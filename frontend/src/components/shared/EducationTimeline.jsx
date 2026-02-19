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
        <section className="py-20 px-6" style={{ background: 'var(--c-bg-alt)' }}>
            <div className="max-w-4xl mx-auto">
                <h2 className="section-heading mb-10">Education</h2>

                {/* Timeline */}
                <div className="relative">
                    <div
                        className="absolute top-0 bottom-0 left-[19px] w-px"
                        style={{ background: 'var(--c-border)' }}
                    />

                    <div className="space-y-8">
                        {educations.map(edu => (
                            <div key={edu._id} className="relative pl-12 group">
                                {/* Dot */}
                                <div
                                    className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10"
                                    style={{
                                        background: 'var(--c-bg)',
                                        borderColor: 'var(--c-accent)',
                                    }}
                                >
                                    <FiBookOpen
                                        className="text-sm"
                                        style={{ color: 'var(--c-accent)' }}
                                    />
                                </div>

                                {/* Card - Matching Publications Style */}
                                <div
                                    className="card p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                    style={{ borderLeft: '4px solid var(--c-accent)' }}
                                >

                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3
                                                className="text-xl font-bold mb-1"
                                                style={{
                                                    fontFamily: 'var(--font-heading)',
                                                }}
                                            >
                                                {edu.degree}
                                            </h3>

                                            {edu.fieldOfStudy && (
                                                <p
                                                    className="font-semibold text-sm"
                                                    style={{ color: 'var(--c-text)' }}
                                                >
                                                    {edu.fieldOfStudy}
                                                </p>
                                            )}

                                            <p
                                                className="text-sm font-medium mt-1"
                                                style={{ color: 'var(--c-text-secondary)' }}
                                            >
                                                {edu.institution}
                                            </p>
                                        </div>

                                        <time
                                            className="text-xs font-mono py-1 px-2 rounded-full inline-block border"
                                            style={{
                                                background: 'var(--c-bg-alt)',
                                                color: 'var(--c-text-secondary)',
                                                borderColor: 'var(--c-border-light)'
                                            }}
                                        >
                                            {new Date(edu.startDate).getFullYear()} — {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                                        </time>
                                    </div>

                                    {edu.description && (
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: 'var(--c-text-muted)' }}
                                        >
                                            {edu.description}
                                        </p>
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

export default EducationTimeline;
