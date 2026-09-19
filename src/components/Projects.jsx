import React from "react";
import { Briefcase, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Platform e-commerce modern dengan React, Node.js, dan MongoDB",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      link: "#",
    },
    {
      title: "Task Management App",
      description: "Aplikasi manajemen tugas dengan fitur drag & drop",
      image:
        "https://images.unsplash.com/photo-1611224885990-ab7363d1f2e2?w=800&h=500&fit=crop",
      tech: ["React", "Firebase", "Redux"],
      link: "#",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Dashboard analytics untuk media sosial dengan real-time data",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      tech: ["React", "Chart.js", "REST API"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <Briefcase className="inline mr-2" />
          Project Portfolio
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all transform hover:scale-105"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  Lihat Project <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
