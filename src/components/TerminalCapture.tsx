"use client";
import React, { useState, useEffect } from 'react';

const TerminalCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companySize, setCompanySize] = useState<'Small' | 'Large'>('Small');
  const [teamMemberCount, setTeamMemberCount] = useState('');
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
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Terminal User",
          email,
          companySize,
          teamMemberCount: companySize === 'Large' ? teamMemberCount : undefined,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json();
        console.error("API error:", errorData.error);
        setStatus('idle');
        alert("Waitlist error: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('idle');
      alert("Something went wrong. Please try again.");
    }
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
              Last login: <span suppressHydrationWarning>{new Date().toUTCString()}</span> on ttys002
              <br />
              Initializing secure handshaking... DONE
            </div>

            <div className="space-y-3">
              {/* Submission Flow */}
              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <span className="text-zinc-500">enter_name:</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="bg-transparent border-none outline-none text-white flex-1 min-w-[200px] placeholder:text-zinc-800"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <span className="text-zinc-500">enter_email:</span>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="bg-transparent border-none outline-none text-white flex-1 min-w-[200px] placeholder:text-zinc-800"
                    />
                  </div>

                  {/* Team Size Toggle */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">admin@starkylabs:~$</span>
                      <span className="text-zinc-500">team_size:</span>
                    </div>
                    <div className="flex border border-white/10 rounded overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setCompanySize('Small')}
                        className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                          companySize === 'Small' 
                          ? 'bg-[#CCFF00] text-black font-bold' 
                          : 'bg-transparent text-zinc-500 hover:text-white'
                        }`}
                      >
                        Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setCompanySize('Large')}
                        className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                          companySize === 'Large' 
                          ? 'bg-[#CCFF00] text-black font-bold' 
                          : 'bg-transparent text-zinc-500 hover:text-white'
                        }`}
                      >
                        Team
                      </button>
                    </div>
                  </div>

                  {/* Conditional Number of People Field */}
                  {companySize === 'Large' && (
                    <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                      <span className="text-green-500">admin@starkylabs:~$</span>
                      <span className="text-zinc-500">team_members:</span>
                      <input
                        type="text"
                        value={teamMemberCount}
                        onChange={(e) => setTeamMemberCount(e.target.value)}
                        placeholder="e.g. 5"
                        className="bg-transparent border-none outline-none text-white flex-1 min-w-[200px] placeholder:text-zinc-800"
                        autoFocus
                      />
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="text-[#CCFF00] border border-[#CCFF00]/30 px-4 py-1 hover:bg-[#CCFF00]/10 transition-colors uppercase text-xs tracking-widest"
                    >
                      [ Join Stealth Queue ]
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-600 italic">
                    Press ENTER or click the button to authorize deployment.
                  </p>
                </form>
              )}

              {status === 'submitting' && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">admin@starkylabs:~$</span>
                      <span className="text-white">{email}</span>
                    </div>
                    <div className="text-zinc-500 text-xs">Processing handshake for {name}...</div>
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
                    <span className="text-white">STATUS: OK</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-[#CCFF00] font-bold">
                      [OK] Added to stealth deployment queue.
                    </div>
                    <div className="text-zinc-500 text-xs leading-relaxed">
                      Verification token stored for {email}. You will be notified via our encrypted 
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
