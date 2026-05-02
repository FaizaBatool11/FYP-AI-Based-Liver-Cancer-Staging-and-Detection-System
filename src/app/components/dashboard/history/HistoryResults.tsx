import {
  Activity,
  BadgeCheck,
  Check,
  Download,
  Info,
  Printer,
} from "lucide-react";
import { PredictionResult } from "./historyTypes";

type HistoryResultsProps = {
  result: PredictionResult | null;
  showResult: boolean;
  onExport: () => void;
};

export default function HistoryResults({
  result,
  showResult,
  onExport,
}: HistoryResultsProps) {
  if (!showResult || !result) {
    return null;
  }

  const confidenceLabel =
    result.confidence >= 0.8
      ? "High confidence prediction"
      : result.confidence >= 0.5
        ? "Moderate confidence prediction"
        : "Low confidence - recommend further testing";

  return (
    <section className="mx-auto max-w-5xl animate-fadeIn overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.95))] shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
      <div className="border-b border-slate-200/80 px-6 py-6 md:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-slate-950 text-white shadow-[0_14px_36px_rgba(15,23,42,0.18)]">
              <Activity className="h-7 w-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <BadgeCheck className="h-3.5 w-3.5" />
                Prediction results
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                AI-Based Cancer Stage Analysis
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                Review the predicted class and confidence before exporting or
                printing the summary.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-slate-200 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Confidence
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Output
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {confidenceLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.7rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Predicted stage
            </p>
            <div className="mt-5 rounded-[1.5rem] bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 px-6 py-7 text-white shadow-[0_20px_45px_rgba(37,99,235,0.24)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                Model output
              </p>
              <p className="mt-3 text-4xl font-bold">{result.predicted_class}</p>
            </div>

            <div className="mt-5 rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Interpretation
              </p>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                Use this output as a screening-oriented decision support signal,
                not as a standalone diagnostic conclusion.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.7rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Confidence score
                </p>
                <Check className="h-5 w-5 text-sky-600" />
              </div>
              <p className="mb-3 text-3xl font-bold text-slate-950">
                {(result.confidence * 100).toFixed(1)}%
              </p>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    result.confidence >= 0.8
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                      : result.confidence >= 0.5
                        ? "bg-gradient-to-r from-amber-400 to-amber-600"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-slate-600">
                {confidenceLabel}
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-blue-200 bg-blue-50/80 p-6">
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">
                    Important Notice
                  </h3>
                  <p className="text-sm leading-7 text-slate-700">
                    This prediction is generated by an AI model and should be
                    used as a screening tool only. Please consult with a
                    qualified healthcare professional for proper diagnosis and
                    treatment planning. Clinical judgment and additional tests
                    may be required for accurate assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:flex-row">
          <button
            onClick={onExport}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
          >
            <Download className="h-5 w-5" />
            Download Report
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[1.2rem] border border-slate-200 bg-slate-50 px-6 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Printer className="h-5 w-5" />
            Print Results
          </button>
        </div>
      </div>
    </section>
  );
}
