import { useEffect, useState } from 'react';
import experienceService from '../../services/experienceService';

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await experienceService.getAll();
                setExperiences(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExperience();
    }, []);

    if (experiences.length === 0) return null;

    return (
        <section className="container mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-accent mb-8 border-b border-gray-700 pb-2">Work Experience</h2>
            <div className="space-y-8 relative border-l border-gray-700 ml-4">
                {experiences.map(exp => (
                    <div key={exp._id} className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-accent rounded-full -left-3 ring-8 ring-dark-bg">
                            <svg className="w-2.5 h-2.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm1 2h6v1H7V4zm0 3h6v1H7V7z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-white">
                            {exp.position} <span className="text-sm font-normal text-gray-400 ml-2">at {exp.company}</span>
                            {exp.current && <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">Current</span>}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                            {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                        </time>
                        <p className="mb-4 text-base font-normal text-gray-400">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.technologies && exp.technologies.map((tech, idx) => (
                                <span key={idx} className="bg-secondary text-accent text-xs px-2 py-1 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
