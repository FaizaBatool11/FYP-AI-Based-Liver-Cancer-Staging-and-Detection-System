import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";

type ContactSectionProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ContactSection({ onSubmit }: ContactSectionProps) {
  return (
    <section id="contact" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/70 bg-slate-950 px-8 py-12 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] md:px-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-sky-300">
              Contact
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Keep the final section useful, not decorative.
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-slate-200 sm:text-lg">
              The form stays on the home page to preserve the complete overview
              structure, but it now fits the same visual system and avoids the
              overloaded styling from the earlier version.
            </p>
            <div className="mt-8 grid gap-4 text-sm font-medium text-slate-200 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Clinician-oriented presentation
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Sharper conversion paths
              </div>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
              />
              <input
                type="email"
                placeholder="Your email"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
            />
            <textarea
              rows={6}
              placeholder="Tell us about your use case, collaboration idea, or project feedback."
              className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
            />
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-300">
                This form is currently presentational and keeps the landing page
                complete.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:shadow-[0_16px_30px_rgba(56,189,248,0.35)]"
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
