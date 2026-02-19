import Hero from '../../components/shared/Hero';
import FeaturedProjects from '../../components/shared/FeaturedProjects';
import Skills from '../../components/shared/Skills';
import ContactCTA from '../../components/shared/ContactCTA';
import ExperienceTimeline from '../../components/shared/ExperienceTimeline';
import EducationTimeline from '../../components/shared/EducationTimeline';
import CertificationsGrid from '../../components/shared/CertificationsGrid';
import PublicationsList from '../../components/shared/PublicationsList';
import TestimonialsCarousel from '../../components/shared/TestimonialsCarousel';
import ResumeDownload from '../../components/shared/ResumeDownload';

const Home = () => {
    return (
        <div className="space-y-10 relative">
            <Hero />
            <ExperienceTimeline />
            <EducationTimeline />
            <Skills />
            <CertificationsGrid />
            <PublicationsList />
            <FeaturedProjects />
            <TestimonialsCarousel />
            <ContactCTA />
            <ResumeDownload />
        </div>
    );
};

export default Home;
