import { Outlet, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-dark-bg text-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-accent mb-8">Dashboard</h2>
                <nav className="flex-1 space-y-4">
                    <Link to="/admin/dashboard" className="block hover:text-accent">Overview</Link>
                    <Link to="/admin/projects" className="block hover:text-accent">Projects</Link>
                    <Link to="/admin/skills" className="block hover:text-accent">Skills</Link>
                    <Link to="/admin/messages" className="block hover:text-accent">Messages</Link>
                    <Link to="/admin/about" className="block hover:text-accent">About Me</Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
