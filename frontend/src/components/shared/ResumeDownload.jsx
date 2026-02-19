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
        <div className="fixed bottom-8 right-8 z-40 animate-bounce cursor-pointer group">
            <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105"
                style={{
                    background: 'var(--c-accent)',
                    color: '#fff',
                    boxShadow: '0 8px 30px rgba(6, 182, 212, 0.4)'
                }}
            >
                <FaCloudDownloadAlt className="text-xl group-hover:animate-pulse" />
                <span>Resume</span>
            </a>
        </div>
    );
};

export default ResumeDownload;
