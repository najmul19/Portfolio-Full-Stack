import { useState, useEffect } from 'react';
import messageService from '../../services/messageService';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            await messageService.send(formData);
            setStatus({ type: 'success', msg: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', msg: error.response?.data?.error || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16" data-aos="fade-down">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                        Get In <span className="animated-gradient-text">Touch</span>
                    </h1>
                    <p className="text-xl text-[var(--c-text-secondary)] leading-relaxed max-w-2xl">
                        Have a question or want to work together? Fill out the form below.
                    </p>
                </div>

                <div
                    className="panel p-8 md:p-12 shadow-2xl border border-[var(--c-border)] bg-[var(--c-bg-alt)]"
                    data-aos="zoom-in"
                    data-aos-duration="800"
                >
                    {status.msg && (
                        <div className={`p-5 mb-8 rounded-2xl font-bold tracking-tight border ${status.type === 'success' ? 'bg-green-600/10 text-green-400 border-green-600/20' : 'bg-red-600/10 text-red-400 border-red-600/20'}`}>
                            {status.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div data-aos="fade-right" data-aos-delay="200">
                                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-[var(--c-text-muted)] mb-3">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-2xl bg-[var(--c-bg)] border border-[var(--c-border)] focus:border-[var(--c-accent)] outline-none text-[var(--c-text)] transition-all focus:ring-1 focus:ring-[var(--c-accent)]/50 font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div data-aos="fade-left" data-aos-delay="200">
                                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-[var(--c-text-muted)] mb-3">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-2xl bg-[var(--c-bg)] border border-[var(--c-border)] focus:border-[var(--c-accent)] outline-none text-[var(--c-text)] transition-all focus:ring-1 focus:ring-[var(--c-accent)]/50 font-medium"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="300">
                            <label htmlFor="subject" className="block text-sm font-bold uppercase tracking-widest text-[var(--c-text-muted)] mb-3">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-[var(--c-bg)] border border-[var(--c-border)] focus:border-[var(--c-accent)] outline-none text-[var(--c-text)] transition-all focus:ring-1 focus:ring-[var(--c-accent)]/50 font-medium"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div data-aos="fade-up" data-aos-delay="400">
                            <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-[var(--c-text-muted)] mb-3">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-5 py-4 rounded-2xl bg-[var(--c-bg)] border border-[var(--c-border)] focus:border-[var(--c-accent)] outline-none text-[var(--c-text)] transition-all focus:ring-1 focus:ring-[var(--c-accent)]/50 font-medium resize-none shadow-inner"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            data-aos="fade-up"
                            data-aos-delay="500"
                            className={`w-full py-5 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl ${loading ? 'bg-slate-500 cursor-not-allowed text-white' : 'bg-[var(--c-accent)] hover:scale-[1.01] hover:shadow-[0_20px_40px_-10px_rgba(43,108,238,0.4)]'
                                }`}
                        >
                            {loading ? 'Sending Message...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <div className="mt-20 text-center" data-aos="fade-up" data-aos-delay="600">
                    <p className="text-[var(--c-text-muted)] font-medium mb-4">Or email me directly at</p>
                    <a href="mailto:inajmul605@gmail.com" className="text-2xl font-bold text-[var(--c-text)] hover:text-[var(--c-accent)] transition-colors tracking-tight">
                        inajmul605@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
