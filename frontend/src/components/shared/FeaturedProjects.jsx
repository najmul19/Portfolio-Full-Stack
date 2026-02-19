import { useEffect, useState } from 'react';
import projectService from '../../services/projectService';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getAll();
                // Filter featured projects or just take the first 3
                const featured = data.data.filter(p => p.featured).slice(0, 3);
                setProjects(featured.length > 0 ? featured : data.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-20 px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                {projects.map((project) => (
                    <div key={project._id} className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition duration-300">
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech, index) => (
                                    <span key={index} className="text-xs bg-dark-bg text-accent px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-auto">
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-accent">
                                        GitHub
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProjects;
