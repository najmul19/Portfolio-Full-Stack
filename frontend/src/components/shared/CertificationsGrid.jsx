import { useEffect, useState } from 'react';
import certificateService from '../../services/certificateService';
import { FaExternalLinkAlt, FaAward, FaFilePdf, FaImage, FaArrowRight } from 'react-icons/fa';

const CertificationsGrid = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const data = await certificateService.getAll();
                setCertificates(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCertificates();
    }, []);

    if (certificates.length === 0) return null;

    return (
        <section className="">
            <div className="">
                <h2 className="section-heading mb-12">Certifications</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, idx) => (
                        <div
                            key={cert._id}
                            className="card p-8 group flex flex-col h-full hover:border-[var(--c-accent)]/20 transition-all duration-300 relative"
                            data-aos="zoom-in"
                            data-aos-delay={idx * 100}
                        >
                            {/* Top info */}
                            <div className="mb-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--c-surface)] border border-[var(--c-border)]"
                                    >
                                        <FaAward className="text-2xl text-[var(--c-accent)]" />
                                    </div>
                                    <span
                                        className="tag text-xs font-mono"
                                    >
                                        {new Date(cert.issueDate).getFullYear()}
                                    </span>
                                </div>

                                <h3
                                    className="text-xl font-bold mb-3 tracking-tight group-hover:text-[var(--c-accent)] transition-colors"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {cert.name}
                                </h3>
                                <p className="text-base text-[var(--c-text-secondary)] font-medium">
                                    {cert.issuingOrganization}
                                </p>
                            </div>

                            {/* Thumbnail / Preview Area */}
                            {cert.fileUrl && (
                                <div className="mt-auto pt-6">
                                    <div className="relative rounded-xl overflow-hidden bg-[var(--c-bg)] border border-[var(--c-border)] aspect-video">
                                        {cert.fileType === 'image' ? (
                                            <img
                                                src={cert.fileUrl}
                                                alt={cert.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02]">
                                                <FaFilePdf className="text-4xl text-[var(--c-text-muted)] mb-2" />
                                                <span className="text-xs uppercase tracking-widest text-[var(--c-text-muted)] font-bold">PDF Document</span>
                                            </div>
                                        )}

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--c-bg)]/40 backdrop-blur-[2px]">
                                            <a
                                                href={cert.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-11 h-11 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                                title={cert.fileType === 'pdf' ? 'View PDF' : 'View Certificate'}
                                            >
                                                {cert.fileType === 'pdf' ? (
                                                    <FaFilePdf className="text-xl" />
                                                ) : (
                                                    <FaImage className="text-xl" />
                                                )}
                                            </a>
                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-11 h-11 bg-[var(--c-accent)] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                                    title="Verify Credential"
                                                >
                                                    <FaExternalLinkAlt className="text-sm" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Fallback actions if no file */}
                            {!cert.fileUrl && cert.credentialUrl && (
                                <div className="mt-auto pt-6 border-t border-[var(--c-border)]">
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--c-accent)] font-semibold flex items-center gap-2 hover:translate-x-1 transition-transform"
                                    >
                                        Verify Credential <FaArrowRight className="text-xs" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationsGrid;
