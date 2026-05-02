"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { heroMetrics } from "./landingData";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.30),transparent_38%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.20),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.92))]" />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-white/10 px-4 py-2 text-sm text-sky-500">
            <Sparkles className="h-4 w-4 text-sky-400" />
            Premium diagnostic overview for AI-based liver cancer staging
          </div>
          <h1 className="mt-8 text-balance text-5xl font-bold tracking-tight text-black/80 sm:text-6xl lg:text-7xl">
            A clearer front door for your liver cancer staging platform.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            The home page now frames the project as a credible medical AI
            system: fast to understand, easy to navigate, and structured around
            imaging, clinical insight, and trustworthy decision support.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/Signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:shadow-[0_18px_35px_rgba(56,189,248,0.35)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#platform"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-black/80 transition hover:bg-white/10"
            >
              Explore Platform
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white/10 shadow-[0_20px_60px_rgba(2,12,27,0.16)] backdrop-blur">
            <div className="grid gap-px bg-black/10 sm:grid-cols-3">
              {heroMetrics.map((item, index) => (
                <div key={item.label} className="relative bg-white/8 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Metric 0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-black/10" />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-bold text-black/80 sm:text-[2.6rem]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                        {item.label}
                      </p>
                    </div>
                    <div className="hidden h-12 w-12 rounded-2xl border border-black/10 bg-white/30 sm:block" />
                  </div>
                  <p className="mt-4 max-w-[22ch] text-sm leading-6 text-slate-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-x-10 top-10 -z-10 h-72 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="surface-card overflow-hidden p-6 md:p-7">
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-sky-300/70">
                    Diagnostic summary
                  </p>
                  <h2 className="mt-3 text-2xl font-bold">
                    Unified AI review panel
                  </h2>
                </div>
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-200">
                  Secure flow
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Imaging confidence</p>
                  <p className="mt-3 text-4xl font-bold">94%</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                    Visual review panel designed for high-signal interpretation.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Staging support</p>
                  <p className="mt-3 text-4xl font-bold">TNM</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                    Layout supports model output, metadata, and explanation
                    blocks.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-300">
                      Clinical review pillars
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Imaging, biomarkers, explainability, and speed.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
                    <ShieldCheck className="h-4 w-4" />
                    Trust-focused UI
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["Scan review", "Risk context", "Report-ready output"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-100"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
