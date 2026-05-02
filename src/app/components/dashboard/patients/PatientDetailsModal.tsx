"use client";

import { ReactNode } from "react";
import {
  Activity,
  Calendar,
  FileHeart,
  FileText,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { Patient } from "./patientsData";
import { getStatusColor } from "./patientsUtils";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.15rem] border border-slate-200 bg-white/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-slate-100 text-slate-700">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function PatientDetailsModal({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const patientInitials = patient.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.2)]">
        <div className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.94))] px-6 py-6 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-sky-50 text-lg font-bold text-sky-700 shadow-[0_12px_30px_rgba(14,165,233,0.12)]">
                {patientInitials}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <FileHeart className="h-3.5 w-3.5" />
                  Patient record
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                  {patient.name}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    Record #{patient.id}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {patient.status}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {patient.stage || "Stage pending"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-slate-200 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Contact
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {patient.email}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {patient.phone}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Profile
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {patient.age} years / {patient.gender}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Added {formatDate(patient.dateAdded)}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Last visit
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDate(patient.lastVisit)}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Review-ready snapshot
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[calc(92vh-240px)] overflow-y-auto px-6 py-6 md:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <section className="rounded-[1.7rem] border border-slate-200/80 bg-slate-50/80 p-5">
                <SectionTitle
                  icon={<UserRound className="h-5 w-5" />}
                  title="Basic Information"
                  description="Core record details used to identify and track the patient."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem label="Email" value={patient.email} />
                  <InfoItem label="Phone" value={patient.phone} />
                  <InfoItem label="Gender" value={patient.gender} />
                  <InfoItem label="Age" value={`${patient.age} years`} />
                  <InfoItem label="Status" value={patient.status} />
                  <InfoItem label="Date Added" value={formatDate(patient.dateAdded)} />
                </div>
              </section>

              <section className="rounded-[1.7rem] border border-slate-200/80 bg-sky-50/55 p-5">
                <SectionTitle
                  icon={<Activity className="h-5 w-5" />}
                  title="Medical Information"
                  description="Current diagnosis context and latest review timing."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem label="Diagnosis" value={patient.diagnosis || "N/A"} />
                  <InfoItem label="Stage" value={patient.stage || "N/A"} />
                  <InfoItem label="Last Visit" value={formatDate(patient.lastVisit)} />
                  <InfoItem
                    label="Record Note"
                    value="Static preview data for dashboard design iteration."
                  />
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {patient.clinicalData ? (
                <section className="rounded-[1.7rem] border border-slate-200/80 bg-white p-5">
                  <SectionTitle
                    icon={<FileText className="h-5 w-5" />}
                    title="Clinical Parameters"
                    description="Structured variables available for prediction and review."
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoItem
                      label="Age at Index"
                      value={patient.clinicalData.age_at_index}
                    />
                    <InfoItem label="BMI" value={patient.clinicalData.bmi} />
                    <InfoItem
                      label="Tumor Nodules"
                      value={patient.clinicalData.tumor_nodul}
                    />
                    <InfoItem
                      label="Hepatitis"
                      value={
                        patient.clinicalData.hepatitis === "1"
                          ? "Positive"
                          : "Negative"
                      }
                    />
                    <InfoItem
                      label="AFP Level"
                      value={`${patient.clinicalData.afp} ng/mL`}
                    />
                    <InfoItem
                      label="AFP Group"
                      value={
                        ["Low", "Medium", "High"][
                          parseInt(patient.clinicalData.afp_group)
                        ] || "Unknown"
                      }
                    />
                    <InfoItem
                      label="ALK"
                      value={`${patient.clinicalData.alk} U/L`}
                    />
                    <InfoItem
                      label="Metastasis"
                      value={
                        patient.clinicalData.metastasis === "1"
                          ? "Detected"
                          : "Not Detected"
                      }
                    />
                  </div>
                </section>
              ) : null}

              <section className="rounded-[1.7rem] border border-slate-200/80 bg-slate-50/80 p-5">
                <SectionTitle
                  icon={<Calendar className="h-5 w-5" />}
                  title="Quick Actions"
                  description="Presentational controls for shaping the final workflow design."
                />

                <div className="grid gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-[1.1rem] bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    <FileText className="h-4 w-4" />
                    Edit patient record
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
                    <Activity className="h-4 w-4" />
                    Generate report
                  </button>
                  <div className="rounded-[1.1rem] border border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Care contact
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {patient.phone}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
