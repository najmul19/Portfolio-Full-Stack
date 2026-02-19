import { FaArrowRight } from 'react-icons/fa';

const ContactCTA = () => {
    return (
        <section
            className="py-24 px-6 text-center"
            style={{
                background: 'linear-gradient(135deg, var(--c-surface), var(--c-bg-alt))'
            }}
        >
            <div className="max-w-2xl mx-auto">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Let's <span className="gradient-text">Collaborate</span>
                </h2>
                <p
                    className="text-lg mb-10 leading-relaxed"
                    style={{ color: 'var(--c-text-muted)' }}
                >
                    Interested in AI research collaboration or have a challenging project?
                    I'm currently available for opportunities that push the boundaries of technology.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/contact" className="btn-accent">
                        Start a Conversation
                        <FaArrowRight className="text-sm" />
                    </a>
                    <a
                        href="mailto:inajmul605@gmail.com"
                        className="btn-outline"
                    >
                        Email Directly
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
