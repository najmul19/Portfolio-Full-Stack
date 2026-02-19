import Hero from '../../components/shared/Hero';
import FeaturedProjects from '../../components/shared/FeaturedProjects';
import Skills from '../../components/shared/Skills';
import ContactCTA from '../../components/shared/ContactCTA';

const Home = () => {
    return (
        <div className="space-y-10">
            <Hero />
            <Skills />
            <FeaturedProjects />
            <ContactCTA />
        </div>
    );
};

export default Home;
