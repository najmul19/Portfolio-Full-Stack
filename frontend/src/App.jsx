import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import Contact from './pages/public/Contact';

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

        {/* Admin Routes will go here later */}
        {/* <Route path="/admin" element={<AdminLayout />}>...</Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
