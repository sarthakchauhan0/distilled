"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';

const RoiDisplay: React.FC = () => {
  const [dailySpend, setDailySpend] = useState(500);
  const [teamSize, setTeamSize] = useState(25);

  const monthlySavings = useMemo(() => {
    // Formula: (Daily Spend * 30 days * Team Size) * 60% savings
    return (dailySpend * 30 * teamSize) * 0.6;
  }, [dailySpend, teamSize]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="features" className="py-24 px-6 bg-zinc-950 border-y border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left Column: The ROI Story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-block px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
            <span className="text-brand-cyan text-[10px] uppercase font-mono tracking-widest">
              Financial Efficiency
            </span>
          </div>

          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            The high cost of <br />
            <span className="text-gray-500">redundant intelligence.</span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
            Every redundant token you send is a fraction of a cent wasted.
            Scaled across an enterprise, it bleeds thousands of dollars.
            Distilled acts as an invisible barrier, optimizing every context window
            locally before it ever hits your API provider.
          </p>

          <div className="pt-4 border-l-2 border-brand-cyan/30 pl-6">
            <p className="text-white/60 font-mono text-sm italic">
              "We aren't just saving compute; we're reclaiming the margin
              lost to inefficient inference architectures."
            </p>
          </div>
        </motion.div>

        {/* Right Column: Interactive Calculator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-black/40 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm"
        >
          <div className="space-y-12">
            {/* Input: Daily API Spend */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-gray-400 font-mono text-xs uppercase tracking-widest">
                  Daily API Spend / Dev
                </label>
                <span className="text-white font-mono text-xl">
                  ${dailySpend}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="10000"
                step="10"
                value={dailySpend}
                onChange={(e) => setDailySpend(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 font-mono uppercase">
                <span>$10</span>
                <span>$10,000</span>
              </div>
            </div>

            {/* Input: Team Size */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-gray-400 font-mono text-xs uppercase tracking-widest">
                  Authorized Users
                </label>
                <span className="text-white font-mono text-xl">
                  {teamSize}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 font-mono uppercase">
                <span>1 Dev</span>
                <span>500 Devs</span>
              </div>
            </div>

            {/* Output: Projected Savings */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <label className="text-brand-cyan/60 font-mono text-xs uppercase tracking-[0.2em] block text-center">
                Projected Monthly Savings
              </label>
              <div className="text-center">
                <motion.div
                  key={monthlySavings}
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-brand-cyan font-mono text-5xl md:text-6xl font-bold tracking-tighter"
                >
                  {formatCurrency(monthlySavings)}
                </motion.div>
                <p className="text-zinc-600 text-[10px] uppercase font-mono mt-4 tracking-widest">
                  *Calculated at 60% median token reduction rate
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default RoiDisplay;
