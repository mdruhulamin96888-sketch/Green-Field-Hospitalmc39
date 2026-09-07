"use client";

import Link from "next/link";
import {
  Database,
  ArrowLeft,
  CheckCircle2,
  Server,
  Activity,
  HardDrive,
  RefreshCw,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DatabaseStatusPage() {
  const dbMetrics = [
    {
      name: "PostgreSQL Database Engine",
      status: "Operational",
      type: "Primary Cluster",
      latency: "1.2ms",
      icon: <Database className="text-emerald-400" size={20} />,
    },
    {
      name: "Connection Pool (PgBouncer)",
      status: "Operational",
      type: "Active Pooler",
      latency: "32/100 Connections",
      icon: <Server className="text-emerald-400" size={20} />,
    },
    {
      name: "Redis Cache Store",
      status: "Operational",
      type: "In-Memory Cache",
      latency: "0.4ms",
      icon: <Zap className="text-emerald-400" size={20} />,
    },
    {
      name: "Automated Backup System",
      status: "Operational",
      type: "Daily Snapshot",
      latency: "Last: 2h ago",
      icon: <HardDrive className="text-emerald-400" size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <div className="p-5 md:p-8 lg:p-10">
          <div className="mx-auto max-w-5xl">
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

            {/* Page Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400">
                  <Activity size={16} />
                  <span>Database Infrastructure</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Database Status
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Real-time health, connection limits, and query latency metrics for PostgreSQL & Redis.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300">
                <RefreshCw size={14} className="animate-spin text-emerald-400" />
                <span>Live Monitoring</span>
              </div>
            </div>

            {/* Overall Status Card */}
            <div className="mb-8 flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 shadow-xl">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-emerald-300">
                  Database Systems Fully Operational
                </h2>
                <p className="text-sm text-slate-400">
                  All connection pools, query execution pipelines, and backup processes are healthy.
                </p>
              </div>
            </div>

            {/* Status Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Database Node Performance
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {dbMetrics.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <span className="text-xs text-slate-500">
                          {item.type} • {item.latency}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Box */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock size={18} className="text-emerald-400" />
                <span className="text-sm font-medium">
                  Database Cluster Uptime: 99.98% over past 90 Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}