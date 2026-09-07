import { redirect } from "next/navigation";

import Link from "next/link";

import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock3,
  Ambulance,
  Stethoscope,
  Users,
  BedDouble,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Pencil,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getCurrentUser } from "@/lib/auth";

export default async function HospitalPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar user={user} />

          <div className="p-5 md:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400">
                  <Building2 size={16} />
                  <span>Hospital Management</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Hospital Information
                </h1>

                <p className="mt-2 text-slate-400">
                  Manage your hospital profile, facilities and contact
                  information.
                </p>
              </div>

              <Link
                href="/settings/hospital-info/edit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600"
              >
                <Pencil size={17} />
                Edit Information
              </Link>
            </div>

            {/* Hospital Hero */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <div className="relative border-b border-slate-800 p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                      <Building2 size={38} />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-white md:text-3xl">
                          City General Hospital
                        </h2>

                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          Active
                        </span>
                      </div>

                      <p className="text-sm text-slate-400">
                        Advanced healthcare and medical services
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-4">
                    <p className="text-xs text-slate-500">
                      Hospital Registration ID
                    </p>
                    <p className="mt-1 font-semibold text-slate-200">
                      HOSP-2026-001
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid divide-y divide-slate-800 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
                <InfoStat
                  icon={BedDouble}
                  label="Total Beds"
                  value="250"
                  description="Hospital capacity"
                />

                <InfoStat
                  icon={Users}
                  label="Medical Staff"
                  value="84"
                  description="Doctors & staff"
                />

                <InfoStat
                  icon={Stethoscope}
                  label="Departments"
                  value="18"
                  description="Medical departments"
                />

                <InfoStat
                  icon={Activity}
                  label="Emergency"
                  value="24/7"
                  description="Emergency service"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 xl:grid-cols-3">
              {/* Hospital Details */}
              <section className="xl:col-span-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="border-b border-slate-800 p-6">
                    <h2 className="text-lg font-semibold text-white">
                      Hospital Details
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      General information about the hospital
                    </p>
                  </div>

                  <div className="grid gap-6 p-6 md:grid-cols-2">
                    <DetailItem
                      icon={Building2}
                      label="Hospital Name"
                      value="City General Hospital"
                    />

                    <DetailItem
                      icon={ShieldCheck}
                      label="Hospital Type"
                      value="Private General Hospital"
                    />

                    <DetailItem
                      icon={MapPin}
                      label="Address"
                      value="123 Healthcare Road, Dhaka, Bangladesh"
                    />

                    <DetailItem
                      icon={Phone}
                      label="Phone"
                      value="+880 2 5555 1234"
                    />

                    <DetailItem
                      icon={Mail}
                      label="Email"
                      value="info@citygeneralhospital.com"
                    />

                    <DetailItem
                      icon={Activity}
                      label="Emergency Hotline"
                      value="+880 1700 000000"
                      highlight
                    />
                  </div>
                </div>

                {/* About */}
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <h2 className="text-lg font-semibold text-white">
                    About Hospital
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    City General Hospital is a modern healthcare facility
                    providing comprehensive medical services to patients.
                    Our hospital combines experienced medical professionals,
                    advanced technology and patient-centered care to provide
                    high-quality treatment across multiple specialties.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    We provide outpatient, inpatient, emergency and diagnostic
                    services with a dedicated team available to support
                    patients throughout their healthcare journey.
                  </p>
                </div>

                {/* Facilities */}
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="border-b border-slate-800 p-6">
                    <h2 className="text-lg font-semibold text-white">
                      Facilities & Services
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Available healthcare facilities
                    </p>
                  </div>

                  <div className="grid gap-3 p-6 sm:grid-cols-2">
                    <FacilityItem name="24/7 Emergency Department" />
                    <FacilityItem name="Intensive Care Unit (ICU)" />
                    <FacilityItem name="Modern Operating Theatres" />
                    <FacilityItem name="Diagnostic & Imaging Center" />
                    <FacilityItem name="Pharmacy" />
                    <FacilityItem name="Blood Bank" />
                    <FacilityItem name="Ambulance Service" />
                    <FacilityItem name="Outpatient Department" />
                  </div>
                </div>
              </section>

              {/* Right Sidebar */}
              <aside className="space-y-6">
                {/* Emergency */}
                <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5">
                  <div className="border-b border-red-500/10 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                        <Ambulance size={21} />
                      </div>

                      <div>
                        <h2 className="font-semibold text-white">
                          Emergency Services
                        </h2>
                        <p className="text-xs text-red-400">
                          Available 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-slate-400">
                      For medical emergencies, contact our emergency
                      department immediately.
                    </p>

                    <a
                      href="tel:+8801700000000"
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      <Phone size={17} />
                      +880 1700 000000
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="border-b border-slate-800 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Clock3 size={20} />
                      </div>

                      <h2 className="font-semibold text-white">
                        Operating Hours
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <HoursRow
                      day="Monday - Friday"
                      time="8:00 AM - 10:00 PM"
                    />

                    <HoursRow
                      day="Saturday"
                      time="9:00 AM - 8:00 PM"
                    />

                    <HoursRow
                      day="Sunday"
                      time="10:00 AM - 6:00 PM"
                    />

                    <div className="border-t border-slate-800 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          Emergency
                        </span>

                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                          24/7
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        Hospital Location
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        123 Healthcare Road
                        <br />
                        Dhaka, Bangladesh
                      </p>

                      <button className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:text-emerald-300">
                        View on Map
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Info Stat ---------------- */

function InfoStat({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="group p-5 transition hover:bg-slate-800/30">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-700 transition group-hover:text-emerald-400"
        />
      </div>

      <p className="mt-5 text-sm text-slate-500">{label}</p>

      <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>

      <p className="mt-1 text-xs text-slate-600">{description}</p>
    </div>
  );
}

/* ---------------- Detail Item ---------------- */

function DetailItem({
  icon: Icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>

        <p
          className={`mt-1 break-words text-sm font-medium ${
            highlight ? "text-emerald-400" : "text-slate-200"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Facility Item ---------------- */

function FacilityItem({ name }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
        <ShieldCheck size={16} className="text-emerald-400" />
      </div>

      <span className="text-sm text-slate-300">{name}</span>
    </div>
  );
}

/* ---------------- Hours Row ---------------- */

function HoursRow({
  day,
  time,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">{day}</span>

      <span className="text-right text-sm font-medium text-slate-300">
        {time}
      </span>
    </div>
  );
}