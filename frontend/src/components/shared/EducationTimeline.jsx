import { useEffect, useState } from 'react';
import educationService from '../../services/educationService';

const EducationTimeline = () => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const data = await educationService.getAll();
                setEducations(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEducation();
    }, []);

    if (educations.length === 0) return null;

    return (
        <section className="container mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-accent mb-8 border-b border-gray-700 pb-2">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educations.map(edu => (
                    <div key={edu._id} className="bg-secondary p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-accent">
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-lg text-gray-300 mb-1">{edu.fieldOfStudy}</p>
                        <p className="text-gray-400 font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {new Date(edu.startDate).getFullYear()} - {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                        </p>
                        {edu.description && <p className="mt-3 text-gray-400 text-sm">{edu.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationTimeline;
