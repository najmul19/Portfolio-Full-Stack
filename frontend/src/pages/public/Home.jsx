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
        <div className="text-[var(--c-text)] font-sans selection:bg-[var(--c-accent)]/30">
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-24">
                {/* Research & Technical Core */}
                <section id="expertise" className="panel" data-aos="fade-up">
                    <Skills />
                </section>

                <section id="publications" className="panel" data-aos="fade-up">
                    <PublicationsList />
                </section>

                {/* Experience & Education */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="panel" data-aos="fade-right">
                        <ExperienceTimeline />
                    </section>
                    <section className="panel" data-aos="fade-left">
                        <EducationTimeline />
                    </section>
                </div>

                {/* Work */}
                <section className="panel" data-aos="fade-up">
                    <FeaturedProjects />
                </section>

                <section className="panel" data-aos="fade-up">
                    <CertificationsGrid />
                </section>

                <section className="panel" data-aos="fade-up">
                    <AchievementsList />
                </section>

                <section className="panel" data-aos="fade-up">
                    <TestimonialsCarousel />
                </section>

                <section className="panel" data-aos="fade-up">
                    <ContactCTA />
                </section>
            </div>
            <ResumeDownload />
        </div>
    );
};

export default Home;
