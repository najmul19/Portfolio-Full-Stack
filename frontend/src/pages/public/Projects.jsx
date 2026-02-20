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
        window.scrollTo(0, 0);
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
        <section className="py-32 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20" data-aos="fade-down">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                        Portfolio <span className="animated-gradient-text">Projects</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-[var(--c-text-secondary)] leading-relaxed">
                        A collection of research implementations, AI automation tools, and full-stack applications.
                    </p>
                </div>

                {/* Search & Filter */}
                <div
                    className="mb-16 flex flex-col lg:flex-row gap-8 justify-between items-center p-8 rounded-[24px] bg-[var(--c-bg-alt)] border border-[var(--c-border)] shadow-2xl"
                    data-aos="fade-up"
                >
                    {/* Search */}
                    <div className="relative w-full lg:w-1/3">
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--c-text-muted)]" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl border bg-[var(--c-bg)] border-[var(--c-border)] text-[var(--c-text)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)]/50 transition-all font-medium"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                        {['All', 'Python', 'React', 'Node.js', 'Machine Learning'].map(tech => (
                            <button
                                key={tech}
                                onClick={() => setFilter(tech)}
                                className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 border ${filter === tech
                                    ? 'bg-[var(--c-accent)] text-white border-[var(--c-accent)] shadow-[0_10px_20px_-5px_rgba(43,108,238,0.4)]'
                                    : 'bg-[var(--c-surface)] text-[var(--c-text-secondary)] border-[var(--c-border)] hover:bg-[var(--c-surface-hover)] hover:text-[var(--c-text)]'
                                    }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={project._id}
                            className="card group overflow-hidden flex flex-col h-full hover:border-[var(--c-accent)]/20 transition-all duration-500"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[var(--c-bg)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-[2px]">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
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
                                            className="w-12 h-12 bg-[var(--c-accent)] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                                            title="View Live Demo"
                                        >
                                            <FaExternalLinkAlt className="text-lg" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {project.title}
                                </h3>
                                <p className="text-base mb-10 line-clamp-3 flex-1 text-[var(--c-text-secondary)] leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="tag text-xs font-bold py-1 px-3">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-40" data-aos="fade-in">
                        <p className="text-2xl font-bold text-[var(--c-text-muted)]">No projects found matching your search.</p>
                        <button
                            onClick={() => { setFilter('All'); setSearchTerm(''); }}
                            className="mt-6 text-[var(--c-accent)] font-semibold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
