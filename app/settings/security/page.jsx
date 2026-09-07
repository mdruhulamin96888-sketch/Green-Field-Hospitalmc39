"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Key,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password visibility state
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Form State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactor, setTwoFactor] = useState(true);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <div className="p-5 md:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <div className="mb-6">
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to Settings
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <ShieldCheck size={16} />
                <span>Account Protection</span>
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Security Settings
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Manage your account credentials, password, and authentication methods.
              </p>
            </div>

            {/* Success Alert */}
            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">
                  Security settings updated successfully!
                </span>
              </div>
            )}

            <div className="space-y-6">
              {/* Change Password Form */}
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                    <Key size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Change Password</h2>
                    <p className="text-xs text-slate-400">Ensure your account is using a long, random password.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          name="newPassword"
                          value={passwords.newPassword}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
                  >
                    <Save size={16} />
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>

              {/* Two-Factor Authentication Toggle */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Two-Factor Authentication (2FA)</h2>
                      <p className="text-xs text-slate-400">Add an extra layer of security to your account.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      twoFactor ? "bg-emerald-500" : "bg-slate-800"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        twoFactor ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}