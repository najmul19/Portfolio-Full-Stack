import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login({ email, password });
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-dark-bg">
            <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded bg-dark-bg text-white border border-gray-600 focus:border-accent outline-none"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-dark-bg text-white border border-gray-600 focus:border-accent outline-none"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-accent text-primary font-bold py-2 rounded hover:bg-opacity-90">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
