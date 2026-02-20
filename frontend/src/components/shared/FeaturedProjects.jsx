import { useEffect, useState } from 'react';
import projectService from '../../services/projectService';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getAll();
                const featured = data.data.filter(p => p.featured).slice(0, 3);
                setProjects(featured.length > 0 ? featured : data.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    if (projects.length === 0) return null;

    return (
        <section className="">
            <div className="">
                <div className="mb-16">
                    <h2 className="section-heading">Featured Projects</h2>
                    <p className="mt-2 text-[var(--c-text-secondary)] text-lg max-w-2xl">
                        Selected works demonstrating technical expertise in AI, Machine Learning, and Full Stack Development
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={project._id}
                            className="card group overflow-hidden h-full flex flex-col hover:border-[var(--c-accent)]/20 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            {/* Image with overlay */}
                            <div className="relative overflow-hidden h-60">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 bg-[var(--c-accent)]/10 backdrop-blur-[2px]"
                                >
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                            title="View Code"
                                        >
                                            <FaGithub className="text-xl" />
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-[var(--c-accent)] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                            title="View Live Demo"
                                        >
                                            <FaExternalLinkAlt className="text-lg" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3
                                    className="text-2xl font-bold mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    className="text-base mb-8 line-clamp-3 flex-1 text-[var(--c-text-secondary)] leading-relaxed"
                                >
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="tag text-xs py-1 px-3">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <a href="/projects" className="btn-outline px-8 py-3.5">
                        View All Projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
