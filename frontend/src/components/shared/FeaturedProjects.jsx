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
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="section-heading section-heading-center">Featured Projects</h2>
                    <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: 'var(--c-text-muted)' }}>
                        Selected works demonstrating technical expertise in AI, Machine Learning, and Full Stack Development
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project._id} className="card group overflow-hidden h-full flex flex-col">
                            {/* Zooming image */}
                            <div className="relative overflow-hidden h-52">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
                                >
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                            title="View Code"
                                        >
                                            <FaGithub className="text-gray-900 text-xl" />
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                            title="View Live Demo"
                                        >
                                            <FaExternalLinkAlt className="text-gray-900 text-lg" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3
                                    className="text-xl font-bold mb-3"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    className="text-sm mb-6 line-clamp-3 flex-1"
                                    style={{ color: 'var(--c-text-muted)' }}
                                >
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="tag text-xs py-1 px-2.5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/projects" className="btn-outline">
                        View All Projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
