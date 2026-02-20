import { FaArrowRight } from 'react-icons/fa';

const ContactCTA = () => {
    return (
        <section className="">
            <div className="max-w-3xl mx-auto py-24 text-center">
                <h2
                    className="text-4xl md:text-5xl font-bold mb-8 tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Let's <span className="animated-gradient-text">Collaborate</span>
                </h2>
                <p className="text-xl mb-12 leading-relaxed text-[#94a3b8] max-w-2xl mx-auto">
                    Interested in AI research collaboration or have a challenging project?
                    I'm currently available for opportunities that push the boundaries of technology.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="/contact" className="btn-accent px-8 py-4 text-lg">
                        Start a Conversation
                        <FaArrowRight className="text-sm" />
                    </a>
                    <a
                        href="mailto:inajmul605@gmail.com"
                        className="btn-outline px-8 py-4 text-lg"
                    >
                        Email Directly
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
