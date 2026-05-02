import { ArrowUpRight } from "lucide-react";

function StatCard({
  label,
  value,
  color,
  note,
}: {
  label: string;
  value: number;
  color: string;
  note: string;
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-violet-50 text-violet-700 border-violet-200",
  };

  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white/88 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-slate-100/80 blur-2xl transition group-hover:bg-sky-100/60" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Snapshot
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-600">{label}</p>
          </div>
          <div
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold ${colors[color as keyof typeof colors]}`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            Live
          </div>
        </div>

        <p className="mt-7 text-4xl font-bold text-slate-950">{value}</p>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
          {note}
        </p>
      </div>
    </div>
  );
}

export default function PatientsStats({
  stats,
}: {
  stats: {
    total: number;
    active: number;
    underTreatment: number;
    critical: number;
    recovered: number;
  };
}) {
  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        label="Total Patients"
        value={stats.total}
        color="blue"
        note="All records currently visible in the patients workspace."
      />
      <StatCard
        label="Active"
        value={stats.active}
        color="green"
        note="Patients under regular monitoring with current activity."
      />
      <StatCard
        label="Under Treatment"
        value={stats.underTreatment}
        color="blue"
        note="Cases actively going through treatment and staged follow-up."
      />
      <StatCard
        label="Critical"
        value={stats.critical}
        color="red"
        note="High-priority cases that need faster review visibility."
      />
      <StatCard
        label="Recovered"
        value={stats.recovered}
        color="purple"
        note="Post-treatment cases retained for history and tracking."
      />
    </section>
  );
}
