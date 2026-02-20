import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import Contact from './pages/public/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSkillList from './pages/admin/AdminSkillList';
import AdminExperienceList from './pages/admin/AdminExperienceList';
import AdminEducationList from './pages/admin/AdminEducationList';
import AdminProjectList from './pages/admin/AdminProjectList';
import AdminCertificationList from './pages/admin/AdminCertificationList';
import AdminPublicationList from './pages/admin/AdminPublicationList';
import AdminAchievementList from './pages/admin/AdminAchievementList';
import AdminTestimonialList from './pages/admin/AdminTestimonialList';
import AdminMessageList from './pages/admin/AdminMessageList';
import AdminResumeList from './pages/admin/AdminResumeList';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
            offset: 100,
        });
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Navigate to="/login" replace />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="about" element={<AdminAbout />} />
                        <Route path="skills" element={<AdminSkillList />} />
                        <Route path="experience" element={<AdminExperienceList />} />
                        <Route path="education" element={<AdminEducationList />} />
                        <Route path="projects" element={<AdminProjectList />} />
                        <Route path="certifications" element={<AdminCertificationList />} />
                        <Route path="publications" element={<AdminPublicationList />} />
                        <Route path="achievements" element={<AdminAchievementList />} />
                        <Route path="testimonials" element={<AdminTestimonialList />} />
                        <Route path="messages" element={<AdminMessageList />} />
                        <Route path="resume" element={<AdminResumeList />} />
                    </Route>
                </Route>

                {/* 404 Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
