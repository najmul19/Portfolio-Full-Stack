import { useEffect, useState } from 'react';
import achievementService from '../../services/achievementService';
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

const AchievementsList = () => {
    const [achievements, setAchievements] = useState([]);

    const [showAll, setShowAll] = useState(false);

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

    const displayedAchievements = showAll ? achievements : achievements.slice(0, 3);

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

                <div className="space-y-8">
                    {displayedAchievements.map((item, index) => (
                        <div
                            key={item._id}
                            className="card p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-start hover:border-[var(--c-accent)]/10 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Icon Container */}
                            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-accent)] shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {renderIcon(item.icon)}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                    <h3
                                        className="text-xl md:text-2xl font-bold tracking-tight text-[var(--c-text)]"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {item.title}
                                    </h3>
                                    <span className="tag text-xs font-mono py-1 px-3 bg-[var(--c-accent-subtle)] text-[var(--c-accent)] border border-[var(--c-accent)]/10">
                                        {new Date(item.date).getFullYear()}
                                    </span>
                                </div>

                                <p className="text-base md:text-lg leading-relaxed text-[var(--c-text-secondary)]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {achievements.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn px-8 py-3 rounded-full border border-[var(--c-border)] hover:border-[var(--c-accent)] transition-all duration-300 bg-[var(--c-surface)] text-[var(--c-text)] font-semibold flex items-center gap-2 group shadow-lg hover:shadow-[var(--c-accent)]/20 shadow-transparent"
                        >
                            {showAll ? 'See Less' : `See More (${achievements.length - 3} more)`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AchievementsList;
