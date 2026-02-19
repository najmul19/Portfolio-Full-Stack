import { useEffect, useState } from 'react';
import projectService from '../../services/projectService';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getAll();
                setProjects(data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading projects...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Here is a collection of my work. I've worked on various projects ranging from web applications to backend systems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project._id} className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-accent/20 transition duration-300 flex flex-col h-full relative group">
                        {/* Featured Badge */}
                        {project.featured && (
                            <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-2 py-1 rounded z-10">
                                Featured
                            </div>
                        )}

                        {/* Thumbnail */}
                        <div className="relative overflow-hidden h-48">
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-button-red text-white p-2 rounded-full hover:bg-hover-red transition"
                                        title="View Code"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-accent text-primary p-2 rounded-full hover:bg-opacity-80 transition"
                                        title="View Live"
                                    >
                                        Demo
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="text-xs font-medium bg-dark-bg text-gray-300 px-2 py-1 rounded border border-gray-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    No projects found. Check back later!
                </div>
            )}
        </div>
    );
};

export default Projects;
