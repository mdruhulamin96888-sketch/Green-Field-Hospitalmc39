import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Users,
  Stethoscope,
  CalendarDays,
  CreditCard,
  ArrowUpRight,
  Activity,
  UserPlus,
  Plus,
  FileText,
  ShieldCheck,
  ChevronRight,
  Clock3,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getCurrentUser } from "@/lib/auth";

const stats = [
  {
    title: "Total Doctors",
    value: "24",
    description: "Medical professionals",
    trend: "+4.8%",
    icon: Stethoscope,
    href: "/doctors",
  },
  {
    title: "Total Patients",
    value: "1,248",
    description: "Registered patients",
    trend: "+8.2%",
    icon: Users,
    href: "/patients",
  },
  {
    title: "Appointments",
    value: "86",
    description: "Today's appointments",
    trend: "+12.5%",
    icon: CalendarDays,
    href: "/appointments",
  },
  {
    title: "Total Bills",
    value: "৳ 84,560",
    description: "This month's billing",
    trend: "+6.4%",
    icon: CreditCard,
    href: "/billing",
  },
];

const recentActivities = [
  {
    id: 1,
    name: "Rahim Ahmed",
    type: "New patient registered",
    time: "10 minutes ago",
    icon: UserPlus,
  },
  {
    id: 2,
    name: "Dr. Sarah Khan",
    type: "Appointment completed",
    time: "32 minutes ago",
    icon: Stethoscope,
  },
  {
    id: 3,
    name: "Karim Hasan",
    type: "Payment received",
    time: "1 hour ago",
    icon: CreditCard,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    type: "Appointment scheduled",
    time: "2 hours ago",
    icon: CalendarDays,
  },
];

const quickActions = [
  {
    title: "Add Doctor",
    description: "Register a new doctor",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Add Patient",
    description: "Register a new patient",
    href: "/patients",
    icon: UserPlus,
  },
  {
    title: "New Appointment",
    description: "Schedule an appointment",
    href: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Create Bill",
    description: "Generate hospital bill",
    href: "/billing",
    icon: FileText,
  },
];

function getInitials(name) {
  if (!name) return "AD";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default async function DashboardPage() {
  /*
   * Authentication
   *
   * getCurrentUser() should read the authenticated
   * user's server-side session/cookie.
   */
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userName = user.name?.trim() || "Administrator";
  const userEmail = user.email || "";
  const userRole = user.role || "ADMIN";
  const initials = getInitials(userName);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="flex min-h-screen">
        {/* =====================================================
            SIDEBAR
        ====================================================== */}
        <Sidebar />

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <main className="min-w-0 flex-1">
          <Topbar user={user} />

          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">

            {/* =====================================================
                WELCOME HERO
            ====================================================== */}
            <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 shadow-2xl sm:p-8">

              {/* Decorative background */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl"
              />

              <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

                <div>
                  {/* Hospital label */}
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
                    />

                    <p className="text-sm font-medium text-emerald-400">
                      Green Field Hospital
                    </p>
                  </div>

                  {/* Welcome */}
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Welcome back, {userName}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                    Manage your hospital operations, monitor appointments,
                    patients, doctors, and billing from one secure dashboard.
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/appointments"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <Plus size={18} />
                  New Appointment

                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </section>

            {/* =====================================================
                STATISTICS
            ====================================================== */}
            <section
              aria-label="Hospital statistics"
              className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {/* Card top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/10 p-3 text-emerald-400">
                        <Icon size={21} />
                      </div>

                      <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                        {item.trend}
                      </span>
                    </div>

                    {/* Card content */}
                    <div className="mt-5">
                      <p className="text-sm text-slate-400">
                        {item.title}
                      </p>

                      <div className="mt-1 flex items-end justify-between gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {item.value}
                        </h2>

                        <ArrowUpRight
                          size={18}
                          className="mb-1 text-slate-600 transition group-hover:text-emerald-400"
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </section>

            {/* =====================================================
                CONTENT GRID
            ====================================================== */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">

              {/* ===================================================
                  RECENT ACTIVITY
              ==================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">

                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5 sm:px-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Activity
                        size={18}
                        className="text-emerald-400"
                      />

                      <h2 className="font-semibold text-white">
                        Recent Activity
                      </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      Latest activity across your hospital
                    </p>
                  </div>

                  <Link
                    href="/appointments"
                    className="hidden items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/10 hover:text-emerald-300 sm:flex"
                  >
                    View All
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-800">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-800/40 sm:px-6"
                      >
                        {/* Icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                          <Icon size={18} />
                        </div>

                        {/* Activity */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {activity.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {activity.type}
                          </p>
                        </div>

                        {/* Time */}
                        <div className="hidden shrink-0 items-center gap-1 text-xs text-slate-500 sm:flex">
                          <Clock3 size={13} />
                          {activity.time}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile view all */}
                <div className="border-t border-slate-800 p-4 sm:hidden">
                  <Link
                    href="/appointments"
                    className="flex items-center justify-center gap-1 rounded-xl bg-slate-800 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-slate-700"
                  >
                    View All Activity
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </section>

              {/* ===================================================
                  QUICK ACTIONS
              ==================================================== */}
              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

                <div>
                  <h2 className="font-semibold text-white">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Frequently used hospital operations
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <Link
                        key={action.title}
                        href={action.href}
                        className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-emerald-500/30 hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">
                            {action.title}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {action.description}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={17}
                          className="shrink-0 text-slate-600 transition group-hover:text-emerald-400"
                        />
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* =====================================================
                SYSTEM INFORMATION
            ====================================================== */}
            <section className="mt-6 grid gap-4 md:grid-cols-2">

              {/* System Status */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <ShieldCheck size={22} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        Hospital System Active
                      </h3>

                      <span
                        className="h-2 w-2 rounded-full bg-emerald-400"
                        aria-label="System operational"
                      />
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      All hospital services are operating normally.
                    </p>
                  </div>
                </div>
              </div>

              {/* Current User */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-emerald-400"
                  >
                    {initials}
                  </div>

                  {/* User info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {userName}
                    </p>

                    {userEmail && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {userEmail}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <span className="shrink-0 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium uppercase text-emerald-400">
                    {userRole}
                  </span>
                </div>
              </div>
            </section>

            {/* =====================================================
                FOOTER
            ====================================================== */}
            <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-800 pt-5 text-xs text-slate-600 sm:flex-row">
              <p>
                © {new Date().getFullYear()} Green Field Hospital.
                All rights reserved.
              </p>

              <p>
                Hospital Management System
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}