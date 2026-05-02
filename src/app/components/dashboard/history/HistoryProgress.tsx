type HistoryProgressProps = {
  progress: number;
};

export default function HistoryProgress({ progress }: HistoryProgressProps) {
  const progressState =
    progress >= 85
      ? "Ready for prediction"
      : progress >= 50
        ? "Clinical intake in progress"
        : "Start completing the case";

  return (
    <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Case completion
          </p>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
            {progressState}
          </h2>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
            Fill patient details, biomarkers, and optional imaging before
            running the staging step.
          </p>
        </div>

        <div className="rounded-[1.35rem] border border-sky-200 bg-sky-50 px-5 py-4 text-center lg:min-w-[9rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Progress
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{progress}%</p>
        </div>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
          Identity details
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
          Clinical markers
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
          Imaging upload
        </div>
      </div>
    </div>
  );
}
