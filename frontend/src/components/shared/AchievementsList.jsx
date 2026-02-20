import { useEffect, useState } from 'react';
import achievementService from '../../services/achievementService';
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

const AchievementsList = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const data = await achievementService.getAll();
                setAchievements(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAchievements();
    }, []);

    if (achievements.length === 0) return null;

    // Helper to render icon
    const renderIcon = (iconStr) => {
        // Simple fallback logic if icon string matches known icons
        // In a real app, might want a robust icon picker or mapping
        if (!iconStr) return <FaTrophy className="text-3xl text-yellow-500" />;

        // If it's a URL
        if (iconStr.startsWith('http')) {
            return <img src={iconStr} alt="icon" className="w-12 h-12 object-contain" />;
        }

        return <FaTrophy className="text-3xl text-yellow-500" />;
    };

    return (
        <section className="">
            <div className="">
                <div className="mb-16">
                    <h2 className="section-heading">Honors & Achievements</h2>
                    <p className="mt-2 text-[#94a3b8] text-lg max-w-2xl">
                        Recognition for contributions to research, technology, and community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((item, index) => (
                        <div
                            key={item._id}
                            className="card p-10 group flex flex-col h-full hover:border-white/10 transition-all duration-300 relative"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 text-[var(--c-accent)] group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                    {renderIcon(item.icon)}
                                </div>
                                <span
                                    className="tag text-xs font-mono"
                                >
                                    {new Date(item.date).getFullYear()}
                                </span>
                            </div>

                            <h3
                                className="text-2xl font-bold mb-4 tracking-tight group-hover:text-[var(--c-accent)] transition-colors"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {item.title}
                            </h3>

                            <p className="text-lg leading-relaxed text-[#94a3b8] flex-1">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsList;
