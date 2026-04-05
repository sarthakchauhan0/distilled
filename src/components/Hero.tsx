"use client";
import React from 'react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  const scrollToTerminal = () => {
    const element = document.getElementById('terminal-capture');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background SVG Animation - Abstract Data Filtering */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 10,10 L 90,10 L 90,90 L 10,90 Z"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0], 
              opacity: [0, 0.5, 0.5, 0] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="1"
            fill="#00ffcc"
            animate={{
              scale: [1, 20, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Scanning Line */}
          <motion.line
            x1="0"
            y1="0"
            x2="100"
            y2="0"
            stroke="#00ffcc"
            strokeWidth="0.05"
            animate={{
              y1: [0, 100, 0],
              y2: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-white text-6xl md:text-8xl font-sans font-bold tracking-tight mb-6">
          Compute Less.<br />
          <span className="text-white/90">Create More.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The stealth intelligence layer that silently cuts your AI API bills by 
          over 60%—before the prompt ever leaves your machine.
        </p>

        <motion.button
          onClick={scrollToTerminal}
          className="px-8 py-4 border border-brand-cyan text-brand-cyan text-lg font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] bg-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join the Waitlist
        </motion.button>
      </motion.div>

      {/* Decorative Monospace Accent */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-800 font-mono text-xs tracking-widest uppercase opacity-50">
        Proprietary Local Intelligence v1.0.4-stealth
      </div>
    </section>
  );
};

export default Hero;
