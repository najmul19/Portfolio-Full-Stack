import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import Logo from '../components/shared/Logo';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
];

/* ─────────────────────────────────────────
   Full-page ambient particle background
   Inspired by miner1033 network effect
   ───────────────────────────────────────── */
const GlobalParticles = ({ isDark }) => {
    const canvasRef = useRef(null);
    const isDarkRef = useRef(isDark);
    useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        const mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Particle count based on screen size
        const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 120);
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.2,
        }));

        const draw = () => {
            const dark = isDarkRef.current;
            const accent = dark ? '#2b6cee' : '#0d9488';
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `${accent}${Math.round(p.opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.fill();
            });

            // Lines between nearby particles (Constellation/Web effect)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 150;

                    if (distSq < maxDist * maxDist) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - (dist / maxDist)) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Lines to mouse
            particles.forEach(p => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distSq = dx * dx + dy * dy;
                const maxDist = 200;

                if (distSq < maxDist * maxDist) {
                    const dist = Math.sqrt(distSq);
                    const alpha = (1 - (dist / maxDist)) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1, // Above root background but below content
                opacity: 0.8,
                background: 'transparent',
                transition: 'opacity 0.5s ease',
            }}
        />
    );
};

/* ─────────────────────────────────────────
   Main Layout
   ───────────────────────────────────────── */
const MainLayout = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [about, setAbout] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isDark = theme === 'dark';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Fetch social links/about for footer
        import('../services/aboutService').then(m => {
            m.default.getAbout().then(res => setAbout(res.data)).catch(() => { });
        });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: 'var(--c-bg)',
                color: 'var(--c-text)',
                overflowX: 'hidden',
            }}
        >
            {/* ── Full-page ambient particle canvas (fixed, z=0) ── */}
            <GlobalParticles isDark={isDark} />

            {/* ── Navbar (z=100) ── */}
            <nav
                className={`fixed top-0 md:top-6 left-0 md:left-1/2 md:-translate-x-1/2 z-[100] w-full md:max-w-4xl px-0 md:px-4 transition-all duration-500`}
                data-aos="fade-down"
                data-aos-duration="1200"
            >
                <div
                    className={`flex items-center justify-between px-6 py-4 md:py-3 md:rounded-2xl border-b md:border transition-all duration-500 ${scrolled || mobileMenuOpen
                        ? 'backdrop-blur-xl shadow-2xl'
                        : 'bg-transparent border-transparent'
                        }`}
                    style={(scrolled || mobileMenuOpen) ? {
                        background: 'var(--c-glass-bg)',
                        borderColor: 'var(--c-glass-border)',
                        boxShadow: 'var(--c-navbar-shadow)',
                    } : {}}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Logo isDark={isDark} className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
                        <span
                            className="text-xl md:text-2xl font-bold tracking-tighter"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            <span className="animated-gradient-text">MNI</span>
                        </span>
                    </Link>

                    {/* Desktop Links + toggle */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive
                                        ? 'text-[var(--c-accent)] bg-[var(--c-accent-subtle)]'
                                        : 'text-[var(--c-text-secondary)] hover:text-[var(--c-text)] hover:bg-[var(--c-surface-hover)]'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <span className="mx-2 h-4 w-px bg-[var(--c-border)]" />

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl transition-all duration-300 text-[var(--c-text-muted)] hover:text-[var(--c-accent)] hover:bg-[var(--c-surface-hover)]"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                        </button>
                    </div>

                    {/* Mobile Toggle Buttons */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-[var(--c-text-muted)]"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-[var(--c-text)]"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                <div
                    className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-[300px] opacity-100 border-b shadow-2xl' : 'max-h-0 opacity-0 pointer-events-none'}`}
                    style={{
                        background: 'var(--c-glass-bg)',
                        borderColor: 'var(--c-glass-border)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="flex flex-col p-6 gap-2">
                        {navLinks.map(link => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-4 text-base font-bold rounded-xl transition-all duration-300 ${isActive
                                        ? 'text-[var(--c-accent)] bg-[var(--c-accent-subtle)]'
                                        : 'text-[var(--c-text-secondary)] hover:text-[var(--c-text)]'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* ── Main content (z=10 so it sits above particles) ── */}
            <main className="flex-1" style={{ position: 'relative', zIndex: 10 }}>
                <Outlet />
            </main>

            {/* ── Footer ── */}
            <footer
                className="border-t border-[var(--c-border)] py-20"
                style={{ position: 'relative', zIndex: 10, background: 'var(--c-bg)' }}
                data-aos="fade-up"
                data-aos-offset="0"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        {/* Brand */}
                        <div className="md:col-span-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Logo isDark={isDark} className="w-10 h-10" />
                                <h3
                                    className="text-2xl font-bold tracking-tight"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    <span className="animated-gradient-text">MD Najmul Islam</span>
                                </h3>
                            </div>
                            <p className="text-lg text-[var(--c-text-secondary)] max-w-md leading-relaxed">
                                Building the future of AI through research and engineering.
                                Focused on deep learning, automation, and full-stack excellence.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="md:col-span-3">
                            <h4 className="text-xs font-bold mb-6 uppercase tracking-[0.2em] text-[var(--c-text-muted)]">
                                Navigate
                            </h4>
                            <div className="flex flex-col gap-3">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-base text-[var(--c-text-secondary)] hover:text-[var(--c-accent)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Social */}
                        <div className="md:col-span-3">
                            <h4 className="text-xs font-bold mb-6 uppercase tracking-[0.2em] text-[var(--c-text-muted)]">
                                Presence
                            </h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: FaGithub, href: about?.social?.github || 'https://github.com/najmul19', label: 'GitHub' },
                                    { icon: FaLinkedin, href: about?.social?.linkedin || 'https://linkedin.com/in/najmul19', label: 'LinkedIn' },
                                    { icon: FaFacebook, href: about?.social?.facebook || about?.social?.instagram || '#', label: 'Facebook' },
                                    { icon: FaYoutube, href: about?.social?.youtube || about?.social?.twitter || '#', label: 'YouTube' },
                                    { icon: FaEnvelope, href: `mailto:${about?.email || 'inajmul605@gmail.com'}`, label: 'Email' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-110"
                                        style={{
                                            background: 'var(--c-glass-bg)',
                                            borderColor: 'var(--c-border)',
                                            color: 'var(--c-text-muted)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = 'var(--c-accent)';
                                            e.currentTarget.style.borderColor = 'var(--c-accent)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = 'var(--c-text-muted)';
                                            e.currentTarget.style.borderColor = 'var(--c-border)';
                                        }}
                                        aria-label={label}
                                    >
                                        <Icon className="text-xl" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-20 pt-8 border-t border-[var(--c-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--c-text-muted)]">
                        <p>© {new Date().getFullYear()} MD Najmul Islam. All rights reserved.</p>
                        <div className="flex gap-8">
                            <span className="hover:text-[var(--c-accent)] transition-colors cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-[var(--c-accent)] transition-colors cursor-pointer">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
