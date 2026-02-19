const ContactCTA = () => {
    return (
        <section id="contact" className="py-20 px-6 text-center">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
                <p className="text-gray-400 mb-8">
                    I'm currently available for freelance work or full-time opportunities.
                    If you have a project that needs some creative touch, feel free to contact me.
                </p>
                <a
                    href="/contact"
                    className="inline-block px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-90 transition transform hover:-translate-y-1"
                >
                    Say Hello
                </a>
            </div>
        </section>
    );
};

export default ContactCTA;
