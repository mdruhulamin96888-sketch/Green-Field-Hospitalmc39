"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Plus,
  Clock3,
  Search,
  X,
  UserRound,
  Stethoscope,
  FileText,
  Trash2,
  CheckCircle2,
  Clock4,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const STORAGE_KEY = "hospitalAppointments";

const emptyForm = {
  patientName: "",
  doctorName: "",
  date: "",
  time: "",
  reason: "",
};

function generateAppointmentId(appointments) {
  const maxNumber = appointments.reduce((max, appointment) => {
    const match = appointment.id?.match(/APT-(\d+)/);

    if (!match) return max;

    return Math.max(max, Number(match[1]));
  }, 0);

  return `APT-${String(maxNumber + 1).padStart(4, "0")}`;
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  // Load appointments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load appointments:", error);
    }
  }, []);

  // Save appointments whenever they change
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return appointments;

    return appointments.filter((appointment) =>
      [
        appointment.id,
        appointment.patientName,
        appointment.doctorName,
        appointment.date,
        appointment.time,
        appointment.reason,
        appointment.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [appointments, search]);

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.patientName.trim() ||
      !form.doctorName.trim() ||
      !form.date ||
      !form.time
    ) {
      return;
    }

    const newAppointment = {
      id: generateAppointmentId(appointments),
      patientName: form.patientName.trim(),
      doctorName: form.doctorName.trim(),
      date: form.date,
      time: form.time,
      reason: form.reason.trim() || "General Consultation",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updatedAppointments = [
      newAppointment,
      ...appointments,
    ];

    setAppointments(updatedAppointments);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedAppointments)
    );

    setForm(emptyForm);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      setShowModal(false);
    }, 700);
  };

  const deleteAppointment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );

    setAppointments(updatedAppointments);

    if (updatedAppointments.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedAppointments)
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <div className="p-5 md:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400">
                <CalendarDays size={16} />
                Hospital Management
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Appointments
              </h1>

              <p className="mt-2 text-slate-400">
                Schedule and manage patient appointments.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
            >
              <Plus size={19} />
              New Appointment
            </button>
          </div>

          {/* Statistics */}
          <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Total Appointments
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {appointments.length}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <CalendarDays size={23} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Pending
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {pendingCount}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                  <Clock4 size={23} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Confirmed
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {confirmedCount}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <CheckCircle2 size={23} />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient, doctor, appointment ID..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Appointment List */}
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <CalendarDays size={30} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-white">
                  No appointments found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Create a new appointment to start managing
                  your hospital schedule.
                </p>

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                >
                  <Plus size={17} />
                  Create Appointment
                </button>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Patient */}
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <UserRound size={22} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold text-white">
                            {appointment.patientName}
                          </h2>

                          <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-400">
                            {appointment.id}
                          </span>
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                          <Stethoscope size={14} />
                          Dr. {appointment.doctorName}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-300">
                        <CalendarDays
                          size={16}
                          className="text-emerald-400"
                        />
                        {formatDate(appointment.date)}
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-300">
                        <Clock3
                          size={16}
                          className="text-blue-400"
                        />
                        {appointment.time}
                      </div>

                      <span
                        className={`rounded-xl px-4 py-2.5 text-xs font-semibold ${
                          appointment.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {appointment.status}
                      </span>

                      <button
                        onClick={() =>
                          deleteAppointment(appointment.id)
                        }
                        className="rounded-xl border border-slate-800 p-2.5 text-slate-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        title="Delete appointment"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mt-5 flex items-start gap-2 border-t border-slate-800 pt-4 text-sm text-slate-500">
                    <FileText size={15} className="mt-0.5 shrink-0" />

                    <span>
                      <span className="text-slate-400">
                        Reason:
                      </span>{" "}
                      {appointment.reason}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* New Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-white">
                  New Appointment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new patient appointment.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setForm(emptyForm);
                }}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {/* Patient */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Patient Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      name="patientName"
                      value={form.patientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Doctor */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Doctor Name
                  </label>

                  <div className="relative">
                    <Stethoscope
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      name="doctorName"
                      value={form.doctorName}
                      onChange={handleChange}
                      placeholder="Enter doctor name"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Appointment Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Appointment Time
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Appointment Reason
                </label>

                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter appointment reason..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm(emptyForm);
                  }}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 size={17} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Save Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
