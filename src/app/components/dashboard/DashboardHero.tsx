"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const heroHighlights = [
  "AI-assisted staging overview",
  "Faster review of high-priority cases",
  "Readable clinical summary at a glance",
];

const heroMetrics = [
  { label: "Cases in review", value: "18" },
  { label: "Urgent flagged", value: "4" },
  { label: "Reports generated", value: "27" },
];

export default function DashboardHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_45%,#312e81_100%)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] md:p-8"
    >
      <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-300/15 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-white/8 px-4 py-2 text-sm font-semibold text-sky-100">
            <Sparkles className="h-4 w-4 text-sky-300" />
            Dashboard overview
          </div>

          <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            Good morning, Dr. Kim. Your staging workspace is ready.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-slate-200 md:text-lg">
            Review active cases, monitor explainable AI signals, and move from
            intake to report generation with a dashboard designed for quick
            clinical scanning.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100">
              Upload Patient
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/6 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              <FileText className="h-4 w-4" />
              View Reports
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  Today&apos;s focus
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  Review queue and risk context
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                <Activity className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/20 px-4 py-3"
                >
                  <div className="h-2 w-2 rounded-full bg-cyan-300" />
                  <p className="text-sm font-medium text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/24 p-5 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  Session state
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Static design mode with mock-ready dashboard content
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Safe for UI iteration while backend access is unavailable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
