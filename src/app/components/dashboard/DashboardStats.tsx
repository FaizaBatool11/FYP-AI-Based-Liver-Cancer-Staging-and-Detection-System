"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { dashboardStats } from "./dashboardData";

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {dashboardStats.map((stat, index) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 + index * 0.07 }}
          className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_65px_rgba(15,23,42,0.12)]"
        >
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-slate-100/80 blur-2xl transition group-hover:bg-sky-100/70" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Metric 0{index + 1}
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconWrapClass}`}
              >
                <svg
                  className={`h-6 w-6 ${stat.iconClass}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={stat.iconPath}
                  />
                </svg>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <div className={`text-4xl font-bold ${stat.accentClass}`}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-slate-500">
                  Current dashboard snapshot
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                <ArrowUpRight className="h-4 w-4" />
                {stat.change}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200/80 pt-4">
              <p className="text-sm font-semibold text-slate-600">
                {stat.trendLabel}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
