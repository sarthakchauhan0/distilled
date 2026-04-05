import React from "react";

export const metadata = {
  title: "Privacy Policy | Distilled by Starky Labs",
  description: "Our local-first privacy policy explains how data stays securely on your device.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 uppercase tracking-widest">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Local-First Processing</h2>
          <p>
            At Starky Labs, our core methodology relies on <strong>Edge Compute</strong> and <strong>Local-First Processing</strong>. 
            When you use Distilled, the heavy lifting—including WebAssembly (WASM) execution and analytical logic—happens directly on your device. 
            Your proprietary source code and sensitive application data <strong>never travel to a centralized server or headquarters</strong>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Token Optimization Privacy</h2>
          <p>
            Our core mission is AI efficiency. By optimizing token generation and consumption locally, we ensure that the minimum viable context is sent to any external Large Language Models (LLMs) you configure. 
            We do not log, review, or store these prompts. 
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Information Collection</h2>
          <p>
            The only data we actively collect is for account provisioning, beta access coordination, and necessary usage metrics to maintain the service. This may include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>Your provided work email and basic profile information.</li>
            <li>Aggregated, anonymized telemetry on token usage optimizations (for efficiency benchmarking).</li>
            <li>Information strictly required for security, fraud prevention, and performance monitoring.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Your Rights</h2>
          <p>
            Because Distilled processes data locally, you retain ultimate control. You can delete the application cache or revoke API keys directly from your local filesystem. For any centralized data (like your waitlist email), you may request immediate deletion by contacting our distributed support team.
          </p>
        </section>

        <section className="space-y-4 pt-12 border-t border-white/10">
          <p className="text-sm">
            For privacy inquiries, please reach out to <a href="mailto:support@starkylabs.com" className="text-indigo-400 hover:text-indigo-300">support@starkylabs.com</a>.
          </p>
          <p className="text-sm text-zinc-500 mt-4">
            Starky Labs is a Distributed Organization.
          </p>
        </section>
      </div>
    </div>
  );
}
