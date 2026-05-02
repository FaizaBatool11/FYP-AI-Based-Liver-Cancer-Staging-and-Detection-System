import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

type AuthLayoutProps = {
  badge: string;
  title: string;
  description: string;
  points: string[];
  accentLabel: string;
  accentValue: string;
  children: ReactNode;
};

export default function AuthLayout({
  badge,
  title,
  description,
  points,
  accentLabel,
  accentValue,
  children,
}: AuthLayoutProps) {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-8 -z-10 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-80 w-80 rounded-full bg-emerald-100/35 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-sky-100 bg-white/75 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            {badge}
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-slate-700 md:text-lg">
            {description}
          </p>

          <div className="mt-8 grid gap-3">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-700">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {accentLabel}
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-950">{accentValue}</p>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              Designed to feel consistent with the landing experience while
              keeping the form flow focused and readable.
            </p>
          </div>
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}
