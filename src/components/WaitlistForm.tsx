"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { joinWaitlistAction } from "@@/actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  companySize: z.string().min(1, "Please select your company size."),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      companySize: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    const turnstileToken = turnstileRef.current?.getResponse();
    
    if (!turnstileToken) {
      setErrorMsg("Please complete the security check.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await joinWaitlistAction({
        ...data,
        turnstileToken,
      });

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(result.error || "Something went wrong.");
        // Reset turnstile on failure
        turnstileRef.current?.reset();
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-medium text-zinc-100">Verification email sent</h3>
        <p className="text-sm text-zinc-400 max-w-md">
          We've sent a link to your email address. Please click it to confirm your spot on the waitlist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 p-8 shadow-2xl max-w-lg w-full shrink-0 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Request Beta Access</h2>
        <p className="text-zinc-400 text-sm">Join the waitlist to experience privacy-first, edge-native DevTools.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2.5 bg-black/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-zinc-600 transition-colors sm:text-sm"
            placeholder="Jane Doe"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2.5 bg-black/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-zinc-600 transition-colors sm:text-sm"
            placeholder="jane@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-zinc-300 mb-1.5">
            Company Size
          </label>
          <select
            id="companySize"
            className="w-full px-4 py-2.5 bg-black/50 border border-zinc-800 rounded-lg focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-zinc-600 transition-colors sm:text-sm appearance-none"
            {...register("companySize")}
          >
            <option value="" disabled>Select company size...</option>
            <option value="1-10">1-10 Employees</option>
            <option value="11-50">11-50 Employees</option>
            <option value="51-200">51-200 Employees</option>
            <option value="201-500">201-500 Employees</option>
            <option value="500+">500+ Employees</option>
          </select>
          {errors.companySize && (
            <p className="mt-1.5 text-xs text-red-500">{errors.companySize.message}</p>
          )}
        </div>

        <div className="flex items-start pt-2">
          <div className="flex h-5 items-center">
            <input
              id="consent"
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors"
              {...register("consent")}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consent" className="text-zinc-400 leading-snug">
              I consent to the collection and processing of my data to receive updates regarding this product.
            </label>
            {errors.consent && (
              <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>
            )}
          </div>
        </div>

        {/* Cloudflare Turnstile */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              options={{ appearance: "interaction-only" }}
            />
          </div>
        ) : (
          <div className="text-[10px] text-amber-500/50 text-center">
            Security module offline (Missing Site Key)
          </div>
        )}

        {errorMsg && (
          <div className="p-3 mt-4 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg">
            {errorMsg}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative inline-flex justify-center items-center px-4 py-3 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          >
            <span className="relative z-10">{isSubmitting ? "Processing..." : "Request Access"}</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>
      </form>
    </div>
  );
}
