"use client";

import { motion } from "framer-motion";
import { BrainCircuit, ScanSearch } from "lucide-react";
import { explainabilityFeatures } from "./dashboardData";

export default function DashboardExplainability() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.34 }}
      className="group relative overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-slate-100/80 blur-2xl transition group-hover:bg-violet-100/70" />

      <div className="relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Model rationale
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              Explainable AI signals
            </h3>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              A simplified interpretation view showing which inputs are carrying
              the most weight in the current staging context.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Primary driver
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    AFP Level
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <ScanSearch className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Interpretation
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    Feature-weight snapshot
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {explainabilityFeatures.map((feature) => (
          <div
            key={feature.name}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {feature.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.note}
                </p>
              </div>
              <div className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-bold text-violet-700">
                {feature.value}%
              </div>
            </div>

            <div className="mt-5 h-3 w-full rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500"
                style={{ width: `${feature.value}%` }}
              />
            </div>
          </div>
        ))}
        </div>
      </div>
    </motion.section>
  );
}
