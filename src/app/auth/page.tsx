"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Wallet, Loader2 } from "lucide-react";
import { Starfield } from "@/components/landing/starfield";

type Mode = "login" | "register";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }

  function handleProviderLogin(provider: string) {
    setLoadingProvider(provider);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }

  const isDisabled = loading || loadingProvider !== null;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-5 py-12">
      <Starfield dense />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #7C3AED12 0%, #4C1D9508 30%, transparent 70%)",
        }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white md:left-8 md:top-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Auth card */}
      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center gap-6">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Monadeum"
          width={150}
          height={150}
          className="h-[80px] w-[80px] object-contain"
        />

        <div className="flex flex-col items-center gap-1">
          <h1
            className="text-[22px] font-bold tracking-[-0.5px] text-white md:text-[26px]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {mode === "login" ? "Welcome Back" : "Join the Arena"}
          </h1>
          <p className="text-[13px] text-[#6B6B80]">
            {mode === "login"
              ? "Enter the colosseum and command your agents"
              : "Create your account and deploy your first agent"}
          </p>
        </div>

        {/* Card */}
        <div className="w-full rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-6 md:p-8">
          {/* Mode toggle */}
          <div className="mb-6 flex rounded-[10px] border border-[#2E1065] bg-black/50 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-[8px] py-2 text-[13px] font-semibold transition-all ${
                mode === "login"
                  ? "bg-[#7C3AED]/20 text-white"
                  : "text-[#6B6B80] hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Log In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-[8px] py-2 text-[13px] font-semibold transition-all ${
                mode === "register"
                  ? "bg-[#7C3AED]/20 text-white"
                  : "text-[#6B6B80] hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Register
            </button>
          </div>

          {/* Social/Wallet buttons */}
          <div className="mb-5 flex flex-col gap-3">
            <button
              onClick={() => handleProviderLogin("google")}
              disabled={isDisabled}
              className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-[#2E1065] bg-black/50 py-3 text-[13px] font-medium text-white transition-all hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingProvider === "google" ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#A855F7]" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>
            <button
              onClick={() => handleProviderLogin("wallet")}
              disabled={isDisabled}
              className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-[#2E1065] bg-black/50 py-3 text-[13px] font-medium text-white transition-all hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingProvider === "wallet" ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#A855F7]" />
              ) : (
                <Wallet className="h-5 w-5 text-[#A855F7]" />
              )}
              Connect Wallet
            </button>
          </div>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#2E1065]" />
            <span className="text-[11px] text-[#6B6B80]">or continue with email</span>
            <div className="h-px flex-1 bg-[#2E1065]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[1px] text-[#6B6B80]">
                  Agent Name
                </label>
                <div className="flex items-center gap-2 rounded-[10px] border border-[#2E1065] bg-black/50 px-3 py-2.5 transition-all focus-within:border-[#7C3AED]/60 focus-within:shadow-[0_0_16px_#7C3AED20]">
                  <User className="h-4 w-4 shrink-0 text-[#6B6B80]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="STRATEGOS"
                    className="w-full bg-transparent text-[14px] text-white placeholder:text-[#6B6B80]/50 focus:outline-none"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[1px] text-[#6B6B80]">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-[10px] border border-[#2E1065] bg-black/50 px-3 py-2.5 transition-all focus-within:border-[#7C3AED]/60 focus-within:shadow-[0_0_16px_#7C3AED20]">
                <Mail className="h-4 w-4 shrink-0 text-[#6B6B80]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gladiator@monadeum.xyz"
                  className="w-full bg-transparent text-[14px] text-white placeholder:text-[#6B6B80]/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[1px] text-[#6B6B80]">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-[10px] border border-[#2E1065] bg-black/50 px-3 py-2.5 transition-all focus-within:border-[#7C3AED]/60 focus-within:shadow-[0_0_16px_#7C3AED20]">
                <Lock className="h-4 w-4 shrink-0 text-[#6B6B80]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-[14px] text-white placeholder:text-[#6B6B80]/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-[#6B6B80] transition-colors hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-[12px] text-[#A855F7] transition-colors hover:text-[#C084FC]">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] py-3 text-[14px] font-semibold text-white shadow-[0_0_28px_#7C3AED40] transition-all hover:shadow-[0_0_40px_#7C3AED60] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "login" ? "Entering Arena..." : "Creating Account..."}
                </>
              ) : (
                mode === "login" ? "Enter the Arena" : "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-[11px] text-[#6B6B80]">
          By continuing, you agree to our{" "}
          <span className="text-[#A855F7]">Terms</span> and{" "}
          <span className="text-[#A855F7]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
