import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Briefcase, Star, MessageCircle, ExternalLink } from 'lucide-react';
import { config } from '../../config/credentials';
import ProjectModal from '../ProjectModal';

const ProjectsSection = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const constraintsRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (constraintsRef.current) {
      setContainerWidth(constraintsRef.current.scrollWidth);
    }
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  // Check if projects need scrolling animation
  const needsScroll = projects.length > 3;
  const displayProjects = needsScroll ? [...projects, ...projects, ...projects] : projects;

  return (
    <>
      <section id="projects" className="py-20 md:py-32 overflow-hidden relative">
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

          {/* Projects Container */}
          <div className={`relative ${needsScroll ? 'cursor-grab active:cursor-grabbing' : ''}`}>
            {/* Mobile: Scrollable with snap, Desktop: Continuous animation */}
            <div className="md:hidden">
              <div className="overflow-x-auto scrollbar-hide px-4 -mx-4">
                <div className="flex gap-4 snap-x snap-mandatory pb-8">
                  {projects.map((project, index) => (
                    <div key={project.id} className="snap-center flex-shrink-0 w-[85vw]">
                      <ProjectCard
                        project={project}
                        index={index}
                        onClick={() => setSelectedProject(project)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile scroll hint */}
              {projects.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center gap-2 mt-4"
                >
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-primary-500/30"
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Desktop: Original behavior */}
            <motion.div
              ref={constraintsRef}
              drag={needsScroll ? "x" : false}
              dragConstraints={needsScroll ? { left: -containerWidth / 3, right: 0 } : undefined}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              animate={needsScroll ? {
                x: [0, -containerWidth / 3],
              } : {}}
              transition={needsScroll ? {
                x: {
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                },
              } : {}}
              className={`hidden md:flex gap-6 md:gap-8 pb-8 px-4 ${!needsScroll ? 'justify-center' : ''}`}
            >
              {displayProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${index}`}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </div>
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
  const allImages = project.images || [];
  const [currentImages, setCurrentImages] = useState([...allImages]);
  const [videoVisible, setVideoVisible] = useState(true);

  const handleImageSwipe = (imageId) => {
    // Move swiped image to the end
    setCurrentImages(prev => {
      const filtered = prev.filter(img => img.id !== imageId);
      const swiped = prev.find(img => img.id === imageId);
      return [...filtered, swiped];
    });
  };

  const handleVideoSwipe = () => {
    // Hide video permanently, show images on top
    setVideoVisible(false);
  };

  const handleCardClick = (e) => {
    // Only trigger modal if clicking the card content, not dragging images/video
    if (e.target.closest('.draggable-image') || e.target.closest('.draggable-video')) return;
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleCardClick}
      className="flex-shrink-0 w-full md:w-80 lg:w-96 cursor-pointer h-full"
    >
      <div className="glass-card overflow-hidden h-full hover:shadow-2xl transition-all duration-300 rounded-2xl">
        {/* Image/Video Section with Playing Card Stack Effect */}
        <div className="relative h-64 md:h-72 overflow-visible bg-dark-100 p-4">
          {hasVideo && videoVisible && currentImages.length > 0 ? (
            // Video on top with images behind (images are draggable)
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {/* Background images (up to 3, draggable) */}
              {currentImages.slice(0, Math.min(3, currentImages.length)).reverse().map((img, idx) => {
                const imgIndex = Math.min(2, currentImages.length - 1) - idx;
                const offset = (imgIndex + 1) * 8; // Extra offset for behind video
                const rotation = (imgIndex + 1) * 3;
                // Top image behind video is draggable (imgIndex = 0 means first behind video)
                const isTopImage = idx === currentImages.slice(0, 3).length - 1;
                
                return (
                  <DraggableImage
                    key={img.id}
                    image={img}
                    projectName={project.name}
                    imgIndex={isTopImage ? 0 : imgIndex + 1}
                    offset={offset}
                    rotation={rotation}
                    zIndex={2 - imgIndex}
                    onSwipe={() => handleImageSwipe(img.id)}
                    delay={idx * 0.1}
                  />
                );
              })}
              
              {/* Video on top (draggable) */}
              <DraggableVideo
                videoUrl={project.video_link}
                projectName={project.name}
                onSwipe={handleVideoSwipe}
              />
            </div>
          ) : hasVideo && !videoVisible && currentImages.length > 0 ? (
            // Video was thrown away, show images on top now
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {currentImages.slice(0, Math.min(3, currentImages.length)).reverse().map((img, idx) => {
                const imgIndex = Math.min(2, currentImages.length - 1) - idx;
                const offset = imgIndex * 6; // Normal offset for images
                const rotation = imgIndex * 3;
                
                return (
                  <DraggableImage
                    key={img.id}
                    image={img}
                    projectName={project.name}
                    imgIndex={imgIndex}
                    offset={offset}
                    rotation={rotation}
                    zIndex={3 - imgIndex}
                    onSwipe={() => handleImageSwipe(img.id)}
                    delay={idx * 0.1}
                  />
                );
              })}
            </div>
          ) : currentImages.length > 0 ? (
            // Stacked images like playing cards (draggable)
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {currentImages.slice(0, Math.min(3, currentImages.length)).reverse().map((img, idx) => {
                const imgIndex = Math.min(2, currentImages.length - 1) - idx;
                const offset = imgIndex * 6;
                const rotation = imgIndex * 3;
                
                return (
                  <DraggableImage
                    key={img.id}
                    image={img}
                    projectName={project.name}
                    imgIndex={imgIndex}
                    offset={offset}
                    rotation={rotation}
                    zIndex={3 - imgIndex}
                    onSwipe={() => handleImageSwipe(img.id)}
                    delay={idx * 0.1}
                  />
                );
              })}
            </div>
          ) : hasVideo && videoVisible ? (
            // Only video, no images (draggable)
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              <DraggableVideo
                videoUrl={project.video_link}
                projectName={project.name}
                onSwipe={handleVideoSwipe}
              />
            </div>
          ) : hasVideo && !videoVisible ? (
            // Video thrown away, no images to show
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-200 to-dark-300 rounded-xl shadow-xl">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-dark-500 opacity-50 mx-auto mb-2" />
                <p className="text-dark-500 text-sm">Video removed</p>
              </div>
            </div>
          ) : (
            // No video, no images
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-xl">
              <Briefcase className="w-20 h-20 text-white opacity-50" />
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
          {project.reviews && project.reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < project.reviews[0].rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-dark-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-dark-600">
                ({project.reviews.length} {project.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
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

// Draggable Image Component for card stack effect
const DraggableImage = ({ image, projectName, imgIndex, offset, rotation, zIndex, onSwipe, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-20, 20]);
  const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    // If dragged far enough horizontally, swipe it away
    if (Math.abs(info.offset.x) > 80) {
      onSwipe();
    }
  };

  return (
    <motion.div
      className="draggable-image absolute cursor-grab active:cursor-grabbing"
      style={{
        top: `${offset}px`,
        left: `${offset}px`,
        right: `${-offset}px`,
        bottom: `${-offset}px`,
        x: imgIndex === 0 ? x : 0,
        y: imgIndex === 0 ? y : 0,
        rotate: imgIndex === 0 ? rotate : rotation,
        opacity: imgIndex === 0 ? opacity : 1,
        zIndex,
      }}
      drag={imgIndex === 0}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: rotation 
      }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-2xl border-4 border-white">
        <img
          src={`${config.backendUrl}${image.image_url}`}
          alt={`${projectName} ${imgIndex + 1}`}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

// Draggable Video Component
const DraggableVideo = ({ videoUrl, projectName, onSwipe }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-20, 20]);
  const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    // If dragged far enough horizontally, swipe it away
    if (Math.abs(info.offset.x) > 80) {
      onSwipe();
    }
  };

  return (
    <motion.div
      className="draggable-video absolute top-0 left-0 right-0 bottom-0 cursor-grab active:cursor-grabbing"
      style={{
        x,
        y,
        rotate,
        opacity,
        zIndex: 10,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1 
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-white border-4 border-white">
        <img
          src={`https://img.youtube.com/vi/${extractYouTubeId(videoUrl)}/maxresdefault.jpg`}
          alt={projectName}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-primary-500 border-b-8 border-b-transparent ml-1" />
          </div>
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

export default ProjectsSection;
