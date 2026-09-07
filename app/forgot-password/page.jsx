"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Hospital,
  Mail,
  ArrowLeft,
  ArrowRight,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      // Future API:
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: email.trim(),
      //   }),
      // });

      // const data = await response.json();

      // if (!response.ok || !data.success) {
      //   setMessage(data.message || "Unable to process your request.");
      //   return;
      // }

      // Demo success state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setMessage(
        "If an account exists with this email, password reset instructions will be sent shortly."
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-emerald-600 p-10 md:flex md:flex-col md:justify-between lg:p-12">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-black/10" />

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                <Hospital size={30} className="text-white" />
              </div>

              <h1 className="text-2xl font-bold text-white">
                Green Field Hospital
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-2 text-emerald-100">
              <ShieldCheck size={20} />

              <span className="text-sm font-medium">
                Secure Account Recovery
              </span>
            </div>

            <h2 className="max-w-lg text-4xl font-bold leading-tight text-white lg:text-5xl">
              Recover your account securely.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-emerald-100">
              Enter your registered email address and we&apos;ll help you
              regain secure access to your hospital management account.
            </p>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-sm text-emerald-100">
            © {new Date().getFullYear()} Green Field Hospital
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center p-7 sm:p-10 lg:p-12">
          <div className="w-full">

            {/* Mobile Logo */}
            <div className="mb-7 inline-flex rounded-xl bg-emerald-500/10 p-3 md:hidden">
              <Hospital size={26} className="text-emerald-400" />
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="mb-5 hidden h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 md:flex">
                <Mail size={23} className="text-emerald-400" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white">
                Forgot your password?
              </h2>

              <p className="mt-3 max-w-md leading-6 text-slate-400">
                No worries. Enter the email address associated with your
                account and we&apos;ll send you instructions to reset your
                password.
              </p>
            </div>

            {success ? (
              /* Success State */
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <CheckCircle2
                      size={21}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Check your email
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {message}
                    </p>
                  </div>
                </div>

                <Link
                  href="/login"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 font-semibold text-white transition hover:bg-emerald-600"
                >
                  Back to Sign In
                  <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setMessage("");
                      }}
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Error */}
                {message && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400"
                  >
                    {message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600 hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={19} className="animate-spin" />
                      Sending instructions...
                    </>
                  ) : (
                    <>
                      Send Reset Instructions
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Back to Login */}
            {!success && (
              <div className="mt-7 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
                >
                  <ArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-xs leading-5 text-slate-500">
                For your security, we never reveal whether an email address
                is registered in our system.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}