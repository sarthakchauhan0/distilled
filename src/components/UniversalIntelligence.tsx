"use client";
import React from 'react';
import { motion } from 'motion/react';

const UniversalIntelligence: React.FC = () => {
  return (
    <section id="universal" className="bg-black min-h-screen flex flex-col justify-center py-20 px-6 scroll-mt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-[#0a0a0a] border border-white/5 p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden group transition-all duration-700 hover:border-[#CCFF00]/10">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 space-y-12">
            <header className="space-y-4">
              <h2 className="text-[#CCFF00]/60 font-mono text-xs uppercase tracking-[0.4em] font-bold">
                Universal Intelligence
              </h2>
              <div className="h-[1px] w-12 bg-[#CCFF00]/30" />
            </header>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="space-y-8 cursor-default"
            >
              <p className="text-white text-3xl md:text-5xl font-light leading-snug tracking-tight">
                Efficiency is the universal language <br />
                <span className="text-gray-500">of the AI era.</span>
              </p>

              <div className="space-y-6 max-w-3xl">
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  Whether you are a <span className="text-[#CCFF00] font-semibold">Vibe Coder</span> iterating 
                  at the speed of thought, a Senior Engineer demanding surgical 
                  precision in your context, or a Technical CEO scaling 
                  enterprise-wide operations, the challenge is identical: 
                  <span className="text-white/80"> Redundant data is a tax on innovation.</span>
                </p>

                <p className="text-gray-200 text-xl md:text-2xl font-medium leading-relaxed italic border-l-2 border-[#CCFF00]/20 pl-8 py-2">
                  "Distilled by Starky Labs is built for the entire spectrum of builders. 
                  We provide the high-fidelity context you need to create, 
                  and the cost-control you need to lead."
                </p>
              </div>
            </motion.div>

            <footer className="pt-8 flex items-center gap-6">
              <div className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#CCFF00]/40">
                Scale: Synchronized
              </span>
            </footer>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UniversalIntelligence;
