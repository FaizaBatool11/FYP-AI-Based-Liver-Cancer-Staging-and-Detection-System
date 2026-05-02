"use client";

import {
  AlertCircle,
  Calendar,
  Eye,
  FileHeart,
  Trash2,
  Users,
} from "lucide-react";
import { Patient } from "./patientsData";
import { getStatusColor } from "./patientsUtils";

type PatientsTableProps = {
  patients: Patient[];
  onViewPatient: (patient: Patient) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export default function PatientsTable({
  patients,
  onViewPatient,
}: PatientsTableProps) {
  return (
    <section className="overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/90 shadow-[0_22px_65px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="border-b border-slate-200/80 px-5 py-5 md:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Users className="h-3.5 w-3.5" />
              Patient records
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
              Active patient list
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              Browse patient records, review current diagnosis context, and open
              a single case without leaving the workspace flow.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Visible records
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                {patients.length}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Review mode
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Static dashboard preview
              </p>
            </div>
          </div>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-slate-100 text-slate-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No patients found
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Try adjusting your search terms or filters to widen the result set.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden xl:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] text-left">
                <thead className="bg-slate-50/90">
                  <tr className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Profile</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Diagnosis</th>
                    <th className="px-6 py-4">Last Visit</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                            <span className="text-sm font-bold">
                              {patient.name
                                .split(" ")
                                .slice(0, 2)
                                .map((part) => part[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {patient.name}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                              Record #{patient.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">
                        <p className="text-slate-800">{patient.email}</p>
                        <p className="mt-1 text-slate-500">{patient.phone}</p>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">
                        <p className="text-slate-800">
                          {patient.age} years / {patient.gender}
                        </p>
                        <p className="mt-1 text-slate-500">
                          Added {formatDate(patient.dateAdded)}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusColor(
                            patient.status
                          )}`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <FileHeart className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {patient.diagnosis || "Pending review"}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                              {patient.stage || "Stage not assigned"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {formatDate(patient.lastVisit)}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onViewPatient(patient)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 transition hover:bg-sky-100"
                            title="View Details"
                          >
                            <Eye className="h-4.5 w-4.5" />
                          </button>
                          <button
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 p-5 xl:hidden md:p-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                      <span className="text-sm font-bold">
                        {patient.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {patient.name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Record #{patient.id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {patient.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Contact
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {patient.email}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {patient.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Profile
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {patient.age} years / {patient.gender}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Added {formatDate(patient.dateAdded)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Diagnosis
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {patient.diagnosis || "Pending review"}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {patient.stage || "Stage not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Last visit
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {formatDate(patient.lastVisit)}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => onViewPatient(patient)}
                    className="inline-flex items-center gap-2 rounded-[1rem] border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
                  >
                    <Eye className="h-4 w-4" />
                    View details
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
