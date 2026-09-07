"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowLeft,
  Building2,
  Globe2,
  CheckCircle2,
  Save,
  Compass,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function LocationSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [locationConfig, setLocationConfig] = useState({
    branchName: "Greenfield Main Hospital",
    address: "123 Healthcare Boulevard, Suite 400",
    city: "Dhaka",
    state: "Dhaka Division",
    zipCode: "1212",
    country: "Bangladesh",
    timezone: "Asia/Dhaka (GMT+6)",
  });

  const handleChange = (e) => {
    setLocationConfig({ ...locationConfig, [e.target.name]: e.target.value });
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
                <MapPin size={16} />
                <span>Regional & Address Setup</span>
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Location Settings
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Manage branch address details, timezone, and regional preferences for reports.
              </p>
            </div>

            {/* Success Alert */}
            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">
                  Location preferences saved successfully!
                </span>
              </div>
            )}

            <div className="space-y-6">
              {/* Location Details Form */}
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Branch Profile</h2>
                    <p className="text-xs text-slate-400">Primary location information used in invoices and emails.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Branch Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Facility / Branch Name
                    </label>
                    <input
                      type="text"
                      name="branchName"
                      value={locationConfig.branchName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={locationConfig.address}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* City, State & Zip Code */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={locationConfig.city}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={locationConfig.state}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={locationConfig.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Country & Timezone */}
                  <div className="grid gap-4 md:grid-cols-2 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Country
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          value={locationConfig.country}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Primary Timezone
                      </label>
                      <select
                        name="timezone"
                        value={locationConfig.timezone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Asia/Dhaka (GMT+6)">Asia/Dhaka (GMT+6)</option>
                        <option value="UTC (GMT+0)">UTC (GMT+0)</option>
                        <option value="America/New_York (GMT-5)">America/New_York (GMT-5)</option>
                      </select>
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
                    {loading ? "Saving..." : "Save Location Settings"}
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