import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Database,
  Hospital,
  MapPin,
  Phone,
  Mail,
  Globe,
  LockKeyhole,
  Server,
  CheckCircle2,
  Settings2,
  ChevronRight,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import { getCurrentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar user={user} />

      <main className="min-w-0 flex-1">
        <Topbar user={user} />

        <div className="p-5 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
                  <Settings2 size={16} />
                  <span>System Configuration</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Settings
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                  Manage your hospital information, security preferences,
                  authentication, and system infrastructure.
                </p>
              </div>

              <Link
                href="/settings/system-status"
                className="flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 transition hover:bg-emerald-500/20"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-sm font-medium text-emerald-300">
                  System Operational
                </span>
              </Link>
            </div>
          </div>

          {/* Hospital Overview */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10">
            <div className="border-b border-slate-800 bg-slate-900/80 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Hospital className="text-emerald-400" size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Hospital Profile
                  </h2>

                  <p className="text-sm text-slate-500">
                    Basic information about your healthcare facility
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">
              <InfoItem
                href="/settings/hospital-info"
                icon={<Building2 size={18} />}
                label="Hospital Name"
                value="Green Field Hospital"
              />

              <InfoItem
                href="/settings/location"
                icon={<MapPin size={18} />}
                label="Location"
                value="Dhaka, Bangladesh"
              />

              <InfoItem
                href="tel:+8801234567890"
                icon={<Phone size={18} />}
                label="Contact Number"
                value="+880 1234 567890"
              />

              <InfoItem
                href="mailto:admin@greenfieldhospital.com"
                icon={<Mail size={18} />}
                label="Email Address"
                value="admin@greenfieldhospital.com"
              />
            </div>
          </section>

          {/* Settings Cards */}
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Hospital Information */}
            <SettingCard
              href="/settings/hospital-info"
              icon={<Building2 size={23} />}
              title="Hospital Information"
              description="Manage your hospital profile and organization details."
              status="Configured"
            >
              <div className="space-y-3">
                <SettingRow label="Facility" value="Green Field Hospital" />
                <SettingRow label="Type" value="General Hospital" />
                <SettingRow label="Website" value="greenfieldhospital.com" />
              </div>

              <div className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition group-hover:border-emerald-500/40 group-hover:bg-slate-800">
                <span className="flex items-center gap-2">
                  <Globe size={16} />
                  Manage Information
                </span>
                <ChevronRight size={16} />
              </div>
            </SettingCard>

            {/* Authentication */}
            <SettingCard
              href="/settings/security"
              icon={<ShieldCheck size={23} />}
              title="Authentication"
              description="Control authentication and account security settings."
              status="Active"
            >
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  <div>
                    <p className="text-sm font-medium text-emerald-300">
                      Authentication is secure
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      JWT-based authentication is currently active for authorized users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <LockKeyhole size={17} className="text-slate-400" />
                  <span className="text-sm text-slate-300">
                    JWT Authentication
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                  Enabled
                </span>
              </div>

              <div className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition group-hover:border-emerald-500/40 group-hover:bg-slate-800">
                <span>Security Settings</span>
                <ChevronRight size={16} />
              </div>
            </SettingCard>

            {/* Database */}
            <SettingCard
              href="/settings/database"
              icon={<Database size={23} />}
              title="Database"
              description="View your hospital system's database infrastructure."
              status="Connected"
            >
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Server size={19} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">PostgreSQL</p>
                    <p className="text-xs text-slate-500">Prisma ORM</p>
                  </div>
                  <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <SettingRow label="Database" value="PostgreSQL" />
                <SettingRow label="ORM" value="Prisma" />
                <SettingRow
                  label="Status"
                  value="Healthy"
                  valueClass="text-emerald-400"
                />
              </div>

              <div className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition group-hover:border-emerald-500/40 group-hover:bg-slate-800">
                <span>Database Settings</span>
                <ChevronRight size={16} />
              </div>
            </SettingCard>
          </div>

          {/* System Status */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-5">
              <h2 className="font-semibold text-white">System Status</h2>
              <p className="mt-1 text-sm text-slate-500">
                Current health of your hospital management platform.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-3">
              <StatusItem
                href="/settings/status/app"
                title="Application"
                description="Hospital management system"
              />
              <StatusItem
                href="/settings/status/auth"
                title="Authentication"
                description="JWT authentication service"
              />
              <StatusItem
                href="/settings/status/db"
                title="Database"
                description="PostgreSQL database connection"
              />
            </div>
          </section>

          {/* Footer Note */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-emerald-400"
            />
            <p className="text-xs leading-5 text-slate-500">
              System configuration is restricted to authorized hospital
              administrators. Changes to security and database settings should only
              be performed by qualified personnel.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* --------------------------------
    Reusable Components
-------------------------------- */

function InfoItem({ icon, label, value, href }) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-slate-800/50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-slate-200">
          {value}
        </p>
      </div>
    </Link>
  );
}

function SettingCard({ icon, title, description, status, children, href }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-700"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          {icon}
        </div>

        <span className="rounded-full border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-1 text-xs font-medium text-emerald-400">
          {status}
        </span>
      </div>

      <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>

      <p className="mt-2 min-h-[40px] text-sm leading-5 text-slate-500">
        {description}
      </p>

      <div className="mt-5">{children}</div>
    </Link>
  );
}

function SettingRow({ label, value, valueClass = "text-slate-300" }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/70 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

function StatusItem({ title, description, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-slate-700 hover:bg-slate-800/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle2 size={19} className="text-emerald-400" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">{description}</p>
      </div>
    </Link>
  );
}