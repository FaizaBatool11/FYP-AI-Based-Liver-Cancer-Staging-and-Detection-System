"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Section = {
  href: string;
  label: string;
  icon: React.ElementType;
  group: "core" | "account";
};

type DoctorLayoutProps = {
  children?: ReactNode;
};

const sections: Section[] = [
  { href: "/Dashboard", label: "Overview", icon: HomeIcon, group: "core" },
  { href: "/Dashboard/Patients", label: "Patients", icon: UserIcon, group: "core" },
  {
    href: "/Dashboard/History",
    label: "Medical History",
    icon: BookOpenIcon,
    group: "core",
  },
  {
    href: "/Dashboard/labs",
    label: "Lab Results",
    icon: ChartBarIcon,
    group: "core",
  },
  {
    href: "/Dashboard/logout",
    label: "Logout",
    icon: ArrowRightOnRectangleIcon,
    group: "account",
  },
];

function SidebarContent({
  collapsed,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const groupedSections = useMemo(
    () => ({
      core: sections.filter((section) => section.group === "core"),
      account: sections.filter((section) => section.group === "account"),
    }),
    []
  );

  const renderSectionGroup = (
    title: string,
    items: Section[],
    muted?: boolean
  ) => (
    <div className="space-y-3">
      {!collapsed ? (
        <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
          {title}
        </p>
      ) : null}

      <div className="space-y-1.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              onClick={onNavigate}
              className={[
                "group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all",
                active
                  ? "bg-slate-950 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
                  : muted
                    ? "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                collapsed ? "justify-center" : "",
              ].join(" ")}
            >
              <Icon
                className={[
                  "h-5 w-5 flex-shrink-0",
                  active ? "text-white" : "",
                ].join(" ")}
              />
              {!collapsed ? (
                <span className="text-sm font-semibold">{label}</span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6">
        {renderSectionGroup("Core", groupedSections.core)}
        {renderSectionGroup("Account", groupedSections.account, true)}
        {!collapsed ? (
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Active user
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Dr. Kim
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
                <UserIcon className="h-5 w-5 text-indigo-600" />
              </div>
            </div>

            <div className="mt-4 rounded-[1.2rem] border border-slate-200 bg-slate-50/80 px-3 py-3">
              <p className="text-sm font-semibold text-slate-800">
                Radiologist
              </p>
              <p className="mt-1 text-xs font-medium leading-6 text-slate-500">
                Monitoring staging reviews and explainability summaries.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const pathname = usePathname();
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#eef6ff_0%,#f8fbff_40%,#f2f5f9_100%)]">
      <div className="flex min-h-screen">
        <aside className="hidden border-r border-slate-200/60 bg-white/42 px-4 py-4 backdrop-blur md:block">
          <div
            className={[
              "flex h-full flex-col transition-all duration-300",
              desktopNavOpen ? "w-72" : "w-20",
            ].join(" ")}
          >
            <div className="mb-4">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                <div
                  className={[
                    "flex items-center gap-3",
                    desktopNavOpen ? "justify-between" : "justify-center",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-200 shadow-[0_12px_35px_rgba(56,189,248,0.25)]">
                      <span className="text-lg font-bold text-slate-950">L</span>
                    </div>
                    {desktopNavOpen ? (
                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Dashboard
                        </p>
                        <p className="text-lg font-bold text-slate-950">
                          LiverCare AI
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <button
                    onClick={() => setDesktopNavOpen((value) => !value)}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    {desktopNavOpen ? (
                      <XMarkIcon className="h-5 w-5" />
                    ) : (
                      <Bars3Icon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {desktopNavOpen ? (
                  <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-slate-50/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Workspace
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      Clinical staging dashboard in static design mode
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex-1">
              <SidebarContent collapsed={!desktopNavOpen} pathname={pathname} />
            </div>
          </div>
        </aside>

        {mobileNavOpen ? (
          <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm md:hidden">
            <div className="flex h-full">
              <div className="w-[20rem] max-w-[88vw] bg-white px-4 py-4 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                <div className="mb-4 flex justify-end">
                  <button
                    onClick={() => setMobileNavOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <SidebarContent
                  collapsed={false}
                  pathname={pathname}
                  onNavigate={() => setMobileNavOpen(false)}
                />
              </div>

              <button
                className="flex-1"
                aria-label="Close navigation drawer"
                onClick={() => setMobileNavOpen(false)}
              />
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-slate-200/70 bg-white/65 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-200">
                  <span className="text-base font-bold text-slate-950">L</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Dashboard
                  </p>
                  <p className="text-base font-bold text-slate-950">
                    LiverCare AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileNavOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-6">
            {children || (
              <div className="flex h-full flex-col items-center justify-center text-slate-600">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  Welcome, Doctor!
                </h2>
                <p>Select a section from the sidebar to get started.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}