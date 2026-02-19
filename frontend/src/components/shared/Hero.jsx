import { useEffect, useState } from 'react';
import aboutService from '../../services/aboutService';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    const [about, setAbout] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await aboutService.getAbout();
                setAbout(data.data);
            } catch (error) {
                /* No about data yet */
            }
        };
        fetchAbout();
    }, []);

    return (
        <section className="relative overflow-hidden py-24 md:py-32 px-6">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 bg-grid-pattern pointer-events-none"
                aria-hidden="true"
            />

            {/* Dynamic Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
                    style={{ background: 'var(--c-gradient-start)' }}
                />
                <div
                    className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
                    style={{ background: 'var(--c-gradient-end)' }}
                />
                <div
                    className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
                    style={{ background: 'var(--c-accent)' }}
                />

                {/* Neural Network / Tech Lines */}
                <div className="particle-container opacity-30">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>

                    {/* Abstract connection lines */}
                    <div className="connection-line w-48 top-1/4 left-1/4 rotate-45"></div>
                    <div className="connection-line w-64 top-2/3 right-1/3 -rotate-12"></div>
                    <div className="connection-line w-32 bottom-1/4 left-10 rotate-90"></div>
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto text-center z-10">

                {/* Avatar */}
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-gradient-start)] to-[var(--c-gradient-end)] rounded-full blur opacity-40 animate-pulse"></div>
                    <img
                        src={about?.avatar || "https://ui-avatars.com/api/?name=Najmul+Islam&background=0D8ABC&color=fff&size=256"}
                        alt="Profile"
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[var(--c-surface)] shadow-2xl mx-auto animate-float"
                    />
                </div>

                {/* Role tag */}
                <div className="mb-6">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm"
                        style={{
                            background: 'var(--c-accent-subtle)',
                            color: 'var(--c-accent)',
                            borderColor: 'var(--c-accent)',
                        }}
                    >
                        Open to Research Collaborations & Opportunities
                    </span>
                </div>

                {/* Name — animated gradient */}
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
                >
                    <span className="animated-gradient-text">
                        {about?.name || 'MD Najmul Islam'}
                    </span>
                </h1>

                {/* Headline */}
                <p
                    className="text-lg md:text-xl font-medium mb-6"
                    style={{ color: 'var(--c-text-secondary)' }}
                >
                    AI/ML Researcher{' '}
                    <span style={{ color: 'var(--c-text-muted)' }}>·</span>{' '}
                    AI Automation Engineer{' '}
                    <span style={{ color: 'var(--c-text-muted)' }}>·</span>{' '}
                    Full Stack Engineer
                </p>

                {/* Bio */}
                <p
                    className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
                    style={{ color: 'var(--c-text-muted)' }}
                >
                    {about?.bio ||
                        'Passionate about advancing AI research, building intelligent automation systems, and crafting scalable full-stack applications. Focused on Machine Learning, Deep Learning, and AI-driven solutions.'}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/projects" className="btn-accent">
                        View My Work
                        <FaArrowRight className="text-sm" />
                    </a>
                    <a href="/contact" className="btn-outline">
                        Get In Touch
                    </a>
                </div>

                {/* Stats */}
                {about && (
                    <div
                        className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 pt-8 border-t border-[var(--c-border-light)] relative"
                    >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--c-border)] to-transparent opacity-50" />

                        {[
                            { value: about.yearsOfExperience || '2+', label: 'Years Experience' },
                            { value: about.projectsCompleted || '20+', label: 'Projects Built' },
                            { value: about.researchPapers || '3+', label: 'Research Papers' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                                <div
                                    className="text-2xl md:text-3xl font-bold gradient-text"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    className="text-xs uppercase tracking-wider mt-1 font-medium"
                                    style={{ color: 'var(--c-text-muted)' }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
