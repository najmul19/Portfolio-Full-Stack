import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    // We can add a Navbar and Footer here later
    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 font-sans">
            {/* Navbar Placeholder */}
            <nav className="p-4 bg-primary text-white sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="text-xl font-bold text-accent">MD. Portfolio</a>
                    <div className="space-x-4">
                        <a href="/" className="hover:text-accent">Home</a>
                        <a href="/projects" className="hover:text-accent">Projects</a>
                        <a href="/contact" className="hover:text-accent">Contact</a>
                        <a href="/login" className="hover:text-accent">Login</a>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 py-8">
                <Outlet />
            </main>

            {/* Footer Placeholder */}
            <footer className="p-4 bg-secondary text-center text-sm text-gray-400 mt-auto">
                &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;
