import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
];

const MainLayout = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: 'var(--c-bg)', color: 'var(--c-text)' }}
        >
            {/* ── Navbar ── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg' : ''
                    }`}
                style={{
                    background: scrolled ? 'var(--c-glass-bg)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(24px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--c-glass-border)' : 'none',
                    boxShadow: scrolled ? 'var(--c-navbar-shadow)' : 'none',
                }}
            >
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--c-text)' }}
                    >
                        <span className="animated-gradient-text">MNI</span>
                        <span className="ml-1 font-normal" style={{ color: 'var(--c-text-secondary)' }}>
                            .dev
                        </span>
                    </Link>

                    {/* Nav Links + Theme Toggle */}
                    <div className="flex items-center gap-1">
                        {navLinks.map(link => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                                    style={{
                                        color: isActive ? 'var(--c-accent)' : 'var(--c-text-secondary)',
                                    }}
                                    onMouseEnter={e => {
                                        if (!isActive) e.target.style.color = 'var(--c-text)';
                                    }}
                                    onMouseLeave={e => {
                                        if (!isActive) e.target.style.color = 'var(--c-text-secondary)';
                                    }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full"
                                            style={{ background: 'var(--c-accent)' }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Divider */}
                        <span
                            className="mx-2 h-5 w-px"
                            style={{ background: 'var(--c-border)' }}
                        />

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg transition-colors duration-200"
                            style={{ color: 'var(--c-text-muted)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-accent)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-muted)')}
                            aria-label="Toggle theme"
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Main Content ── */}
            <main className="flex-1 pt-20">
                <Outlet />
            </main>

            {/* ── Footer ── */}
            <footer
                className="mt-auto border-t"
                style={{
                    background: 'var(--c-bg-alt)',
                    borderColor: 'var(--c-border)',
                }}
            >
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div>
                            <h3
                                className="text-lg font-bold mb-3"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                <span className="gradient-text">MD Najmul Islam</span>
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-muted)' }}>
                                AI/ML Researcher · AI Automation Engineer · Full Stack Engineer
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4
                                className="text-sm font-semibold mb-3 uppercase tracking-wider"
                                style={{ color: 'var(--c-text-muted)' }}
                            >
                                Quick Links
                            </h4>
                            <div className="flex flex-col gap-2">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-sm transition-colors"
                                        style={{ color: 'var(--c-text-secondary)' }}
                                        onMouseEnter={e => (e.target.style.color = 'var(--c-accent)')}
                                        onMouseLeave={e => (e.target.style.color = 'var(--c-text-secondary)')}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Social */}
                        <div>
                            <h4
                                className="text-sm font-semibold mb-3 uppercase tracking-wider"
                                style={{ color: 'var(--c-text-muted)' }}
                            >
                                Connect
                            </h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: FaGithub, href: 'https://github.com/najmul19', label: 'GitHub' },
                                    { icon: FaLinkedin, href: 'https://linkedin.com/in/najmul19', label: 'LinkedIn' },
                                    { icon: FaEnvelope, href: 'mailto:inajmul605@gmail.com', label: 'Email' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg p-2 rounded-lg transition-colors"
                                        style={{
                                            color: 'var(--c-text-muted)',
                                            background: 'var(--c-accent-subtle)',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-accent)')}
                                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-muted)')}
                                        aria-label={label}
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div
                        className="mt-10 pt-6 border-t text-center text-sm"
                        style={{
                            borderColor: 'var(--c-border)',
                            color: 'var(--c-text-muted)',
                        }}
                    >
                        © {new Date().getFullYear()} MD Najmul Islam. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
