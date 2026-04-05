"use client";
import React from 'react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-black border-t border-white/10 pt-24 pb-12 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-20">
        
        {/* Col 1: Brand */}
        <div className="md:col-span-1">
          <a 
            href="#" 
            onClick={scrollToTop}
            className="flex items-center font-mono font-bold text-2xl uppercase tracking-tighter cursor-pointer"
          >
            <span className="text-white">Dist</span>
            <span className="text-[#CCFF00]">illed</span>
          </a>
          <p className="mt-6 text-gray-500 text-sm leading-relaxed font-mono">
            Efficiency is the Universal Language.
          </p>
          <p className="mt-6 text-zinc-600 text-[10px] uppercase tracking-widest font-mono">
            Built for every builder—from vibe coders to tech ceos.
          </p>
        </div>

        {/* Col 2: The Labs */}
        <div className="space-y-6">
          <h4 className="text-white font-mono text-[11px] uppercase tracking-[0.3em] font-bold">
            The Labs
          </h4>
          <div className="flex flex-col gap-4 font-mono text-sm text-gray-400 font-bold">
            <a href="https://starkylabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition-colors underline decoration-white/10 underline-offset-4">Starky Labs</a>
            <a href="mailto:hello@starkylabs.com" className="hover:text-[#CCFF00] transition-colors">hello@starkylabs.com</a>
          </div>
        </div>

        {/* Col 3: Legal */}
        <div className="space-y-6">
          <h4 className="text-white font-mono text-[11px] uppercase tracking-[0.3em] font-bold">
            Security & Legal
          </h4>
          <div className="flex flex-col gap-4 font-mono text-sm text-gray-400 font-bold">
            <a href="/privacy" className="hover:text-[#CCFF00] transition-colors group">
              Privacy Policy <span className="text-[10px] opacity-40 ml-1 group-hover:opacity-100 transition-opacity font-normal tracking-tight">(Local-First)</span>
            </a>
            <a href="#methodology" className="hover:text-[#CCFF00] transition-colors">Methodology</a>
          </div>
        </div>

      </div>

      {/* Eco-Stamp */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col items-center gap-4">
        <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase text-center">
          &copy; {new Date().getFullYear()} Starky Labs | Distributed Globally
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
