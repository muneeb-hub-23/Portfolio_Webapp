import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code } from 'lucide-react';
import { config } from '../../config/credentials';

const SkillsSection = ({ skills }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 md:py-32 overflow-hidden relative" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-primary-500/10 rounded-full blur-3xl top-1/2 left-1/4 animate-float"></div>
        <div className="absolute w-64 h-64 bg-primary-600/10 rounded-full blur-3xl top-1/3 right-1/4 animate-float" style={{ animationDelay: '3s' }}></div>
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
            <Code className="w-5 h-5 text-primary-500" />
            <span className="text-primary-500 font-semibold">My Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-dark-500 text-lg md:text-xl max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Horizontal Scrolling Skills */}
        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 pb-8 px-4"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="flex-shrink-0 w-72 md:w-80 perspective-container"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="glass-card p-6 md:p-8 h-full hover:shadow-2xl transition-all duration-300">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center glow-effect"
        >
          {skill.icon ? (
            <img
              src={skill.icon.startsWith('http') ? skill.icon : `${config.backendUrl}${skill.icon}`}
              alt={skill.name}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          ) : (
            <Code className="w-10 h-10 md:w-12 md:h-12 text-white" />
          )}
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-dark-800">
          {skill.name}
        </h3>
        <p className="text-dark-500 leading-relaxed">
          {skill.description || 'A powerful tool in my development toolkit.'}
        </p>

        {/* Decorative element */}
        <div className="mt-6 h-1 w-20 bg-gradient-to-r from-primary-500 to-transparent rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default SkillsSection;
