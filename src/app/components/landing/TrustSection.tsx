"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { trustPoints } from "./landingData";

export default function TrustSection() {
  return (
    <section id="trust" className="relative overflow-hidden px-6 py-20 lg:px-8">
      <div className="absolute right-0 top-16 -z-10 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl rounded-[2rem] border border-emerald-100 bg-white/75 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Trust overview
          </div>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            The design should signal clinical seriousness at a glance.
          </h2>
          <p className="mt-6 text-base font-medium leading-8 text-slate-700 sm:text-lg">
            The previous page mixed strong gradients, dense cards, and generic
            marketing patterns. This version makes privacy, clarity, and
            credibility feel built into the presentation rather than appended to
            it.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              "More grounded healthcare presentation",
              "Clearer trust hierarchy across the page",
              "Better support for security and explainability messaging",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Core principle
                </p>
                <h3 className="mt-3 text-xl font-bold text-slate-950">
                  Trust cues are now part of the layout, not an afterthought.
                </h3>
                <p className="mt-3 text-base font-medium leading-7 text-slate-700">
                  Privacy, explainability, and clinical support are distributed
                  across the page so the story remains coherent from the hero to
                  the contact section.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/78 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl transition group-hover:bg-sky-100/70" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-700">
                    {point.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-200/80 pt-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-sm font-semibold text-slate-600">
                      Reinforces credibility across the full journey
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
