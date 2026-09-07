"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Database,
  ArrowLeft,
  Server,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  Save,
  Download,
  AlertTriangle,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DatabaseSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [backingUp, setBackingUp] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [dbConfig, setDbConfig] = useState({
    host: "localhost",
    port: "5432",
    databaseName: "greenfield_hospital_db",
    username: "postgres",
    maxConnections: "100",
    sslMode: "require",
  });

  const handleChange = (e) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const handleBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      alert("Database backup downloaded successfully!");
    }, 1500);
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
                <Database size={16} />
                <span>System Infrastructure</span>
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Database Settings
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Manage PostgreSQL connection parameters, backups, and storage health.
              </p>
            </div>

            {/* Success Alert */}
            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">
                  Database configurations updated successfully!
                </span>
              </div>
            )}

            <div className="space-y-6">
              {/* Quick Actions & Backup */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                      <HardDrive size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Storage Usage</h3>
                      <p className="text-xs text-slate-400">14.2 GB of 100 GB used</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Healthy
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                      <Download size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Manual Backup</h3>
                      <p className="text-xs text-slate-400">Export latest SQL snapshot</p>
                    </div>
                  </div>
                  <button
                    onClick={handleBackup}
                    disabled={backingUp}
                    className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                  >
                    {backingUp ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                    {backingUp ? "Exporting..." : "Backup Now"}
                  </button>
                </div>
              </div>

              {/* Database Connection Form */}
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                    <Server size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Connection Parameters</h2>
                    <p className="text-xs text-slate-400">Configure connection strings and limits for PostgreSQL.</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Host */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Host Address
                    </label>
                    <input
                      type="text"
                      name="host"
                      value={dbConfig.host}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Port */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Port Number
                    </label>
                    <input
                      type="text"
                      name="port"
                      value={dbConfig.port}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Database Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Database Name
                    </label>
                    <input
                      type="text"
                      name="databaseName"
                      value={dbConfig.databaseName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Database User
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={dbConfig.username}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Max Connections */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Max Connections
                    </label>
                    <input
                      type="number"
                      name="maxConnections"
                      value={dbConfig.maxConnections}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* SSL Mode */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      SSL Encryption
                    </label>
                    <select
                      name="sslMode"
                      value={dbConfig.sslMode}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="require">Required (Secure)</option>
                      <option value="prefer">Prefer</option>
                      <option value="disable">Disabled</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 text-xs text-amber-400">
                    <AlertTriangle size={14} />
                    <span>Restarting services may be required after updating connection parameters.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save Connection Details"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}