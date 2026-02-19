import { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';
import { FaBook, FaExternalLinkAlt } from 'react-icons/fa';

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
        <section className="py-20 px-6" style={{ background: 'var(--c-bg-alt)' }}>
            <div className="max-w-4xl mx-auto">
                <h2 className="section-heading mb-10">Research Publications</h2>

                <div className="space-y-6">
                    {publications.map(pub => (
                        <div key={pub._id} className="card p-6 flex gap-5 items-start">
                            {/* Icon */}
                            <div
                                className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-lg items-center justify-center"
                                style={{ background: 'var(--c-accent-subtle)' }}
                            >
                                <FaBook className="text-xl" style={{ color: 'var(--c-accent)' }} />
                            </div>

                            <div className="flex-1">
                                <h3
                                    className="text-lg font-bold mb-2 leading-tight"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {pub.url ? (
                                        <a
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline flex items-start gap-2 group"
                                            style={{ color: 'var(--c-text)' }}
                                        >
                                            {pub.title}
                                            <FaExternalLinkAlt
                                                className="text-xs mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity"
                                                style={{ color: 'var(--c-accent)' }}
                                            />
                                        </a>
                                    ) : (
                                        pub.title
                                    )}
                                </h3>

                                <p className="text-sm mb-3" style={{ color: 'var(--c-text-secondary)' }}>
                                    <span className="font-semibold" style={{ color: 'var(--c-text)' }}>
                                        {pub.publisher}
                                    </span>
                                    <span className="dot-divider" />
                                    {new Date(pub.date).getFullYear()}
                                </p>

                                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-muted)' }}>
                                    {pub.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PublicationsList;
