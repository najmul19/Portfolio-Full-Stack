import { useEffect, useState } from 'react';
import certificateService from '../../services/certificateService';
import { FaExternalLinkAlt, FaAward, FaFilePdf, FaImage } from 'react-icons/fa';

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
        <section className="py-24 px-6 bg-grid-pattern">
            <div className="max-w-6xl mx-auto">
                <h2 className="section-heading mb-12">Certifications</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map(cert => (
                        <div key={cert._id} className="glass p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full" style={{ borderTop: '4px solid var(--c-accent)' }}>
                            {/* Top info */}
                            <div className="mb-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-opacity-10"
                                        style={{ background: 'var(--c-accent-subtle)' }}
                                    >
                                        <FaAward className="text-xl" style={{ color: 'var(--c-accent)' }} />
                                    </div>
                                    <span
                                        className="text-xs font-mono py-1 px-2 rounded-full mb-2 inline-block"
                                        style={{ background: 'var(--c-bg-alt)', color: 'var(--c-text-muted)' }}
                                    >
                                        {new Date(cert.issueDate).getFullYear()}
                                    </span>
                                </div>

                                <h3
                                    className="text-xl font-bold mb-3 group-hover:text-accent transition-colors min-h-[3rem]"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {cert.name}
                                </h3>
                                <p className="text-sm font-medium" style={{ color: 'var(--c-text-secondary)' }}>
                                    {cert.issuingOrganization}
                                </p>
                            </div>

                            {/* Thumbnail / Preview Area */}
                            {cert.fileUrl && (
                                <div className="mt-auto">
                                    <div className="relative rounded-lg overflow-hidden border bg-[var(--c-bg-alt)]" style={{ borderColor: 'var(--c-border)' }}>
                                        {cert.fileType === 'image' ? (
                                            <div className="aspect-video relative group-hover:opacity-90 transition-opacity">
                                                <img
                                                    src={cert.fileUrl}
                                                    alt={cert.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video flex items-center justify-center bg-[var(--c-bg-alt)]">
                                                <FaFilePdf className="text-4xl opacity-50" style={{ color: 'var(--c-text-muted)' }} />
                                            </div>
                                        )}

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-[2px]">
                                            <a
                                                href={cert.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white rounded-full hover:scale-110 transition-transform shadow-lg text-gray-900"
                                                title={cert.fileType === 'pdf' ? 'View PDF' : 'View Certificate'}
                                            >
                                                {cert.fileType === 'pdf' ? (
                                                    <FaFilePdf className="text-red-600 text-lg" />
                                                ) : (
                                                    <FaImage className="text-blue-600 text-lg" />
                                                )}
                                            </a>
                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-[var(--c-accent)] text-white rounded-full hover:scale-110 transition-transform shadow-lg"
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
                                <div className="mt-auto pt-4 border-t border-[var(--c-border-light)]">
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm flex items-center gap-2 hover:underline font-medium"
                                        style={{ color: 'var(--c-accent)' }}
                                    >
                                        Verify Credential <FaExternalLinkAlt className="text-xs" />
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
