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
        <section className="">
            <div className="">
                <h2 className="section-heading mb-12">Research Publications</h2>

                <div className="space-y-8">
                    {publications.map((pub, idx) => (
                        <div
                            key={pub._id}
                            className="card p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-start hover:border-white/10 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            {/* Icon */}
                            <div
                                className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl items-center justify-center bg-white/5 border border-white/5"
                            >
                                <FaBook className="text-xl text-[var(--c-accent)]" />
                            </div>

                            <div className="flex-1">
                                <h3
                                    className="text-xl font-bold mb-3 leading-tight"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {pub.url ? (
                                        <a
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-[var(--c-accent)] flex items-start gap-2 group transition-colors break-words"
                                            style={{ color: 'var(--c-text)' }}
                                        >
                                            <span className="group-hover:text-[var(--c-accent)] break-words">{pub.title}</span>
                                            <FaExternalLinkAlt
                                                className="text-xs mt-2 opacity-30 group-hover:opacity-100 transition-opacity text-[var(--c-accent)] shrink-0"
                                            />
                                        </a>
                                    ) : (
                                        pub.title
                                    )}
                                </h3>

                                <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[var(--c-accent)] font-semibold border border-white/5 break-words max-w-full">
                                        {pub.publisher}
                                    </span>
                                    <span className="text-[#64748b]">
                                        {new Date(pub.date).getFullYear()}
                                    </span>
                                </div>

                                <p className="text-base leading-relaxed text-[#94a3b8]">
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
