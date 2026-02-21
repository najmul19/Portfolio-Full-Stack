import { useEffect, useState, useRef, useMemo } from 'react';
import aboutService from '../../services/aboutService';
import { useTheme } from '../../context/ThemeContext';
import { FiDownload } from 'react-icons/fi';
import { HiArrowRight } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaYoutube, FaFacebook } from 'react-icons/fa';

/* ─────────────────────────────────────────────
   Typing Effect Hook with Sound Support
   ───────────────────────────────────────────── */
const useTypewriter = (text, speed = 40, delay = 1000) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    // Tiny base64 encoded mechanical tap sound (0.05s)
    const audioRef = useRef(new Audio('data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAAAAAA/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+'));

    useEffect(() => {
        if (!text) return;

        let i = 0;
        setDisplayText('');
        setIsComplete(false);

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                if (i <= text.length) {
                    setDisplayText(text.slice(0, i));

                    // Play sound on each character (except space)
                    if (text[i - 1] !== ' ' && audioRef.current) {
                        const sound = audioRef.current.cloneNode();
                        sound.volume = 0.05;
                        sound.play().catch(() => { });
                    }

                    i++;
                } else {
                    clearInterval(interval);
                    setIsComplete(true);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [text, speed, delay]);

    return { displayText, isComplete };
};

/* ─────────────────────────────────────────────
   Concentric dashed rings (avatar decoration)
   ───────────────────────────────────────────── */
const ConcentricRings = ({ accent }) => (
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {[80, 130, 180, 230, 280, 330].map((r, i) => (
            <circle
                key={r}
                cx="200" cy="200" r={r}
                fill="none"
                stroke={accent}
                strokeWidth="1"
                strokeDasharray="4 10"
                strokeOpacity={0.22 - i * 0.025}
            />
        ))}
    </svg>
);

/* ─────────────────────────────────────────────
   Main Hero
   ───────────────────────────────────────────── */
const Hero = () => {
    const { theme } = useTheme();
    const [about, setAbout] = useState(null);
    const isDark = theme === 'dark';

    useEffect(() => {
        aboutService.getAbout()
            .then(res => setAbout(res.data))
            .catch(() => { });
    }, []);

    const fullRoles = about?.title || 'AI/ML Researcher · AI Automation Engineer · Full Stack Engineer';
    const { displayText } = useTypewriter(fullRoles, 35, 1200);

    /* Split name into two parts for coloring */
    const nameParts = useMemo(() => {
        const fullName = about?.name || 'Md. Najmul Islam';
        const parts = fullName.split(' ');
        if (parts.length > 1) {
            const last = parts.pop();
            return { first: parts.join(' '), last };
        }
        return { first: fullName, last: '' };
    }, [about?.name]);

    /* ── Theme-derived tokens ── */
    const tokens = isDark ? {
        accent: '#2b6cee',
        accentLight: '#60a5fa',
        nameColor: '#ffffff',
        roleColor: '#94a3b8',
        bioColor: '#94a3b8',
        badgeBg: 'rgba(43,108,238,0.12)',
        badgeBorder: 'rgba(43,108,238,0.35)',
        badgeText: '#60a5fa',
        btnPrimary: { background: '#2b6cee', boxShadow: '0 4px 20px rgba(43,108,238,0.4)', color: '#fff' },
        btnOutline: { border: '1.5px solid rgba(255,255,255,0.18)', color: '#e2e8f0', background: 'transparent' },
        techLabel: '#475569',
        techColor: '#60a5fa',
        divider: 'rgba(255,255,255,0.07)',
        avatarBorder: 'rgba(43,108,238,0.5)',
        avatarGlow: 'rgba(43,108,238,0.25)',
        avatarShadow: '0 0 40px rgba(43,108,238,0.3), 0 0 80px rgba(43,108,238,0.1)',
        dotColor: 'rgba(43,108,238,0.7)',
        dotGlow: '0 0 8px rgba(43,108,238,0.8)',
        topLine: 'linear-gradient(90deg, transparent, rgba(43,108,238,0.7), transparent)',
    } : {
        accent: '#0d9488',
        accentLight: '#0d9488',
        nameColor: '#0f172a',
        roleColor: '#334155',
        bioColor: '#475569',
        badgeBg: 'rgba(13,148,136,0.1)',
        badgeBorder: 'rgba(13,148,136,0.3)',
        badgeText: '#0f766e',
        btnPrimary: { background: '#0d9488', boxShadow: '0 4px 20px rgba(13,148,136,0.35)', color: '#fff' },
        btnOutline: { border: '1.5px solid rgba(13,148,136,0.3)', color: '#0f172a', background: 'rgba(13,148,136,0.06)' },
        techLabel: '#64748b',
        techColor: '#0d9488',
        divider: 'rgba(13,148,136,0.12)',
        avatarBorder: 'rgba(13,148,136,0.5)',
        avatarGlow: 'rgba(13,148,136,0.2)',
        avatarShadow: '0 0 40px rgba(13,148,136,0.25), 0 0 80px rgba(13,148,136,0.08)',
        dotColor: 'rgba(13,148,136,0.6)',
        dotGlow: '0 0 8px rgba(13,148,136,0.7)',
        topLine: 'linear-gradient(90deg, transparent, rgba(13,148,136,0.6), transparent)',
    };

    const techStack = about?.techStack?.length
        ? about.techStack
        : ['React', 'Node.js', 'Express.js', 'MongoDB', 'PyTorch', 'TensorFlow', 'SQL', 'FastAPI'];

    return (
        <section
            className="relative overflow-hidden"
            style={{
                background: isDark
                    ? 'radial-gradient(circle at 20% 30%, rgba(43,108,238,0.08) 0%, transparent 60%)'
                    : 'radial-gradient(circle at 20% 30%, rgba(13,148,136,0.08) 0%, transparent 60%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Top accent line */}
            <div
                className="absolute inset-x-0 top-0 h-[2px] pointer-events-none"
                style={{ background: tokens.topLine, zIndex: 1 }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* ── LEFT ── */}
                    <div className="space-y-7 text-center lg:text-left">

                        {/* Available badge */}
                        <div
                            data-aos="fade-down"
                            data-aos-delay="100"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.375rem 1rem', borderRadius: 9999,
                                background: tokens.badgeBg,
                                border: `1px solid ${tokens.badgeBorder}`,
                                color: tokens.badgeText,
                                fontSize: '0.7rem', fontWeight: 800,
                                letterSpacing: '0.12em', textTransform: 'uppercase',
                            }}
                        >
                            <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                                <span className="animate-ping" style={{
                                    position: 'absolute', inset: 0, borderRadius: '50%',
                                    background: tokens.accentLight, opacity: 0.75,
                                }} />
                                <span style={{
                                    position: 'relative', width: 8, height: 8, borderRadius: '50%',
                                    background: tokens.accentLight, display: 'inline-block',
                                }} />
                            </span>
                            Available for Collaboration
                        </div>

                        {/* Name + Roles */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h1
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.06,
                                    letterSpacing: '-0.02em',
                                    color: tokens.nameColor,
                                }}
                            >
                                <span>{nameParts.first}</span>{' '}
                                <span className="animated-gradient-text" style={{ filter: 'brightness(1.1)' }}>
                                    {nameParts.last}
                                </span>
                            </h1>

                            <div style={{ minHeight: '1.5rem', marginTop: '1rem' }}>
                                <p style={{
                                    color: tokens.roleColor,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.01em',
                                    display: 'inline-block'
                                }}>
                                    {displayText}
                                    <span style={{
                                        display: 'inline-block',
                                        width: '2px',
                                        height: '1em',
                                        background: tokens.accent,
                                        marginLeft: '4px',
                                        verticalAlign: 'middle',
                                        animation: 'blink 1s step-end infinite'
                                    }} />
                                </p>
                            </div>
                        </div>

                        {/* Bio */}
                        <p
                            data-aos="fade-up"
                            data-aos-delay="300"
                            style={{ color: tokens.bioColor, lineHeight: 1.75, maxWidth: '34rem', fontSize: '0.975rem' }}
                        >
                            {about?.description ? about.description : (
                                <>
                                    Pioneering{' '}
                                    <span style={{ color: tokens.accentLight, fontWeight: 600 }}>
                                        clinically responsible AI solutions
                                    </span>
                                    . Bridging the gap between theoretical deep learning and reliable,
                                    real-world healthcare applications through rigorous validation and
                                    imbalance-aware frameworks.
                                </>
                            )}
                        </p>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="400"
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.25rem', justifyContent: 'center', lg: { justifyContent: 'flex-start' } }}
                            className="justify-center lg:justify-start"
                        >
                            <a
                                href="/projects"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.75rem 1.5rem', borderRadius: 12,
                                    fontWeight: 700, fontSize: '0.875rem',
                                    transition: 'all 0.2s',
                                    ...tokens.btnPrimary,
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                            >
                                View My Work
                                <HiArrowRight style={{ fontSize: '1rem' }} />
                            </a>

                            {about?.resume ? (
                                <a
                                    href={about.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.75rem 1.5rem', borderRadius: 12,
                                        fontWeight: 700, fontSize: '0.875rem',
                                        transition: 'all 0.2s',
                                        ...tokens.btnOutline,
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                >
                                    <FiDownload style={{ fontSize: '1rem' }} />
                                    Download Resume
                                </a>
                            ) : (
                                <a
                                    href="/contact"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.75rem 1.5rem', borderRadius: 12,
                                        fontWeight: 700, fontSize: '0.875rem',
                                        transition: 'all 0.2s',
                                        ...tokens.btnOutline,
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                >
                                    Get In Touch
                                </a>
                            )}
                        </div>

                        {/* Social Links Updated */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="500"
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                        >
                            <span style={{
                                fontSize: '0.625rem', fontWeight: 900,
                                textTransform: 'uppercase', letterSpacing: '0.22em',
                                color: tokens.techLabel,
                            }}>
                                Connect
                            </span>
                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }} className="justify-center lg:justify-start">
                                {[
                                    { icon: FaLinkedin, href: about?.social?.linkedin || 'https://linkedin.com/in/najmul19', label: 'LinkedIn' },
                                    { icon: FaGithub, href: about?.social?.github || 'https://github.com/najmul19', label: 'GitHub' },
                                    {
                                        icon: FaYoutube,
                                        href: about?.social?.youtube || about?.social?.twitter || '#',
                                        label: 'YouTube'
                                    },
                                    {
                                        icon: FaFacebook,
                                        href: about?.social?.facebook || about?.social?.instagram || '#',
                                        label: 'Facebook'
                                    },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: tokens.roleColor,
                                            fontSize: '1.4rem',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = tokens.accent}
                                        onMouseLeave={e => e.currentTarget.style.color = tokens.roleColor}
                                        aria-label={label}
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Tech stack strip */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            style={{
                                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                                gap: '0.75rem 1rem', paddingTop: '1.5rem',
                                borderTop: `1px solid ${tokens.divider}`,
                                justifyContent: 'center'
                            }}
                            className="justify-center lg:justify-start"
                        >
                            <span style={{
                                fontSize: '0.625rem', fontWeight: 900,
                                textTransform: 'uppercase', letterSpacing: '0.22em',
                                color: tokens.techLabel,
                            }}>
                                Tech Stack
                            </span>
                            {techStack.map((t, i) => (
                                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: tokens.techColor }}>{t}</span>
                                    {i < techStack.length - 1 && (
                                        <span style={{ color: tokens.techLabel, fontSize: 10 }}>·</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end order-first lg:order-last">
                        <div
                            data-aos="zoom-in"
                            data-aos-delay="400"
                            className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
                        >

                            {/* Concentric rings */}
                            <ConcentricRings accent={tokens.accent} />

                            {/* Glow blob behind avatar */}
                            <div style={{
                                position: 'absolute', inset: '10%', borderRadius: '50%',
                                background: `radial-gradient(circle, ${tokens.avatarGlow} 0%, transparent 70%)`,
                                filter: 'blur(24px)',
                            }} />

                            {/* Avatar circle */}
                            <div style={{
                                position: 'absolute', inset: '13%', borderRadius: '50%',
                                overflow: 'hidden',
                                border: `3px solid ${tokens.avatarBorder}`,
                                boxShadow: tokens.avatarShadow,
                            }}>
                                {about?.avatar ? (
                                    <img
                                        src={about.avatar}
                                        alt={about?.name || 'Profile photo'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%', height: '100%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: `linear-gradient(135deg, ${tokens.accent}33, ${tokens.accent})`,
                                        color: '#fff', fontWeight: 800, fontSize: '4rem',
                                    }}>
                                        {(about?.name || 'N')[0]}
                                    </div>
                                )}
                            </div>

                            {/* Floating pulse nodes */}
                            {[
                                { style: { top: '6%', left: '50%' }, size: 8, delay: '0s' },
                                { style: { top: '50%', right: '4%' }, size: 6, delay: '0.6s' },
                                { style: { bottom: '8%', left: '28%' }, size: 7, delay: '1.1s' },
                                { style: { top: '28%', left: '4%' }, size: 5, delay: '1.7s' },
                                { style: { bottom: '25%', right: '8%' }, size: 5, delay: '0.9s' },
                            ].map((dot, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: dot.size,
                                    height: dot.size,
                                    borderRadius: '50%',
                                    background: tokens.dotColor,
                                    boxShadow: tokens.dotGlow,
                                    animation: `heroPulse 2.2s ease-in-out ${dot.delay} infinite`,
                                    ...dot.style,
                                }} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes heroPulse {
                    0%, 100% { opacity: 0.45; transform: scale(1); }
                    50%       { opacity: 1;    transform: scale(1.5); }
                }
                @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
