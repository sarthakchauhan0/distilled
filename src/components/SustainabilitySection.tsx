import React from 'react';
import { useInView } from 'react-intersection-observer';

const SustainabilitySection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section 
      id="impact"
      ref={ref}
      className="bg-black min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-20 px-6 scroll-mt-20"
    >
      {/* Environmental ROI Badge */}
      <div 
        className={`
          mb-8 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-mono
          bg-emerald-900/20 text-emerald-400 border border-emerald-500/30
          transition-all duration-1000
          ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}
        `}
      >
        Environmental ROI
      </div>

      {/* Main Heading */}
      <h2 
        className={`
          text-white text-3xl md:text-5xl font-light tracking-tight max-w-4xl mb-24
          transition-all duration-1000 delay-200
          ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}
        `}
      >
        The cleanest compute is <br />
        <span className="text-emerald-500/80 italic font-normal">the compute you don't use.</span>
      </h2>

      {/* Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full max-w-6xl">
        
        {/* Metric 1: CO2 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div 
              className={`
                text-6xl font-mono tracking-tighter transition-all duration-[2000ms] ease-out
                ${inView ? 'animate-num-co2' : ''}
              `}
              style={{
                counterReset: 'co2 var(--num-co2)',
                transition: '--num-co2 2s ease-out'
              } as React.CSSProperties}
            >
              <span className="before:content-[counter(co2)] before:inline-block" />
              <span className="text-2xl ml-1 text-zinc-500">+</span>
            </div>
            
            {/* Strike-through and "Saved" transition */}
            <div 
              className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-1000 delay-[1800ms]
                ${inView ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <div className="w-full h-[2px] bg-red-500/50 rotate-[-12deg]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              kg CO₂ Emitted
            </p>
            <p 
              className={`
                text-emerald-400 font-bold text-sm uppercase tracking-widest
                transition-all duration-700 delay-[2200ms]
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
            >
              → Saved
            </p>
          </div>
        </div>

        {/* Metric 2: H2O */}
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`
              text-6xl font-mono tracking-tighter transition-all duration-[2000ms] ease-out
              ${inView ? 'animate-num-h2o' : ''}
            `}
            style={{
              counterReset: 'h2o var(--num-h2o)',
              transition: '--num-h2o 2.5s ease-out'
            } as React.CSSProperties}
          >
            <span className="before:content-[counter(h2o)] before:inline-block" />
            <span className="text-2xl ml-1 text-zinc-500">+</span>
          </div>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
            Liters H₂O Conserved
          </p>
        </div>

        {/* Metric 3: Energy */}
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`
              text-6xl font-mono tracking-tighter transition-all duration-[2000ms] ease-out
              ${inView ? 'animate-num-kwh' : ''}
            `}
            style={{
              counterReset: 'kwh var(--num-kwh)',
              transition: '--num-kwh 3s ease-out'
            } as React.CSSProperties}
          >
            <span className="before:content-[counter(kwh)] before:inline-block" />
            <span className="text-2xl ml-1 text-zinc-500">+</span>
          </div>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
            kWh Energy Reclaimed
          </p>
        </div>

      </div>

      {/* Methodology Block */}
      <div 
        className={`
          mt-32 flex flex-col items-center text-center
          transition-all duration-1000 delay-[2500ms]
          ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}
        `}
      >
        <h3 className="text-emerald-400 text-base uppercase tracking-[0.3em] font-bold mb-6">
          Behind the Numbers: Our Data Methodology
        </h3>
        <p className="text-sm font-light text-neutral-400 max-w-2xl leading-relaxed mb-12">
          Every token processed by an AI agent requires high-density compute and active thermal management. 
          Our sustainability metrics are grounded in 2026 data center efficiency benchmarks. 
          Processing 1 Million unoptimized tokens (unoptimized prompt context) requires an estimated 0.5 kWh 
          of electricity, emits 0.25 kg of CO₂, and evaporates 5.0 Liters of freshwater for cooling. 
          By offloading context analysis to our Local Intelligence Engine (avoiding server-side computation) 
          and applying our semantic pruning algorithms, Starky Distilled typically achieves a 40-70% reduction 
          in token payload, directly preventing these resource losses.
        </p>

        {/* Next Sections Navigation */}
        <div className="flex flex-wrap items-center gap-6">
          <a 
            href="#universal"
            className="flex items-center gap-3 px-8 py-3 bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-[#CCFF00] hover:border-[#CCFF00]/30 transition-all font-mono text-[11px] uppercase tracking-widest group"
          >
            <span>Universal Intelligence</span>
            <span className="text-[#CCFF00] group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a 
            href="#protocol"
            className="flex items-center gap-3 px-8 py-3 bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-[#CCFF00] hover:border-[#CCFF00]/30 transition-all font-mono text-[11px] uppercase tracking-widest group"
          >
            <span>Core Protocol</span>
            <span className="text-[#CCFF00] group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-num-co2 { --num-co2: 10240; }
        .animate-num-h2o { --num-h2o: 25800; }
        .animate-num-kwh { --num-kwh: 15450; }
      `}} />
    </section>
  );
};

export default SustainabilitySection;
