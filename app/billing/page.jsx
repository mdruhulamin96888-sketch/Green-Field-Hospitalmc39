"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Receipt, Plus, Search, X, UserRound, Stethoscope,
  CalendarDays, Trash2, CheckCircle2, Clock4, DollarSign, FileText, CreditCard
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const STORAGE_KEY = "hospitalBilling";
const emptyForm = { patientName: "", doctorName: "", date: "", consultationFee: "", medicineCharges: "", diagnosticCharges: "", otherCharges: "", notes: "" };

const formatCurrency = (amount) => `৳${Number(amount || 0).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`;
const formatDate = (date) => date ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : "-";

export default function BillingPage() {
  const [bills, setBills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBills(JSON.parse(stored));
    } catch (e) { console.error(e); }
  }, []);

  const saveToStorage = (updated) => {
    setBills(updated);
    updated.length ? localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) : localStorage.removeItem(STORAGE_KEY);
  };

  const filteredBills = useMemo(() => {
    const k = search.toLowerCase().trim();
    return k ? bills.filter(b => [b.id, b.patientName, b.doctorName, b.date, b.status, b.notes].join(" ").toLowerCase().includes(k)) : bills;
  }, [bills, search]);

  const { paidBills, pendingBills, totalRevenue, pendingAmount } = useMemo(() => {
    return bills.reduce((acc, b) => {
      const val = Number(b.total || 0);
      if (b.status === "Paid") { acc.paidBills++; acc.totalRevenue += val; }
      else { acc.pendingBills++; acc.pendingAmount += val; }
      return acc;
    }, { paidBills: 0, pendingBills: 0, totalRevenue: 0, pendingAmount: 0 });
  }, [bills]);

  const totalFormAmount = Number(form.consultationFee || 0) + Number(form.medicineCharges || 0) + Number(form.diagnosticCharges || 0) + Number(form.otherCharges || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientName.trim() || !form.doctorName.trim() || !form.date) return;

    const maxId = bills.reduce((max, b) => Math.max(max, Number(b.id?.match(/BILL-(\d+)/)?.[1] || 0)), 0);
    const newBill = {
      ...form,
      id: `BILL-${String(maxId + 1).padStart(4, "0")}`,
      total: totalFormAmount,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    saveToStorage([newBill, ...bills]);
    setForm(emptyForm);
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowModal(false); }, 700);
  };

  const markAsPaid = (id) => saveToStorage(bills.map(b => b.id === id ? { ...b, status: "Paid", paidAt: new Date().toISOString() } : b));
  const deleteBill = (id) => window.confirm("Delete this bill?") && saveToStorage(bills.filter(b => b.id !== id));

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Topbar />
        <div className="p-5 md:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400"><Receipt size={16} /> Hospital Management</div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Billing</h1>
              <p className="mt-2 text-slate-400">Create and manage patient bills and payments.</p>
            </div>
            <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-400">
              <Plus size={19} /> Create New Bill
            </button>
          </div>

          {/* Stats */}
          <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Bills", val: bills.length, icon: Receipt, color: "text-blue-400 bg-blue-500/10" },
              { label: "Paid Bills", val: paidBills, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
              { label: "Pending Bills", val: pendingBills, icon: Clock4, color: "text-amber-400 bg-amber-500/10" },
              { label: "Total Revenue", val: formatCurrency(totalRevenue), icon: DollarSign, color: "text-purple-400 bg-purple-500/10" }
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold">{stat.val}</p>
                </div>
                <div className={`rounded-xl p-3 ${stat.color}`}><stat.icon size={23} /></div>
              </div>
            ))}
          </div>

          {/* Pending Banner */}
          {pendingAmount > 0 && (
            <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400"><Clock4 size={20} /></div>
                <div>
                  <p className="font-semibold text-white">Pending Payments</p>
                  <p className="text-sm text-slate-500">Outstanding amount from unpaid bills</p>
                </div>
              </div>
              <p className="text-xl font-bold text-amber-400">{formatCurrency(pendingAmount)}</p>
            </div>
          )}

          {/* Search */}
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 relative">
            <Search size={19} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient, doctor, bill ID..." className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500" />
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredBills.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
                <Receipt size={30} className="mx-auto text-emerald-400 mb-4" />
                <h2 className="text-lg font-semibold text-white">No billing records found</h2>
              </div>
            ) : filteredBills.map((bill) => (
              <div key={bill.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><UserRound size={22} /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-white">{bill.patientName}</h2>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">{bill.id}</span>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-400"><Stethoscope size={14} /> Dr. {bill.doctorName}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-300"><CalendarDays size={16} className="text-emerald-400" /> {formatDate(bill.date)}</span>
                    <span className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">{formatCurrency(bill.total)}</span>
                    <span className={`rounded-xl px-4 py-2.5 text-xs font-semibold ${bill.status === "Paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{bill.status}</span>
                    {bill.status === "Pending" && (
                      <button onClick={() => markAsPaid(bill.id)} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold transition hover:bg-emerald-400"><CreditCard size={15} /> Mark Paid</button>
                    )}
                    <button onClick={() => deleteBill(bill.id)} className="rounded-xl border border-slate-800 p-2.5 text-slate-500 hover:text-red-400"><Trash2 size={17} /></button>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-slate-800 pt-4 sm:grid-cols-4 text-xs text-slate-400">
                  <div>Consultation: <p className="text-sm font-medium text-slate-200">{formatCurrency(bill.consultationFee)}</p></div>
                  <div>Medicine: <p className="text-sm font-medium text-slate-200">{formatCurrency(bill.medicineCharges)}</p></div>
                  <div>Diagnostics: <p className="text-sm font-medium text-slate-200">{formatCurrency(bill.diagnosticCharges)}</p></div>
                  <div>Other: <p className="text-sm font-medium text-slate-200">{formatCurrency(bill.otherCharges)}</p></div>
                </div>

                {bill.notes && <p className="text-sm text-slate-500 flex gap-2"><FileText size={15} /> {bill.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold">Create New Bill</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-500 hover:text-white"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "Patient Name", name: "patientName", icon: UserRound, type: "text" },
                  { label: "Doctor Name", name: "doctorName", icon: Stethoscope, type: "text" },
                  { label: "Billing Date", name: "date", icon: CalendarDays, type: "date" },
                  { label: "Consultation Fee", name: "consultationFee", prefix: "৳", type: "number" },
                  { label: "Medicine Charges", name: "medicineCharges", prefix: "৳", type: "number" },
                  { label: "Diagnostic Charges", name: "diagnosticCharges", prefix: "৳", type: "number" },
                  { label: "Other Charges", name: "otherCharges", prefix: "৳", type: "number" },
                ].map((input, idx) => (
                  <div key={idx}>
                    <label className="mb-1 block text-sm font-medium text-slate-300">{input.label}</label>
                    <div className="relative">
                      {input.icon && <input.icon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />}
                      {input.prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">{input.prefix}</span>}
                      <input
                        type={input.type}
                        name={input.name}
                        value={form[input.name]}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        className={`w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 text-sm outline-none focus:border-emerald-500 ${input.prefix ? "pl-9" : "pl-10"} pr-4`}
                        required={input.type !== "number"}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex justify-between items-center">
                <span className="text-sm text-slate-400">Total Amount</span>
                <span className="text-xl font-bold text-emerald-400">{formatCurrency(totalFormAmount)}</span>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Notes</label>
                <textarea name="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm outline-none focus:border-emerald-500" />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300">Cancel</button>
                <button type="submit" className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400">
                  {saved ? <><CheckCircle2 size={17} /> Saved</> : <><Plus size={17} /> Save Bill</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}