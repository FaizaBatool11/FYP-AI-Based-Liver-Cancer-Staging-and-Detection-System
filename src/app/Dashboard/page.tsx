"use client";

import Topbar from "../components/Topbar";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import DashboardExplainability from "../components/dashboard/DashboardExplainability";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 overflow-auto">
        <Topbar />

        <main className="space-y-6 p-4 md:p-6">
          <DashboardHero />
          <DashboardStats />
          <DashboardCharts />
          <DashboardExplainability />
        </main>
      </div>
    </div>
  );
}
