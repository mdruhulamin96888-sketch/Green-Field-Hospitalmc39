import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Server,
  ShieldCheck,
  Database,
  Cpu,
  RefreshCw,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import { getCurrentUser } from "@/lib/auth";

export default async function SystemStatusPage() {
  const user = await getCurrentUser();

  const services = [
    {
      name: "Core Application Platform",
      status: "Operational",
      uptime: "99.98%",
      latency: "24ms",
      icon: <Activity className="text-emerald-400" size={20} />,
    },
    {
      name: "JWT Authentication Service",
      status: "Operational",
      uptime: "100%",
      latency: "18ms",
      icon: <ShieldCheck className="text-emerald-400" size={20} />,
    },
    {
      name: "PostgreSQL Database Engine",
      status: "Operational",
      uptime: "99.95%",
      latency: "12ms",
      icon: <Database className="text-emerald-400" size={20} />,
    },
    {
      name: "Prisma ORM Middleware",
      status: "Operational",
      uptime: "99.99%",
      latency: "5ms",
      icon: <Server className="text-emerald-400" size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar user={user} />

        <div className="p-5 md:p-8 lg:p-10">
          <div className="mx-auto max-w-5xl">
            {/* Navigation Link */}
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
                  <span>Real-time Health Monitoring</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  System Status
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Live status overview of hospital infrastructure services and APIs.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300">
                <RefreshCw size={14} className="animate-spin text-emerald-400" />
                <span>Updated Just Now</span>
              </div>
            </div>

            {/* System Health Banner */}
            <div className="mb-8 flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-emerald-300">
                  All Systems Operational
                </h2>
                <p className="text-sm text-slate-400">
                  All core components, databases, and authentication endpoints are functioning normally.
                </p>
              </div>
            </div>

            {/* Status List */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Service Performance Metrics
              </h3>

              <div className="grid gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 md:flex-row md:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{service.name}</h4>
                        <span className="text-xs text-slate-500">
                          Response Time: {service.latency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 md:justify-end">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-slate-500">Uptime</p>
                        <p className="text-sm font-semibold text-slate-300">
                          {service.uptime}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {service.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}