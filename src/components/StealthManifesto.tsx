import React from 'react';

const StealthManifesto: React.FC = () => {
  return (
    <section id="protocol" className="bg-black min-h-screen flex flex-col justify-center py-20 px-6 scroll-mt-20">
      <article className="max-w-4xl mx-auto border-l border-r border-[#333] px-8 md:px-12 py-20 space-y-12 backdrop-blur-sm">
        <header className="space-y-4">
          <h2 className="text-white text-3xl font-bold tracking-tight">
            The Mission of Distilled.
          </h2>
          <div className="h-[1px] w-24 bg-brand-cyan/40" />
        </header>

        <div className="space-y-8 text-gray-400 text-lg leading-relaxed text-justify">
          <p>
            The modern AI landscape is a war of attrition. Teams are spending 
            more of their operational capital on redundant tokens than on 
            actual creation. We believe that intelligence should be efficient, 
            private, and radically affordable.
          </p>

          <p>
            By shifting context optimization to the edge, we ensure that your 
            <span className="text-white font-semibold"> API bills shrink dramatically </span> 
            without sacrificing the quality of your output. You get the same 
            <span className="text-white font-semibold"> world-class completions </span> 
            from your favorite LLMs, but with a fundamentally compressed payload.
          </p>

          <blockquote className="border-l-4 border-brand-cyan/20 pl-6 py-4 italic text-white/80">
            "Absolute stealth is not just about secrecy; it is about 
            architectural integrity. Every prompt that avoids a proxy 
            is a prompt that <span className="text-white font-semibold"> respects your sensitive IP</span>."
          </blockquote>

          <p>
            This is Proprietary Local Intelligence. It is built for the solo hacker 
            demanding 10x leverage and for the Enterprise CTO who cannot 
            compromise on data residence or bottom-line ROI.
          </p>
        </div>

        <footer className="pt-12 flex justify-between items-end opacity-20">
          <div className="font-mono text-[10px] tracking-widest uppercase">
            Auth: @starkylabs-core
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase">
            Protocol: 0x-distill
          </div>
        </footer>
      </article>
    </section>
  );
};

export default StealthManifesto;
