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
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
            <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-full font-bold shadow-lg hover:bg-white transition-colors"
            >
                <FaCloudDownloadAlt className="text-xl" />
                Download Resume
            </a>
        </div>
    );
};

export default ResumeDownload;
