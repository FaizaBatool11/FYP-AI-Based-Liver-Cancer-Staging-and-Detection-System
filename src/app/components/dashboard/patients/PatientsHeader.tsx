import { Activity, FileHeart, Sparkles, Users } from "lucide-react";

export default function PatientsHeader() {
  return (
    <section className="mb-6 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_65px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
            <Sparkles className="h-4 w-4" />
            Patient workspace
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.22)]">
              <Activity className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Patient Management
            </h1>
          </div>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-8 text-slate-600 md:text-base">
            Manage patient records, review treatment status, and keep clinical
            details organized while you iterate on the dashboard design.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/85 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Focus
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Patient records overview
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/85 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <FileHeart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Static mock data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
