import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { config } from '../../config/credentials.template';

const HeroSection = ({ profile }) => {
  if (!profile) return null;

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 glass-card"
            >
              <span className="text-primary-500 font-semibold">Welcome to my Portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-dark-500 mb-8 leading-relaxed"
            >
              {profile.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex justify-center perspective-container"
          >
            <motion.div
              animate={{
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Soft outer glow */}
              <motion.div
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-3xl"
              />

              {/* Circular border ring - main outline */}
              <motion.div 
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="absolute inset-0 rounded-full" 
                style={{
                  border: '4px solid rgba(14, 165, 233, 0.6)',
                  boxShadow: '0 0 60px rgba(14, 165, 233, 0.8), inset 0 0 60px rgba(14, 165, 233, 0.3)'
                }}
              />

              {/* Inner glowing ring */}
              <motion.div 
                animate={{ 
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                className="absolute inset-2 rounded-full" 
                style={{
                  border: '2px solid rgba(14, 165, 233, 0.4)',
                  boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)'
                }}
              />
              
              {/* Circular image container - transparent background */}
              <div className="relative w-full h-full rounded-full overflow-hidden" 
                style={{
                  background: 'transparent'
                }}
              >
                {profile.picture ? (
                  <img
                    src={`${config.backendUrl}${profile.picture}`}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
                    style={{ 
                      objectPosition: 'center center',
                      filter: 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.3))'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600">
                    <span className="text-6xl md:text-8xl font-bold text-white">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Rotating circular scan line */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(14, 165, 233, 0.15) 10%, transparent 20%)',
                }}
              />

              {/* Orbiting particles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute -top-4 left-1/2 w-8 h-8 bg-primary-400 rounded-full" style={{ filter: 'blur(8px)', opacity: 0.7 }} />
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-1/2 -right-6 w-6 h-6 bg-primary-500 rounded-full" style={{ filter: 'blur(6px)', opacity: 0.6 }} />
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute -bottom-4 left-1/4 w-7 h-7 bg-primary-300 rounded-full" style={{ filter: 'blur(7px)', opacity: 0.65 }} />
              </motion.div>

              {/* Floating particles with up/down motion */}
              <motion.div
                animate={{ y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 w-10 h-10 bg-primary-400 rounded-full"
                style={{ filter: 'blur(10px)' }}
              />
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-8 -left-8 w-9 h-9 bg-primary-500 rounded-full"
                style={{ filter: 'blur(9px)' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToSkills}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-dark-500 hover:text-primary-500 transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
