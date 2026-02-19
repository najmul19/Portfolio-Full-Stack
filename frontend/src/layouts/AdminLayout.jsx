import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import authService from '../services/authService';
import {
    FiGrid, FiFolder, FiStar, FiMail, FiUser, FiBook,
    FiBriefcase, FiAward, FiFileText, FiMessageSquare,
    FiBookOpen, FiFile, FiSun, FiMoon, FiLogOut, FiMenu, FiX,
} from 'react-icons/fi';
import { useState } from 'react';

const sidebarLinks = [
    { path: '/admin/dashboard', label: 'Overview', icon: FiGrid },
    { path: '/admin/projects', label: 'Projects', icon: FiFolder },
    { path: '/admin/skills', label: 'Skills', icon: FiStar },
    { path: '/admin/messages', label: 'Messages', icon: FiMail },
    { path: '/admin/about', label: 'About Me', icon: FiUser },
    { path: '/admin/education', label: 'Education', icon: FiBook },
    { path: '/admin/experience', label: 'Experience', icon: FiBriefcase },
    { path: '/admin/certificates', label: 'Certifications', icon: FiAward },
    { path: '/admin/publications', label: 'Publications', icon: FiBookOpen },
    { path: '/admin/achievements', label: 'Achievements', icon: FiFileText },
    { path: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
    { path: '/admin/resume', label: 'Resume', icon: FiFile },
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen" style={{ background: 'var(--c-bg)', color: 'var(--c-text)' }}>
            {/* ── Mobile overlay ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className={`fixed md:static z-50 h-full w-64 flex flex-col border-r transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{
                    background: 'var(--c-bg-alt)',
                    borderColor: 'var(--c-border)',
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-5 py-5 border-b"
                    style={{ borderColor: 'var(--c-border)' }}
                >
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                        <span
                            className="text-lg font-bold"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            <span className="gradient-text">Admin</span>
                        </span>
                    </Link>
                    <button
                        className="md:hidden p-1"
                        onClick={() => setSidebarOpen(false)}
                        style={{ color: 'var(--c-text-muted)' }}
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {sidebarLinks.map(({ path, label, icon: Icon }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                                style={{
                                    background: isActive ? 'var(--c-accent-subtle)' : 'transparent',
                                    color: isActive ? 'var(--c-accent)' : 'var(--c-text-secondary)',
                                    borderLeft: isActive ? '3px solid var(--c-accent)' : '3px solid transparent',
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'var(--c-surface)';
                                        e.currentTarget.style.color = 'var(--c-text)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--c-text-secondary)';
                                    }
                                }}
                            >
                                <Icon className="text-base flex-shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div
                    className="p-4 border-t space-y-2"
                    style={{ borderColor: 'var(--c-border)' }}
                >
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                        style={{ color: 'var(--c-text-secondary)' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--c-surface)';
                            e.currentTarget.style.color = 'var(--c-text)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--c-text-secondary)';
                        }}
                    >
                        {theme === 'dark' ? <FiSun className="text-base" /> : <FiMoon className="text-base" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                        style={{ color: 'var(--c-danger)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        <FiLogOut className="text-base" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar (mobile) */}
                <header
                    className="flex md:hidden items-center justify-between px-4 py-3 border-b"
                    style={{
                        background: 'var(--c-bg-alt)',
                        borderColor: 'var(--c-border)',
                    }}
                >
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{ color: 'var(--c-text)' }}
                    >
                        <FiMenu className="text-xl" />
                    </button>
                    <span
                        className="text-sm font-bold"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        <span className="gradient-text">Admin</span>
                    </span>
                    <div className="w-6" />
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
