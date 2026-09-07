"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  X,
  Trash2,
  UserPlus,
  RefreshCw,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const STORAGE_KEY = "hospital_patients";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // =========================================================
  // LOAD PATIENTS FROM LOCAL STORAGE
  // =========================================================
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    try {
      const savedPatients = localStorage.getItem(STORAGE_KEY);

      if (!savedPatients) {
        setPatients([]);
        return;
      }

      const parsedPatients = JSON.parse(savedPatients);

      if (Array.isArray(parsedPatients)) {
        setPatients(parsedPatients);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error("Failed to load patients:", error);
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // DELETE PATIENT
  // =========================================================
  const handleDelete = (id) => {
    const patient = patients.find((item) => item.id === id);

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${
        patient?.name || "this patient"
      }?`
    );

    if (!confirmDelete) return;

    const updatedPatients = patients.filter(
      (patient) => patient.id !== id
    );

    setPatients(updatedPatients);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPatients)
    );

    setSelectedPatient(null);
  };

  // =========================================================
  // SEARCH + FILTER
  // =========================================================
  const filteredPatients = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return patients.filter((patient) => {
      const matchesSearch =
        !searchValue ||
        patient.name?.toLowerCase().includes(searchValue) ||
        patient.patientCode
          ?.toLowerCase()
          .includes(searchValue) ||
        patient.phone
          ?.toLowerCase()
          .includes(searchValue) ||
        patient.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  // =========================================================
  // STATISTICS
  // =========================================================
  const totalPatients = patients.length;

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const inactivePatients = patients.filter(
    (patient) => patient.status === "Inactive"
  ).length;

  const newPatients = patients.filter((patient) => {
    if (!patient.createdAt) return false;

    const created = new Date(patient.createdAt);

    if (Number.isNaN(created.getTime())) {
      return false;
    }

    const now = new Date();

    const difference =
      now.getTime() - created.getTime();

    return (
      difference >= 0 &&
      difference <= 7 * 24 * 60 * 60 * 1000
    );
  }).length;

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      <main className="min-w-0 flex-1">
        {/* Topbar */}
        <Topbar />

        <div className="p-5 md:p-8">
          {/* =================================================
              HEADER
          ================================================= */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-400">
                <Users size={16} />
                Patient Management
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Patients
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
                Manage patient information, medical records,
                registrations and patient activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadPatients}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                <RefreshCw size={17} />
                Refresh
              </button>

              <Link
                href="/patients/add"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600"
              >
                <Plus size={18} />
                Add Patient
              </Link>
            </div>
          </div>

          {/* =================================================
              STATISTICS
          ================================================= */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Patients"
              value={totalPatients}
              icon={Users}
            />

            <StatCard
              title="Active Patients"
              value={activePatients}
              icon={UserRound}
            />

            <StatCard
              title="New This Week"
              value={newPatients}
              icon={UserPlus}
            />

            <StatCard
              title="Inactive"
              value={inactivePatients}
              icon={X}
            />
          </div>

          {/* =================================================
              SEARCH + FILTER
          ================================================= */}
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl shadow-black/5">
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, patient ID, phone or email..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* =================================================
              PATIENT TABLE
          ================================================= */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/5">
            {/* Table Header */}
            <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-white">
                  Patient Directory
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredPatients.length} patient
                  {filteredPatients.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-xs text-slate-400">
                <Users size={14} />
                {totalPatients} Total
              </div>
            </div>

            {/* Loading */}
            {isLoading ? (
              <div className="flex min-h-[350px] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <RefreshCw
                    size={18}
                    className="animate-spin text-emerald-400"
                  />
                  Loading patients...
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                  <thead className="border-b border-slate-800 bg-slate-950/40">
                    <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4">
                        Patient
                      </th>

                      <th className="px-5 py-4">
                        Patient ID
                      </th>

                      <th className="px-5 py-4">
                        Contact
                      </th>

                      <th className="px-5 py-4">
                        Gender
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800">
                    {filteredPatients.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-16 text-center"
                        >
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950">
                            <Users
                              size={30}
                              className="text-slate-600"
                            />
                          </div>

                          <h3 className="mt-5 font-semibold text-white">
                            No patients found
                          </h3>

                          <p className="mt-2 text-sm text-slate-500">
                            {patients.length === 0
                              ? "Start by adding your first patient."
                              : "Try changing your search or filter."}
                          </p>

                          {patients.length === 0 && (
                            <Link
                              href="/patients/add"
                              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >
                              <Plus size={17} />
                              Add First Patient
                            </Link>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="group transition hover:bg-slate-800/40"
                        >
                          {/* Patient */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                                <UserRound
                                  size={19}
                                  className="text-emerald-400"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold text-white">
                                  {patient.name}
                                </p>

                                <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                                  {patient.email ||
                                    "No email provided"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Patient ID */}
                          <td className="px-5 py-5">
                            <span className="rounded-lg bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-medium text-emerald-400">
                              {patient.patientCode ||
                                "N/A"}
                            </span>
                          </td>

                          {/* Contact */}
                          <td className="px-5 py-5">
                            <div className="space-y-2 text-sm text-slate-400">
                              <div className="flex items-center gap-2">
                                <Phone size={14} />

                                {patient.phone ||
                                  "No phone"}
                              </div>

                              {patient.email && (
                                <div className="flex items-center gap-2">
                                  <Mail size={14} />

                                  <span className="max-w-[180px] truncate">
                                    {patient.email}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Gender */}
                          <td className="px-5 py-5 text-sm text-slate-400">
                            {patient.gender ||
                              "Not specified"}
                          </td>

                          {/* Status */}
                          <td className="px-5 py-5">
                            <StatusBadge
                              status={
                                patient.status || "Active"
                              }
                            />
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-5">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedPatient(
                                    patient
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
                                title="View patient"
                              >
                                <Eye size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    patient.id
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-500 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                                title="Delete patient"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* =====================================================
          PATIENT DETAILS MODAL
      ===================================================== */}
      {selectedPatient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedPatient(null);
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Patient Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  {selectedPatient.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPatient(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <UserRound
                    size={24}
                    className="text-emerald-400"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {selectedPatient.name}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-emerald-400">
                    {selectedPatient.patientCode ||
                      "N/A"}
                  </p>
                </div>
              </div>

              <DetailRow
                icon={Phone}
                label="Phone"
                value={
                  selectedPatient.phone ||
                  "Not provided"
                }
              />

              <DetailRow
                icon={Mail}
                label="Email"
                value={
                  selectedPatient.email ||
                  "Not provided"
                }
              />

              <DetailRow
                icon={UserRound}
                label="Gender"
                value={
                  selectedPatient.gender ||
                  "Not specified"
                }
              />

              <DetailRow
                icon={CalendarDays}
                label="Date of Birth"
                value={
                  selectedPatient.dateOfBirth ||
                  "Not provided"
                }
              />

              <div className="flex items-center justify-between border-t border-slate-800 pt-5">
                <span className="text-sm text-slate-500">
                  Status
                </span>

                <StatusBadge
                  status={
                    selectedPatient.status ||
                    "Active"
                  }
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 p-5">
              <button
                type="button"
                onClick={() =>
                  setSelectedPatient(null)
                }
                className="w-full rounded-xl border border-slate-700 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
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

// =========================================================
// STAT CARD
// =========================================================

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
          <Icon
            size={20}
            className="text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
        isActive
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-slate-800 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
}

// =========================================================
// DETAIL ROW
// =========================================================

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950">
        <Icon
          size={17}
          className="text-slate-500"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-600">
          {label}
        </p>

        <p className="mt-1 truncate text-sm text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}