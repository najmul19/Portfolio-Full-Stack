import { useEffect, useState } from 'react';
import aboutService from '../../services/aboutService';

const Hero = () => {
    const [about, setAbout] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await aboutService.getAbout();
                setAbout(data.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchAbout();
    }, []);

    if (!about) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-6">
            <div className="mb-6">
                <img
                    src={about.avatar || "https://via.placeholder.com/150"}
                    alt={about.name}
                    className="w-32 h-32 rounded-full border-4 border-accent mx-auto object-cover"
                />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi, I'm <span className="text-accent">{about.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 mb-8">
                {about.title}
            </h2>
            <p className="max-w-2xl text-gray-300 mb-8 leading-relaxed">
                {about.description}
            </p>
            <div className="flex gap-4">
                <a href="#projects" className="px-6 py-3 bg-accent text-primary font-bold rounded hover:bg-opacity-80 transition">
                    View Projects
                </a>
                <a href="#contact" className="px-6 py-3 border border-accent text-accent font-bold rounded hover:bg-accent hover:text-primary transition">
                    Contact Me
                </a>
            </div>
        </section>
    );
};

export default Hero;
