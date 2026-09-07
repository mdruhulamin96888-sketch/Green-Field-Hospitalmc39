"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  UserRound,
  Save,
  Phone,
  Mail,
  CalendarDays,
  Users,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const STORAGE_KEY = "hospital_patients";

export default function AddPatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =========================================================
  // GENERATE PATIENT ID
  // =========================================================

  const generatePatientCode = () => {
    const randomPart = Math.floor(
      1000 + Math.random() * 9000
    );

    const timePart = Date.now()
      .toString()
      .slice(-5);

    return `PAT-${timePart}-${randomPart}`;
  };

  // =========================================================
  // SAVE PATIENT
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!form.name.trim()) {
      setError("Patient name is required.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    setIsSaving(true);

    try {
      // Get existing patients
      const savedPatients =
        localStorage.getItem(STORAGE_KEY);

      let existingPatients = [];

      if (savedPatients) {
        try {
          const parsed = JSON.parse(savedPatients);

          if (Array.isArray(parsed)) {
            existingPatients = parsed;
          }
        } catch {
          existingPatients = [];
        }
      }

      // Create new patient
      const newPatient = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,

        patientCode: generatePatientCode(),

        name: form.name.trim(),

        phone: form.phone.trim(),

        email: form.email.trim(),

        gender: form.gender,

        dateOfBirth: form.dateOfBirth,

        status: form.status,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      };

      // Add new patient
      const updatedPatients = [
        ...existingPatients,
        newPatient,
      ];

      // IMPORTANT:
      // Save entire patient list to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedPatients)
      );

      setSuccess(true);

      // Go back to patient list
      setTimeout(() => {
        router.push("/patients");
        router.refresh();
      }, 700);
    } catch (error) {
      console.error(
        "Failed to save patient:",
        error
      );

      setError(
        "Unable to save patient. Please try again."
      );

      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      <main className="min-w-0 flex-1">
        {/* Topbar */}
        <Topbar />

        <div className="p-5 md:p-8">
          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="mb-8">
            <Link
              href="/patients"
              className="mb-5 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-400"
            >
              <ArrowLeft size={16} />
              Back to Patients
            </Link>

            <div className="flex items-start gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 sm:flex">
                <UserRound
                  size={22}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <Users size={15} />
                  Patient Management
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Add Patient
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
                  Register a new patient and add their
                  basic information to the hospital
                  directory.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-300">
              <CheckCircle2
                size={19}
                className="shrink-0"
              />

              Patient saved successfully. Redirecting...
            </div>
          )}

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* =================================================
                  MAIN FORM
              ================================================= */}

              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/5">
                {/* Header */}
                <div className="border-b border-slate-800 px-6 py-5">
                  <h2 className="font-semibold text-white">
                    Patient Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the patient's basic information
                    below.
                  </p>
                </div>

                <div className="space-y-7 p-6">
                  {/* =================================================
                      PERSONAL INFORMATION
                  ================================================= */}

                  <section>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                        <UserRound
                          size={17}
                          className="text-emerald-400"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Personal Information
                        </h3>

                        <p className="text-xs text-slate-500">
                          Basic patient details
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Name */}
                      <InputField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter patient's full name"
                        required
                        icon={UserRound}
                      />

                      {/* Phone */}
                      <InputField
                        label="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                        type="tel"
                        icon={Phone}
                      />

                      {/* Email */}
                      <InputField
                        label="Email Address"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="patient@example.com"
                        type="email"
                        icon={Mail}
                      />

                      {/* Gender */}
                      <SelectField
                        label="Gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        options={[
                          {
                            value: "",
                            label: "Select gender",
                          },
                          {
                            value: "Male",
                            label: "Male",
                          },
                          {
                            value: "Female",
                            label: "Female",
                          },
                          {
                            value: "Other",
                            label: "Other",
                          },
                        ]}
                      />

                      {/* DOB */}
                      <InputField
                        label="Date of Birth"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        type="date"
                        icon={CalendarDays}
                      />

                      {/* Status */}
                      <SelectField
                        label="Patient Status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        options={[
                          {
                            value: "Active",
                            label: "Active",
                          },
                          {
                            value: "Inactive",
                            label: "Inactive",
                          },
                        ]}
                      />
                    </div>
                  </section>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
                    <Link
                      href="/patients"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      disabled={isSaving || success}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={17} />
                          Save Patient
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SIDE INFORMATION
              ================================================= */}

              <div className="space-y-5">
                {/* Registration info */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <ShieldCheck
                        size={19}
                        className="text-emerald-400"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Registration
                      </h3>

                      <p className="text-xs text-slate-500">
                        Secure patient record
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <InfoItem
                      label="Patient ID"
                      value="Generated automatically"
                    />

                    <InfoItem
                      label="Status"
                      value="Active"
                    />

                    <InfoItem
                      label="Storage"
                      value="Local hospital records"
                    />
                  </div>
                </div>

                {/* Required fields */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <h3 className="text-sm font-semibold text-white">
                    Required Information
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Full name and phone number are
                    required. Other information can be
                    added later.
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 size={14} />
                    All data is saved locally
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

// =========================================================
// INPUT FIELD
// =========================================================

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon: Icon,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}

        {required && (
          <span className="ml-1 text-emerald-400">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-slate-700 bg-slate-950 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 ${
            Icon ? "pl-11" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

// =========================================================
// SELECT FIELD
// =========================================================

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// =========================================================
// INFO ITEM
// =========================================================

function InfoItem({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-slate-300">
        {value}
      </span>
    </div>
  );
}