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
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="section-heading section-heading-center">Honors & Achievements</h2>
                    <p className="text-center mt-4 max-w-2xl mx-auto" style={{ color: 'var(--c-text-secondary)' }}>
                        Recognition for contributions to research, technology, and community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((item, index) => (
                        <div
                            key={item._id}
                            className="glass p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                            style={{ borderTop: '4px solid var(--c-accent)' }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaStar className="text-6xl" />
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/30">
                                    {renderIcon(item.icon)}
                                </div>
                                <div>
                                    <span
                                        className="text-xs font-mono py-1 px-2 rounded-full mb-2 inline-block"
                                        style={{ background: 'var(--c-bg-alt)', color: 'var(--c-text-muted)' }}
                                    >
                                        {new Date(item.date).getFullYear()}
                                    </span>
                                </div>
                            </div>

                            <h3
                                className="text-xl font-bold mb-3 group-hover:text-accent transition-colors"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {item.title}
                            </h3>

                            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-secondary)' }}>
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
