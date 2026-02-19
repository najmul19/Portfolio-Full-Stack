import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    // If no token, redirect to login page, but save the current location they were trying to go to
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If token exists, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
