import { useState } from 'react';
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
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8">Get In Touch</h1>
                <p className="text-gray-400 text-center mb-12">
                    Have a question or want to work together? Fill out the form below.
                </p>

                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                    {status.msg && (
                        <div className={`p-4 mb-6 rounded ${status.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                            {status.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded bg-dark-bg border border-gray-600 focus:border-accent outline-none text-white transition focus:ring-1 focus:ring-accent"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded bg-dark-bg border border-gray-600 focus:border-accent outline-none text-white transition focus:ring-1 focus:ring-accent"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded bg-dark-bg border border-gray-600 focus:border-accent outline-none text-white transition focus:ring-1 focus:ring-accent"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full p-3 rounded bg-dark-bg border border-gray-600 focus:border-accent outline-none text-white transition focus:ring-1 focus:ring-accent resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded font-bold text-primary transition duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-accent hover:bg-opacity-90 transform hover:-translate-y-1'
                                }`}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center text-gray-400">
                    <p>Or email me directly at</p>
                    <a href="mailto:your.email@example.com" className="text-accent hover:underline text-lg">
                        your.email@example.com
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
