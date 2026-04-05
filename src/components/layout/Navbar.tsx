import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Impact', href: '#impact' },
    { name: 'Universal', href: '#universal' },
    { name: 'Protocol', href: '#protocol' },
  ];




  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex flex-col group cursor-pointer leading-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            layout
            className="flex items-center font-mono font-bold text-2xl uppercase tracking-tighter"
          >
            {[
              { char: 'D', isVowel: false },
              { char: 'i', isVowel: true },
              { char: 's', isVowel: false },
              { char: 't', isVowel: false },
              { char: 'i', isVowel: true },
              { char: 'l', isVowel: false },
              { char: 'l', isVowel: false },
              { char: 'e', isVowel: true },
              { char: 'd', isVowel: false },
            ].map((l, i) => (
              <motion.span
                layout
                key={i}
                initial={{ opacity: 1, width: 'auto' }}
                animate={{ 
                  opacity: l.isVowel && isHovered ? 0 : 1,
                  width: l.isVowel && isHovered ? 0 : 'auto',
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={i < 4 ? "text-white" : "text-[#CCFF00]"}
                style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                {l.char}
              </motion.span>
            ))}
          </motion.div>
          <motion.span 
            layout
            className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mt-1.5 group-hover:text-zinc-300 transition-colors"
          >
            by Starky Labs
          </motion.span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest font-bold">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-400 hover:text-[#CCFF00] transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <a 
            href="#terminal-capture"
            className="bg-[#CCFF00] text-black px-6 py-2.5 rounded-sm font-bold hover:bg-[#CCFF00]/90 transition-all active:scale-95 text-center"
          >
            Request Beta
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-6 p-8 font-mono text-sm uppercase tracking-widest text-center font-bold">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-[#CCFF00]"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#terminal-capture"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#CCFF00] text-black px-6 py-3 rounded-sm font-bold text-center"
              >
                Request Beta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
