import { useEffect, useState } from 'react';
import projectService from '../../services/projectService';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getAll();
                setProjects(data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    // Unique tech stack for filter
    const allTech = ['All', ...new Set(projects.flatMap(p => p.techStack))].sort();

    // Filter logic
    const filteredProjects = projects.filter(project => {
        const matchesFilter = filter === 'All' || project.techStack.includes(filter);
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <section className="py-12 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Portfolio <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--c-text-muted)' }}>
                        A collection of research implementations, AI automation tools, and full-stack applications.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-opacity-50 p-6 rounded-xl glass">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                            style={{
                                background: 'var(--c-bg)',
                                borderColor: 'var(--c-border)',
                                color: 'var(--c-text)',
                                '--tw-ring-color': 'var(--c-accent)'
                            }}
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {['All', 'Python', 'React', 'Node.js', 'Machine Learning'].map(tech => (
                            <button
                                key={tech}
                                onClick={() => setFilter(tech)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === tech
                                        ? 'bg-accent text-white shadow-lg'
                                        : 'bg-transparent border hover:bg-opacity-10'
                                    }`}
                                style={{
                                    background: filter === tech ? 'var(--c-accent)' : 'transparent',
                                    color: filter === tech ? '#fff' : 'var(--c-text-secondary)',
                                    borderColor: filter === tech ? 'transparent' : 'var(--c-border)',
                                }}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project._id} className="card group overflow-hidden flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
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
                                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {project.title}
                                </h3>
                                <p className="text-sm mb-6 line-clamp-3 flex-1" style={{ color: 'var(--c-text-muted)' }}>
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="tag text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg" style={{ color: 'var(--c-text-muted)' }}>No projects found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
