import React, { useState, useEffect } from 'react';

const TerminalCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [showCursor, setShowCursor] = useState(true);

  // Synthetic blinking cursor logic
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('submitting');
    
    // Simulated encryption and dispatch delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
  };

  return (
    <section id="terminal-capture" className="bg-black py-48 px-6 flex items-center justify-center min-h-[80vh] scroll-mt-20">
      <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/5 shadow-2xl transform transition-transform hover:scale-[1.01]">
        
        {/* Mock Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase ml-[-24px]">
              starky-auth --stealth
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-8 font-mono text-sm min-h-[280px]">
          <div className="space-y-4">
            <div className="text-zinc-600 text-xs">
              Last login: {new Date().toUTCString()} on ttys002
              <br />
              Initializing secure handshaking... DONE
            </div>

            <div className="space-y-3">
              {/* Submission Flow */}
              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="enter_email"
                      className="bg-transparent border-none outline-none text-white flex-1 min-w-[200px] placeholder:text-zinc-700"
                    />
                    <span className={`w-2 h-5 bg-[#CCFF00]/60 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <p className="text-[10px] text-zinc-500 italic">
                    Type your email and press ENTER to join the stealth queue.
                  </p>
                </form>
              )}

              {status === 'submitting' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <span className="text-white">{email}</span>
                  </div>
                  <div className="text-brand-cyan flex items-center gap-2 animate-pulse">
                    <span>&gt;</span>
                    <span>Encrypting and dispatching request...</span>
                  </div>
                </div>
              )}

              {status === 'success' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <span className="text-white">{email}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-[#CCFF00] font-bold">
                      [OK] Added to stealth deployment queue.
                    </div>
                    <div className="text-zinc-500 text-xs leading-relaxed">
                      Verification token stored. You will be notified via our encrypted 
                      delivery channel when a developer slot becomes available.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <span className={`w-2 h-5 bg-[#CCFF00]/60 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalCapture;
