import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { joinWaitlistAction } from "@@/actions";

const TerminalCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companySize, setCompanySize] = useState<'Small' | 'Large'>('Small');
  const [teamMemberCount, setTeamMemberCount] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [showCursor, setShowCursor] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Synthetic blinking cursor logic
  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date().toUTCString());
    
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const getValidationErrors = () => {
    const newErrors: string[] = [];
    
    if (!name.trim()) {
      newErrors.push("NAME_REQUIRED: Please provide your identification.");
    }
    
    if (!email.trim()) {
      newErrors.push("EMAIL_REQUIRED: Missing delivery endpoint.");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.push("INVALID_EMAIL: Handshake protocol requires a valid email format.");
    }

    if (companySize === 'Large' && !teamMemberCount.trim()) {
      newErrors.push("TEAM_CAPACITY_MISSING: Deployment scale must be specified for team accounts.");
    }

    if (!acceptedPrivacy) {
      newErrors.push("POLICY_REJECTION: Access to stealth queue requires privacy protocol authorization.");
    }

    return newErrors;
  };

  // Re-validate instantly after the first submission attempt
  useEffect(() => {
    if (hasSubmitted) {
      setErrors(getValidationErrors());
    }
  }, [name, email, companySize, teamMemberCount, acceptedPrivacy, hasSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    
    const currentErrors = getValidationErrors();
    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    setStatus('submitting');
    
    const turnstileToken = turnstileRef.current?.getResponse();
    if (!turnstileToken) {
      setErrors(["SECURITY_CHECK_REQUIRED: Please complete the handshake authorization."]);
      setStatus('idle');
      return;
    }

    try {
      const result = await joinWaitlistAction({
        name,
        email,
        companySize: companySize === 'Large' ? `Team (${teamMemberCount})` : 'Individual',
        turnstileToken,
      });

      if (result.success) {
        setStatus('success');
        setSuccessMessage(`Verification email dispatched to ${email}. Check your endpoint for the authorization link.`);
      } else {
        setStatus('idle');
        setErrors([`REMOTE_REJECTION: ${result.error || "Uplink failed."}`]);
        turnstileRef.current?.reset();
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('idle');
      setErrors(["UPLINK_FAILURE: Connection to starky-hub was interrupted."]);
      turnstileRef.current?.reset();
    }
  };

  if (!mounted) return (
    <section id="terminal-capture" className="bg-black py-48 px-6 flex items-center justify-center min-h-[80vh] scroll-mt-20">
      <div className="w-full max-w-2xl h-[400px] bg-[#1e1e1e] rounded-xl border border-white/5 animate-pulse" />
    </section>
  );

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
              Last login: <span>{currentDate}</span> on ttys002
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

                  {/* Privacy Consent */}
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-green-500">admin@starkylabs:~$</span>
                    <button
                      type="button"
                      onClick={() => setAcceptedPrivacy(!acceptedPrivacy)}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <span className={`w-4 h-4 border border-zinc-700 flex items-center justify-center text-[10px] transition-colors ${acceptedPrivacy ? 'bg-[#CCFF00] border-[#CCFF00] text-black' : 'text-transparent group-hover:border-zinc-500'}`}>
                        {acceptedPrivacy ? 'X' : ''}
                      </span>
                      <span className="text-zinc-500 text-[11px] group-hover:text-zinc-300 transition-colors">
                        accept_privacy_policy
                      </span>
                    </button>
                    <a href="/privacy" target="_blank" className="text-[10px] text-zinc-700 hover:text-zinc-500 underline ml-[-8px]">
                      (view)
                    </a>
                  </div>

                  {/* Error Reporting Block */}
                  {errors.length > 0 && (
                    <div className="bg-red-950/10 border border-red-500/20 p-4 rounded animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <span className="animate-pulse">●</span> [!] VALIDATION_ERROR: CRITICAL_FIELD_MISSING
                      </div>
                      <div className="space-y-1">
                        {errors.map((err, idx) => (
                          <div key={idx} className="text-red-400/70 text-[10px] font-mono leading-relaxed flex gap-2">
                            <span className="text-red-500/50">_</span> {err}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center opacity-50 scale-75">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                      options={{ appearance: "interaction-only", theme: "dark" }}
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="text-[#CCFF00] border border-[#CCFF00]/30 px-4 py-1 hover:bg-[#CCFF00]/10 transition-colors uppercase text-xs tracking-widest cursor-pointer group flex items-center gap-2 disabled:opacity-50"
                    >
                      <span>[ Join Stealth Queue ]</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
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
                      {successMessage}
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
