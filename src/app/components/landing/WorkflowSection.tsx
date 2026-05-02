"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { workflowSteps } from "./landingData";

export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="bg-white/75 px-6 py-20 backdrop-blur-sm lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Workflow"
          title="Three steps, presented with more confidence."
          description="The process section is simplified so the value proposition stays readable on mobile and structured on larger screens."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300" />
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-800">
                Step {step.step}
              </p>
              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-slate-700">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
