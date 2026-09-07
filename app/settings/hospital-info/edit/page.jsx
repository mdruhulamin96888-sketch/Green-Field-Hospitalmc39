"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Save,
  ArrowLeft,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function EditHospitalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "Green Field Hospital",
    type: "Multi-Speciality General Hospital",
    location: "House 42, Road 11, Block-E, Banani, Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    email: "admin@greenfieldhospital.com",
    website: "greenfieldhospital.com",
    operatingHours: "24/7 Emergency | OPD: 8:00 AM - 9:00 PM",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API request
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
            {/* Navigation / Header */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/settings"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to Settings
              </Link>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Building2 size={16} />
                <span>Hospital Configuration</span>
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Edit Hospital Profile
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Update primary contact information, operational hours, and facility details.
              </p>
            </div>

            {/* Success Alert */}
            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">
                  Hospital information updated successfully!
                </span>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <h2 className="mb-6 text-lg font-semibold text-white">
                  General Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Hospital Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <Building2 size={14} /> Hospital Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Facility Type */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <Building2 size={14} /> Facility Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <MapPin size={14} /> Location / Address
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <Phone size={14} /> Contact Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <Mail size={14} /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <Globe size={14} /> Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Operating Hours */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <Clock size={14} /> Operating Hours
                    </label>
                    <input
                      type="text"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
                >
                  <Save size={16} />
                  {loading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}