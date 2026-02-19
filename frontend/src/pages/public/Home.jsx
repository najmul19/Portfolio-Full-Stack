import Hero from '../../components/shared/Hero';
import Skills from '../../components/shared/Skills';
import ExperienceTimeline from '../../components/shared/ExperienceTimeline';
import FeaturedProjects from '../../components/shared/FeaturedProjects';
import EducationTimeline from '../../components/shared/EducationTimeline';
import CertificationsGrid from '../../components/shared/CertificationsGrid';
import PublicationsList from '../../components/shared/PublicationsList';
import TestimonialsCarousel from '../../components/shared/TestimonialsCarousel';
import ContactCTA from '../../components/shared/ContactCTA';
import ResumeDownload from '../../components/shared/ResumeDownload';
import AchievementsList from '../../components/shared/AchievementsList';
import { useEffect } from 'react';

const Home = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-y-0">
            <Hero />

            {/* Research & Technical Core */}
            <div id="expertise" className="relative">
                <Skills />
            </div>

            <div id="publications" className="relative">
                <PublicationsList />
            </div>

            {/* Experience & Education */}
            <div className="bg-grid-pattern">
                <ExperienceTimeline />
                <EducationTimeline />
            </div>

            {/* Work */}
            <FeaturedProjects />

            <CertificationsGrid />

            <AchievementsList />

            <TestimonialsCarousel />

            <ContactCTA />

            <ResumeDownload />
        </div>
    );
};

export default Home;
