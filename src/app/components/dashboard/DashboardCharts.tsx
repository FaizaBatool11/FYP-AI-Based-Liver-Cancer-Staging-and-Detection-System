"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, TrendingUp } from "lucide-react";
import StageChart from "../StageChart";
import TrendChart from "../TrendChart";

const chartCards = [
  {
    title: "Stage Distribution",
    description:
      "Track current case spread across cancer stages to understand today’s review mix.",
    eyebrow: "Clinical mix",
    metric: "62",
    metricLabel: "cases in active sample",
    icon: BarChart3,
    iconWrapClass: "bg-violet-100",
    iconClass: "text-violet-600",
    chart: <StageChart />,
  },
  {
    title: "Risk Index Trend",
    description:
      "Monitor how the model’s risk signal is moving over the latest review window.",
    eyebrow: "Signal trend",
    metric: "91%",
    metricLabel: "peak confidence point",
    icon: TrendingUp,
    iconWrapClass: "bg-sky-100",
    iconClass: "text-sky-600",
    chart: <TrendChart />,
  },
];

export default function DashboardCharts() {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {chartCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 + index * 0.06 }}
            className="group relative overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-slate-100/80 blur-2xl transition group-hover:bg-sky-100/70" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                    {card.description}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconWrapClass}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconClass}`} />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-[1.4rem] border border-slate-200 bg-slate-50/80 px-4 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Snapshot
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {card.metric}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden h-10 w-px bg-slate-200 sm:block" />
                  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                    <Activity className="h-4 w-4 text-emerald-600" />
                    {card.metricLabel}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white p-4">
                {card.chart}
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
