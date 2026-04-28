import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifySuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isAlreadyVerified = params.verified === "already";

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-4">
            {isAlreadyVerified ? "Already Verified" : "Email Verified"}
          </h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            {isAlreadyVerified 
              ? "You've already confirmed your spot. We'll notify you as soon as beta access is ready for your account."
              : "Your email has been successfully verified. You're now on the priority list for Distilled beta access."}
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
