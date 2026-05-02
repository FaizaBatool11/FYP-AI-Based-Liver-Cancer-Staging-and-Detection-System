"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { featureCards } from "./landingData";

export default function PlatformSection() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden px-6 py-20 lg:px-8"
    >
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-72 max-w-6xl rounded-full bg-sky-200/30 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Platform"
          title="A calmer, more legible overview of the system."
          description="The landing page explains the core capabilities without forcing users through dense copy or inconsistent visual treatment."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-sky-100 bg-white/70 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
              <Sparkles className="h-4 w-4" />
              Product overview
            </div>
            <h3 className="mt-6 max-w-sm text-3xl font-bold tracking-tight text-slate-950">
              Three core capabilities, presented with more confidence.
            </h3>
            <p className="mt-5 max-w-md text-base font-medium leading-8 text-slate-700">
              This section now works as a clean platform snapshot: what the
              system analyzes, how it combines signals, and why the output feels
              trustworthy.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Sharper feature hierarchy",
                "Cleaner card rhythm",
                "Stronger visual consistency",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-4"
                >
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {featureCards.map((card, index) => {
              const Icon = card.icon;
              const isWide = index === 0;

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className={[
                    "group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/78 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]",
                    isWide ? "md:col-span-2" : "",
                  ].join(" ")}
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-sky-100/70 blur-2xl transition group-hover:bg-cyan-100/80" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sky-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-xs text-2xl font-bold tracking-tight text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-700">
                      {card.description}
                    </p>

                    <div className="mt-8 flex items-center gap-3 border-t border-slate-200/80 pt-5">
                      <div className="h-2 w-2 rounded-full bg-sky-500" />
                      <p className="text-sm font-semibold text-slate-600">
                        Designed to read quickly in a clinical product context
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
