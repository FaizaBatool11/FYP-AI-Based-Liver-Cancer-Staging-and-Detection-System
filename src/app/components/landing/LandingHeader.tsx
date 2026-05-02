"use client";

import Link from "next/link";
import { Menu, Stethoscope, UserRoundPlus, X } from "lucide-react";
import { navItems } from "./landingData";

type LandingHeaderProps = {
  mobileMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export default function LandingHeader({
  mobileMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-200 shadow-[0_12px_35px_rgba(56,189,248,0.35)]">
            <Stethoscope className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-200/75">
              Liver Cancer Staging
            </p>
            <p className="text-lg font-bold text-white">LiverCare AI</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/Login"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-sky-300/40 hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            href="/Signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:shadow-[0_14px_30px_rgba(56,189,248,0.35)]"
          >
            Sign Up
            <UserRoundPlus className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
          onClick={onToggleMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onCloseMenu}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Link
                href="/Login"
                onClick={onCloseMenu}
                className="rounded-2xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
              <Link
                href="/Signup"
                onClick={onCloseMenu}
                className="rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-3 text-center text-sm font-bold text-slate-950"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
