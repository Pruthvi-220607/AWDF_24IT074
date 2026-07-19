import React from 'react';

const projectList = [
  {
    id: 1,
    title: '🚀 Developer Portfolio',
    description: 'A modern, responsive developer portfolio showcasing projects, skills, and contact information with a seamless dark/light mode toggle.',
    tags: ['React', 'Vite', 'Vanilla CSS', 'React Router'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: '📈 Task Dashboard',
    description: 'An interactive productivity dashboard featuring drag-and-drop task boards, state management, progress analytics, and custom templates.',
    tags: ['React', 'State Hooks', 'CSS Grid', 'LocalStorage'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: '🧠 AI Assistant Interface',
    description: 'A responsive chat interface styling with speech-to-text, message history, live search filters, and smooth markdown messaging output.',
    tags: ['React', 'OpenAI API', 'CSS Flexbox', 'Web Speech API'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

function Projects() {
  return (
    <section className="projects-section">
      <div className="card">
        <h2 className="section-title">📂 My Projects</h2>
        <div className="projects-grid">
          {projectList.map((project) => (
            <div key={project.id} className="card project-card">
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a href={project.demoUrl} className="project-link primary">Live Demo</a>
                <a href={project.githubUrl} className="project-link secondary">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
