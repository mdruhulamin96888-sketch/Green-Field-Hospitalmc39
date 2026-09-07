"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Stethoscope,
  UserRound,
  Mail,
  Phone,
  BriefcaseMedical,
  GraduationCap,
  Clock3,
  MapPin,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function AddDoctorPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    department: "Cardiology",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    schedule: "",
    room: "",
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const storedDoctors = localStorage.getItem("hospital_doctors");
      let existingDoctors = [];

      try {
        existingDoctors = storedDoctors ? JSON.parse(storedDoctors) : [];
      } catch {
        existingDoctors = [];
      }

      if (!Array.isArray(existingDoctors)) {
        existingDoctors = [];
      }

      const newDoctor = {
        id: `DOC-${Date.now()}`,
        name: form.name.trim(),
        specialty: form.specialty.trim(),
        department: form.department,
        email: form.email.trim(),
        phone: form.phone.trim(),
        qualification: form.qualification.trim(),
        experience: form.experience.trim(),
        schedule: form.schedule.trim(),
        room: form.room.trim(),
        status: form.status,
        patientsToday: 0,
        createdAt: new Date().toISOString(),
      };

      const updatedDoctors = [...existingDoctors, newDoctor];
      localStorage.setItem("hospital_doctors", JSON.stringify(updatedDoctors));

      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push("/doctors");
    } catch (error) {
      console.error("Failed to add doctor:", error);
      alert("Unable to save doctor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
        <div className="mb-8">
          <Link
            href="/doctors"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={17} /> Back to Doctors
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400">
                <Stethoscope size={16} /> Medical Staff
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Add New Doctor
              </h1>
              <p className="mt-2 max-w-2xl text-slate-400">
                Add a new doctor to the Green Field Hospital medical staff directory.
              </p>
            </div>
            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 sm:flex">
              <Stethoscope size={27} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
            <CheckCircle2 size={20} />
            <span className="text-sm font-medium">Doctor saved successfully. Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <UserRound size={19} className="text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">Personal Information</h2>
                      <p className="mt-1 text-xs text-slate-500">Basic information about the doctor</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                  <InputField label="Doctor Name" name="name" value={form.name} onChange={handleChange} placeholder="Dr. John Doe" icon={UserRound} required />
                  <InputField label="Specialty" name="specialty" value={form.specialty} onChange={handleChange} placeholder="e.g. Cardiologist" icon={Stethoscope} required />
                  <SelectField label="Department" name="department" value={form.department} onChange={handleChange} icon={BriefcaseMedical} required options={["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Gynecology", "General Medicine", "Emergency", "Dental"]} />
                  <InputField label="Qualification" name="qualification" value={form.qualification} onChange={handleChange} placeholder="MBBS, FCPS, MD" icon={GraduationCap} />
                  <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="doctor@greenfieldhospital.com" icon={Mail} required />
                  <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" icon={Phone} required />
                  <InputField label="Experience" name="experience" value={form.experience} onChange={handleChange} placeholder="10 Years" icon={Clock3} />
                  <InputField label="Room Number" name="room" value={form.room} onChange={handleChange} placeholder="Room 201" icon={MapPin} />
                </div>
              </section>

              <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Clock3 size={19} className="text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">Schedule & Availability</h2>
                      <p className="mt-1 text-xs text-slate-500">Set the doctor's working schedule</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                  <InputField label="Working Schedule" name="schedule" value={form.schedule} onChange={handleChange} placeholder="09:00 AM - 05:00 PM" icon={Clock3} />
                  <SelectField label="Current Status" name="status" value={form.status} onChange={handleChange} icon={CheckCircle2} options={["Available", "Busy", "On Leave"]} />
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="font-semibold text-white">Doctor Preview</h2>
                <p className="mt-1 text-xs text-slate-500">Preview how the doctor will appear in the directory.</p>
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Stethoscope size={22} className="text-emerald-400" />
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">{form.status}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{form.name || "Doctor Name"}</h3>
                  <p className="mt-1 text-sm text-emerald-400">{form.specialty || "Medical Specialty"}</p>
                  <div className="mt-5 space-y-3 text-sm text-slate-500">
                    <div className="flex items-center gap-3"><Mail size={15} /><span className="truncate">{form.email || "doctor@example.com"}</span></div>
                    <div className="flex items-center gap-3"><Phone size={15} /><span>{form.phone || "+880 1XXX-XXXXXX"}</span></div>
                    <div className="flex items-center gap-3"><MapPin size={15} /><span>{form.room || "Room not assigned"}</span></div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
            <Link href="/doctors" className="flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white">Cancel</Link>
            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Saving Doctor...</> : <><Save size={18} /> Save Doctor</>}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function InputField({ label, name, type = "text", value, onChange, placeholder, icon: Icon, required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}{required && <span className="ml-1 text-emerald-400">*</span>}</label>
      <div className="relative">
        <Icon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, icon: Icon, options, required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}{required && <span className="ml-1 text-emerald-400">*</span>}</label>
      <div className="relative">
        <Icon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
        <select name={name} value={value} onChange={onChange} required={required} className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20">
          {options.map((option) => (<option key={option} value={option}>{option}</option>))}
        </select>
      </div>
    </div>
  );
}