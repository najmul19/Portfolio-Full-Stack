import { useEffect, useState } from 'react';
import certificateService from '../../services/certificateService';
import { FaExternalLinkAlt, FaAward } from 'react-icons/fa';

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
        <section className="container mx-auto px-6 py-10 bg-dark-bg">
            <h2 className="text-3xl font-bold text-accent mb-8 border-b border-gray-700 pb-2">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(cert => (
                    <div key={cert._id} className="bg-secondary p-5 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700">
                        {/* Certificate file thumbnail */}
                        {cert.fileUrl && cert.fileType === 'image' && (
                            <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer">
                                <img src={cert.fileUrl} alt={cert.name} className="w-full h-36 object-cover rounded mb-3 border border-gray-600 hover:opacity-90 transition-opacity" />
                            </a>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                            <FaAward className="text-accent text-2xl flex-shrink-0" />
                            <h3 className="font-bold text-white text-lg leading-tight">{cert.name}</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{cert.issuingOrganization}</p>
                        <p className="text-gray-500 text-xs mb-3">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                        <div className="flex flex-wrap gap-3">
                            {cert.credentialUrl && (
                                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-accent text-sm hover:underline flex items-center gap-1">
                                    View Credential <FaExternalLinkAlt className="text-xs" />
                                </a>
                            )}
                            {cert.fileUrl && cert.fileType === 'pdf' && (
                                <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                                    📄 View PDF
                                </a>
                            )}
                            {cert.fileUrl && cert.fileType === 'image' && (
                                <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                                    🖼 View Certificate
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CertificationsGrid;
