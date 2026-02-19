import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import Contact from './pages/public/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminProjectList from './pages/admin/AdminProjectList';
import AdminSkillList from './pages/admin/AdminSkillList';
import AdminExperienceList from './pages/admin/AdminExperienceList';
import AdminMessageList from './pages/admin/AdminMessageList';
import AdminCertificationList from './pages/admin/AdminCertificationList';
import AdminEducationList from './pages/admin/AdminEducationList';
import AdminAchievementList from './pages/admin/AdminAchievementList';
import AdminTestimonialList from './pages/admin/AdminTestimonialList';
import AdminPublicationList from './pages/admin/AdminPublicationList';
import AdminResumeList from './pages/admin/AdminResumeList';
import AdminAbout from './pages/admin/AdminAbout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<div className="text-2xl">Experience Page</div>} />
          <Route path="education" element={<div className="text-2xl">Education Page</div>} />
          <Route path="publications" element={<div className="text-2xl">Publications Page</div>} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<AdminProjectList />} />
            <Route path="skills" element={<AdminSkillList />} />
            <Route path="experience" element={<AdminExperienceList />} />
            <Route path="messages" element={<AdminMessageList />} />
            <Route path="education" element={<AdminEducationList />} />
            <Route path="certificates" element={<AdminCertificationList />} />
            <Route path="achievements" element={<AdminAchievementList />} />
            <Route path="testimonials" element={<AdminTestimonialList />} />
            <Route path="publications" element={<AdminPublicationList />} />
            <Route path="resume" element={<AdminResumeList />} />
            <Route path="about" element={<AdminAbout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
