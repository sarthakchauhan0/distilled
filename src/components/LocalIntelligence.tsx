"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Zap, Lock } from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  span: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Zero-Data-Leakage',
    description: 'Our custom local intelligence layer processes every prompt entirely on your machine. No proxy servers, no intermediate cloud logging, and zero exposure of your internal intellectual property.',
    icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" />,
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 2,
    title: 'Edge Optimization',
    description: 'Compress context windows at the edge before they leave the IDE.',
    icon: <Cpu className="w-6 h-6 text-brand-cyan" />,
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    title: 'Stealth Architecture',
    description: 'A completely isolated environment that operates under strict Zero-Data-Leakage protocols. Designed for highly sensitive enterprise codebases where data residence is non-negotiable.',
    icon: <Lock className="w-6 h-6 text-brand-cyan" />,
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 4,
    title: 'Universal Compatibility',
    description: 'Seamlessly works with any VS Code setup, minimizing token overhead without disrupting your existing engineering workflow.',
    icon: <Zap className="w-6 h-6 text-brand-cyan" />,
    span: 'md:col-span-2 md:row-span-1',
  },
];

const LocalIntelligence: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Built for <span className="text-gray-500">Total Sovereignty.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Distilled Local Intelligence enables world-class AI efficiency
            without the risk of modern data pipelines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                ${feature.span}
                bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl
                flex flex-col justify-between group hover:border-brand-cyan/30 
                transition-colors duration-500
              `}
            >
              <div className="space-y-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center rounded-xl border border-white/5 group-hover:border-brand-cyan/20 transition-all duration-500">
                  {feature.icon}
                </div>

                <header className="space-y-3">
                  <h3 className="font-mono tracking-widest text-xs uppercase text-brand-cyan/80">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-snug">
                    {feature.description}
                  </p>
                </header>
              </div>

              {/* Decorative Accent */}
              <div className="mt-8 flex justify-end">
                <div className="w-4 h-[1px] bg-white/10 group-hover:bg-brand-cyan/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalIntelligence;
