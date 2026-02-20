import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import { FaUserShield, FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/admin/dashboard');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        // Clear error when user types
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.login({ email, password });
            // Login successful
            // Redirect to where they came from or dashboard
            const from = location.state?.from?.pathname || '/admin/dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Invalid credentials. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--c-bg)] px-4">
            <div className="max-w-md w-full bg-[var(--c-bg-alt)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--c-border-light)] glass-strong">
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-accent/10 p-4 rounded-full mb-4">
                            <FaUserShield className="text-4xl text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
                        <p className="text-gray-400 text-sm mt-1">Please sign in to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded mb-6 flex items-center gap-2 text-sm">
                            <FaExclamationCircle className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    className="w-full bg-[var(--c-bg)] text-[var(--c-text)] border border-[var(--c-border)] rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:border-[var(--c-accent)] focus:ring-1 focus:ring-[var(--c-accent)] transition-all"
                                    placeholder="your-email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="w-full bg-[var(--c-bg)] text-[var(--c-text)] border border-[var(--c-border)] rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:border-[var(--c-accent)] focus:ring-1 focus:ring-[var(--c-accent)] transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[var(--c-accent)] text-white font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--c-accent)] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110'
                                }`}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </div>
                <div className="bg-gray-800/50 px-8 py-4 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Portfolio Admin. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
