import { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';
import { FaBookOpen } from 'react-icons/fa';

const PublicationsList = () => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await publicationService.getAll();
                setPublications(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPublications();
    }, []);

    if (publications.length === 0) return null;

    return (
        <section className="container mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-accent mb-6 border-b border-gray-700 pb-2">Publications</h2>
            <div className="space-y-4">
                {publications.map(pub => (
                    <div key={pub._id} className="flex gap-4 items-start">
                        <div className="mt-1 text-accent"><FaBookOpen /></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                {pub.url ? (
                                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">
                                        {pub.title}
                                    </a>
                                ) : pub.title}
                            </h3>
                            <p className="text-sm text-gray-400">{pub.publisher} • {new Date(pub.date).getFullYear()}</p>
                            <p className="text-gray-500 text-sm mt-1">{pub.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PublicationsList;
