"use client";

import { FormEvent, useState } from "react";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";
import PlatformSection from "./PlatformSection";
import TrustSection from "./TrustSection";
import WorkflowSection from "./WorkflowSection";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dff4ff_0%,#f7fbff_34%,#f4f7fb_68%,#eef2f7_100%)] text-slate-900">
      <LandingHeader
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen((open) => !open)}
        onCloseMenu={closeMenu}
      />

      <main>
        <HeroSection />
        <PlatformSection />
        <WorkflowSection />
        <TrustSection />
        <ContactSection onSubmit={handleContactSubmit} />
      </main>

      <LandingFooter />
    </div>
  );
}
