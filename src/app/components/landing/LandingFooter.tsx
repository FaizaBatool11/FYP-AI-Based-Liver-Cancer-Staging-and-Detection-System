import { navItems } from "./landingData";

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 px-6 py-10 backdrop-blur lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-slate-950">LiverCare AI</p>
          <p className="mt-1 font-medium">
            AI-based liver cancer detection and staging system with a cleaner
            medical product presentation.
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-semibold transition hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
