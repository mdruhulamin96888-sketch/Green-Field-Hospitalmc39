"use client";

import { Bell, Menu, Search, UserCircle } from "lucide-react";

export default function Topbar({ user }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-5 md:px-8">
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden">
          <Menu size={22} />
        </button>

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search doctors, patients..."
            className="w-80 rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800">
          <Bell size={21} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">
              {user?.name || "Administrator"}
            </p>

            <p className="text-xs text-slate-400">
              {user?.role || "ADMIN"}
            </p>
          </div>

          <UserCircle size={38} className="text-emerald-400" />
        </div>
      </div>
    </header>
  );
}