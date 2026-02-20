import { useEffect, useState } from 'react';
import resumeService from '../../services/resumeService';
import { FaCloudDownloadAlt } from 'react-icons/fa';

const ResumeDownload = () => {
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const data = await resumeService.getActive();
                setResume(data.data);
            } catch (error) {
                // No active resume found, ignore
            }
        };
        fetchResume();
    }, []);

    if (!resume) return null;

    return (
        <div className="fixed bottom-10 right-10 z-50 group">
            <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-[var(--c-accent)] text-white border border-white/10"
                style={{
                    boxShadow: '0 20px 40px -10px rgba(43, 108, 238, 0.4)'
                }}
            >
                <FaCloudDownloadAlt className="text-2xl" />
                <span className="tracking-tight">Download Resume</span>
            </a>
        </div>
    );
};

export default ResumeDownload;
