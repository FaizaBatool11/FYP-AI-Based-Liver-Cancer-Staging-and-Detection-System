"use client";

import { useState } from "react";
import { Bell, Search, Sparkles, User } from "lucide-react";

export default function Topbar() {
  const [inputValue, setInputValue] = useState("");

  return (
    <header className="border-b border-slate-200/80 bg-white/72 px-4 py-5 backdrop-blur md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Dashboard shell
            </p>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
              <Sparkles className="h-3.5 w-3.5" />
              Design preview
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-[2rem]">
            Clinical overview
          </h1>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-4 xl:w-[34rem] 2xl:w-[38rem]">
          <div className="relative min-w-0">
            <input
              placeholder="Search patient, scan, id..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="h-12 w-full rounded-[1.3rem] border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
            />
            <Search
              className={[
                "absolute left-4 top-3.5 h-5 w-5 transition-colors duration-200",
                inputValue ? "text-sky-600" : "text-slate-400",
              ].join(" ")}
            />
          </div>

          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <button className="relative flex h-12 w-12 items-center justify-center rounded-[1.3rem] border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </button>

            <div className="flex items-center gap-3 rounded-[1.3rem] border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-slate-800">
                  Dr. Kim
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Radiologist
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
