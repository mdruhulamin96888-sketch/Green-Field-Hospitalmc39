"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Stethoscope, Mail, Phone, MapPin, Trash2, Clock, AlertCircle, CheckCircle, X, User } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor state for Modal

  // Load saved doctors from localStorage
  useEffect(() => {
    const savedDoctors = localStorage.getItem("hospital_doctors");
    if (savedDoctors) {
      try {
        setDoctors(JSON.parse(savedDoctors));
      } catch (err) {
        console.error("Failed to parse doctors:", err);
      }
    }
  }, []);

  // Save to localStorage helper
  const updateStorage = (data) => {
    setDoctors(data);
    localStorage.setItem("hospital_doctors", JSON.stringify(data));
  };

  // Delete doctor
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Card-er click event stop korar jonno
    const updated = doctors.filter((doc) => doc.id !== id);
    updateStorage(updated);
    if (selectedDoctor?.id === id) {
      setSelectedDoctor(null);
    }
  };

  // Change Doctor Status (Active / Pending / Failed)
  const handleStatusChange = (e, id, newStatus) => {
    e.stopPropagation(); // Card-er click event stop korar jonno
    const updated = doctors.map((doc) =>
      doc.id === id ? { ...doc, status: newStatus } : doc
    );
    updateStorage(updated);
    if (selectedDoctor?.id === id) {
      setSelectedDoctor((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Count Statuses
  const totalDoctors = doctors.length;
  const activeCount = doctors.filter((doc) => doc.status === "Active").length;
  const pendingCount = doctors.filter((doc) => doc.status === "Pending").length;
  const failedCount = doctors.filter((doc) => doc.status === "Failed").length;

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Doctors Directory</h1>
                <p className="mt-1 text-sm text-slate-400">
                  List of active and pending medical staff members
                </p>
              </div>
              <Link
                href="/doctors/add"
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <Plus size={18} /> Add Doctor
              </Link>
            </div>

            {/* Stats Summary Section */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-medium text-slate-400">Total Doctors</p>
                <p className="mt-2 text-2xl font-bold text-white">{totalDoctors}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center justify-between text-emerald-400">
                  <p className="text-xs font-medium">Active</p>
                  <CheckCircle size={16} />
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-400">{activeCount}</p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center justify-between text-amber-400">
                  <p className="text-xs font-medium">Pending</p>
                  <Clock size={16} />
                </div>
                <p className="mt-2 text-2xl font-bold text-amber-400">{pendingCount}</p>
              </div>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                <div className="flex items-center justify-between text-rose-400">
                  <p className="text-xs font-medium">Failed</p>
                  <AlertCircle size={16} />
                </div>
                <p className="mt-2 text-2xl font-bold text-rose-400">{failedCount}</p>
              </div>
            </div>

            {/* Doctors Cards Grid */}
            {doctors.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
                No doctors found. Click <strong>"Add Doctor"</strong> to insert a new entry.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {doctors.map((doc) => {
                  const currentStatus = doc.status || "Active";

                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className="relative cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-emerald-500/50 hover:bg-slate-900/80"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                          <Stethoscope size={22} className="text-emerald-400" />
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Dynamic Status Dropdown */}
                          <select
                            value={currentStatus}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleStatusChange(e, doc.id, e.target.value)}
                            className={`rounded-full px-2.5 py-1 text-xs font-medium outline-none transition cursor-pointer border ${
                              currentStatus === "Active"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : currentStatus === "Pending"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            }`}
                          >
                            <option value="Active" className="bg-slate-900 text-emerald-400">Active</option>
                            <option value="Pending" className="bg-slate-900 text-amber-400">Pending</option>
                            <option value="Failed" className="bg-slate-900 text-rose-400">Failed</option>
                          </select>

                          <button
                            onClick={(e) => handleDelete(e, doc.id)}
                            className="text-slate-500 transition hover:text-red-400"
                            title="Delete Doctor"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-emerald-400">
                        {doc.specialty} ({doc.department})
                      </p>

                      <div className="mt-4 space-y-2 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {doc.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {doc.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {doc.room || "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <User size={40} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">{selectedDoctor.name}</h2>
              <p className="text-sm font-medium text-emerald-400">{selectedDoctor.specialty}</p>
              <span className="mt-2 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {selectedDoctor.department} Department
              </span>
            </div>

            <div className="mt-6 space-y-3 rounded-xl bg-slate-950 p-4 text-sm border border-slate-800/80">
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Status</span>
                <span className={`font-semibold ${
                  selectedDoctor.status === "Active" ? "text-emerald-400" : selectedDoctor.status === "Pending" ? "text-amber-400" : "text-rose-400"
                }`}>
                  {selectedDoctor.status || "Active"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Email</span>
                <span className="text-white font-medium">{selectedDoctor.email || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Phone</span>
                <span className="text-white font-medium">{selectedDoctor.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Room / Location</span>
                <span className="text-white font-medium">{selectedDoctor.room || "N/A"}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="rounded-xl bg-slate-800 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}