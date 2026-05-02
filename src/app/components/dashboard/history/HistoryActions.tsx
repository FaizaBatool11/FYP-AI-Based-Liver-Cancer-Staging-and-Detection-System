import { Activity, Loader2, RotateCcw, Sparkles } from "lucide-react";

type HistoryActionsProps = {
  isFormValid: boolean;
  isLoading: boolean;
  onPredict: () => void;
  onReset: () => void;
};

export default function HistoryActions({
  isFormValid,
  isLoading,
  onPredict,
  onReset,
}: HistoryActionsProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/92 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="grid gap-5 px-6 py-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Sparkles className="h-3.5 w-3.5" />
            Final step
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
            Run the staging workflow
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
            Review the captured data, then launch the prediction step or reset
            the form to start a fresh case intake.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <button
            onClick={onPredict}
            disabled={!isFormValid || isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-[1.25rem] px-6 py-4 text-base font-semibold transition-all ${
              isFormValid && !isLoading
                ? "bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:bg-slate-800"
                : "cursor-not-allowed bg-slate-200 text-slate-500"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing prediction...
              </>
            ) : (
              <>
                <Activity className="h-5 w-5" />
                Predict Cancer Stage
              </>
            )}
          </button>

          <button
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
