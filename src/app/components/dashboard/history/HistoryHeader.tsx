import { Activity, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";

export default function HistoryHeader() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.1),_transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.96))] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
          <Sparkles className="h-4 w-4" />
          Prediction workspace
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-[0_14px_35px_rgba(56,189,248,0.24)]">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Liver Cancer Stage Prediction
          </h1>
        </div>

        <p className="mt-4 max-w-3xl text-sm font-medium leading-8 text-slate-600 md:text-base">
          Capture patient identity, clinical markers, and imaging context in
          one place before sending the case through the staging workflow.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700">
            <BrainCircuit className="h-4 w-4 text-sky-600" />
            AI-assisted review
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Clinical data capture
          </div>
        </div>
      </div>
    </section>
  );
}
