"use client";

import {
  ChevronDown,
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

type PatientsFiltersProps = {
  search: string;
  statusFilter: string;
  genderFilter: string;
  showFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onToggleFilters: () => void;
  onExport: () => void;
  onAddPatient: () => void;
};

function FilterPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600">
      <span className="uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <span className="text-slate-700">{value}</span>
    </div>
  );
}

export default function PatientsFilters({
  search,
  statusFilter,
  genderFilter,
  showFilters,
  onSearchChange,
  onStatusChange,
  onGenderChange,
  onToggleFilters,
  onExport,
  onAddPatient,
}: PatientsFiltersProps) {
  const hasActiveSearch = search.trim().length > 0;
  const hasActiveFilters =
    hasActiveSearch || statusFilter !== "All" || genderFilter !== "All";

  return (
    <section className="mb-6 overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/88 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="border-b border-slate-200/80 px-5 py-5 md:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Patient filters
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
              Search, narrow, and export records quickly
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              Use the quick search first, then expand the filters only when you
              need a more focused clinical slice of the patient list.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onExport}
              className="inline-flex items-center gap-2 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
            >
              <Download className="h-4 w-4" />
              Export records
            </button>

            <button
              onClick={onAddPatient}
              className="inline-flex items-center gap-2 rounded-[1.1rem] bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Add patient
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 md:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative min-w-0">
            <input
              type="text"
              placeholder="Search by patient name, email, phone, or record details..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-14 w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
            />
            <Search
              className={[
                "absolute left-4 top-4 h-5 w-5 transition-colors duration-200",
                hasActiveSearch ? "text-sky-600" : "text-slate-400",
              ].join(" ")}
            />
          </div>

          <button
            onClick={onToggleFilters}
            className="inline-flex items-center justify-center gap-2 rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide filters" : "Advanced filters"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FilterPill label="Search" value={hasActiveSearch ? "Active" : "All records"} />
          <FilterPill label="Status" value={statusFilter} />
          <FilterPill label="Gender" value={genderFilter} />
          {hasActiveFilters ? (
            <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
              Focused view enabled
            </div>
          ) : (
            <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              Broad overview mode
            </div>
          )}
        </div>

        {showFilters ? (
          <div className="mt-5 grid gap-4 border-t border-slate-200/80 pt-5 md:grid-cols-2">
            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Status filter
              </label>
              <select
                value={statusFilter}
                onChange={(event) => onStatusChange(event.target.value)}
                className="mt-3 h-12 w-full rounded-[1rem] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-400"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Under Treatment">Under Treatment</option>
                <option value="Critical">Critical</option>
                <option value="Recovered">Recovered</option>
              </select>
            </div>

            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Gender filter
              </label>
              <select
                value={genderFilter}
                onChange={(event) => onGenderChange(event.target.value)}
                className="mt-3 h-12 w-full rounded-[1rem] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-400"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
