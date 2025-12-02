import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, ExternalLink, Star, MessageCircle } from 'lucide-react';
import ProjectModal from '../ProjectModal';

const ProjectsSection = ({ projects }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <section id="projects" className="py-20 md:py-32 overflow-hidden relative" ref={containerRef}>
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-float"></div>
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 px-4"
          >
            <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-4">
              <Briefcase className="w-5 h-5 text-primary-500" />
              <span className="text-primary-500 font-semibold">My Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-dark-500 text-lg md:text-xl max-w-2xl mx-auto">
              Showcasing my best work and creative solutions
            </p>
          </motion.div>

          {/* Horizontal Scrolling Projects */}
          <motion.div
            style={{ x }}
            className="flex gap-6 md:gap-8 pb-8 px-4"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const hasVideo = project.video_link;
  const images = project.images || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="flex-shrink-0 w-80 md:w-96 cursor-pointer perspective-container"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="glass-card overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
        {/* 3D Stacked Images/Video */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-dark-100">
          {hasVideo ? (
            <div className="absolute inset-0">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(project.video_link)}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : images.length > 0 ? (
            <div className="relative w-full h-full">
              {images.slice(0, 3).map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="absolute inset-0"
                  style={{
                    transform: `translateZ(${(3 - idx) * 10}px) translateY(${idx * 8}px)`,
                    zIndex: 3 - idx,
                  }}
                >
                  <img
                    src={`${getBackendUrl()}${img.image_url}`}
                    alt={`${project.name} ${idx + 1}`}
                    className="w-full h-full object-cover rounded-t-xl shadow-lg"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600">
              <Briefcase className="w-16 h-16 text-white opacity-50" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-dark-800 line-clamp-2">
            {project.name}
          </h3>
          <p className="text-dark-500 mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Skills Tags */}
          {project.skills && project.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-sm bg-primary-500/20 text-primary-600 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-3 py-1 text-sm bg-dark-200 text-dark-600 rounded-full">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Review Preview */}
          {project.featured_review && (
            <div className="glass-card p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < project.featured_review.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-dark-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-dark-600 line-clamp-2">
                "{project.featured_review.comment}"
              </p>
              <p className="text-xs text-dark-500 mt-2">
                - {project.featured_review.reviewer_name}
              </p>
            </div>
          )}

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

// Helper to get backend URL
const getBackendUrl = () => {
  return 'http://localhost:5000';
};

export default ProjectsSection;
