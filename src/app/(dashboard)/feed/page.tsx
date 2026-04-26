"use client";

import { useState } from "react";
import { Search, Users, ClipboardList, Sparkles } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import TypewriterSubtitle from "@/components/feed/typewriter-subtitle";
import CategoryFilter from "@/components/feed/category-filter";
import SkillTags from "@/components/feed/skill-tags";
import RecruitmentCard from "@/components/feed/recruitment-card";
import FeaturedRecruitmentCard from "@/components/feed/featured-recruitment-card";
import {
  mockRecruitments,
  mockFeaturedRecruitment,
  mockStats,
} from "@/_mock/feed-data";
import { cn } from "@/lib/utils";

type Tab = "all" | "my";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          {/* Title & subtitle */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-violet-600 tracking-tight">
              Discovery Dashboard
            </h1>
            <TypewriterSubtitle />
          </div>

          {/* Stat cards */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Active Recruitments */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-50">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Rekrutmen Aktif
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {mockStats.activeRecruitments}
                </p>
              </div>
            </div>

            {/* Pending Applications */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50">
                <ClipboardList className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Aplikasi Tertunda
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {mockStats.pendingApplications}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== MAIN LAYOUT: 3 columns ===== */}
        <div className="flex gap-6">
          {/* ---- LEFT SIDEBAR (desktop) ---- */}
          <aside className="hidden lg:flex flex-col gap-5 w-[250px] shrink-0">
            <CategoryFilter />
            <SkillTags />

            {/* CTA Card */}
            <div className="relative rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white overflow-hidden shadow-lg">
              {/* Decorative circles */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white/5 pointer-events-none" />

              <Sparkles className="h-5 w-5 mb-3 text-violet-200" />
              <h3 className="text-base font-bold mb-2">Butuh Mitra?</h3>
              <p className="text-xs text-violet-200 mb-4 leading-relaxed">
                Mulai rekrutmen Anda sendiri dan temukan kolaborator sempurna
                untuk proyek riset berikutnya.
              </p>
              <button className="w-full rounded-lg bg-white text-violet-700 px-4 py-2 text-sm font-semibold hover:bg-violet-50 transition-colors cursor-pointer shadow-sm">
                Mulai Rekrutmen
              </button>
            </div>
          </aside>

          {/* ---- Mobile sidebar toggle ---- */}
          <div className="lg:hidden mb-4 fixed bottom-4 right-4 z-50">
            <Button
              variant="primary"
              className="!bg-violet-600 !rounded-full !h-12 !w-12 !p-0 shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile sidebar drawer */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative z-50 w-[280px] bg-gray-50 p-4 space-y-4 overflow-y-auto animate-in slide-in-from-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">Filter</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <CategoryFilter />
                <SkillTags />

                {/* CTA Card mobile */}
                <div className="relative rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10 pointer-events-none" />
                  <Sparkles className="h-5 w-5 mb-3 text-violet-200" />
                  <h3 className="text-base font-bold mb-2">Butuh Mitra?</h3>
                  <p className="text-xs text-violet-200 mb-4 leading-relaxed">
                    Mulai rekrutmen Anda sendiri dan temukan kolaborator
                    sempurna untuk proyek riset berikutnya.
                  </p>
                  <button className="w-full rounded-lg bg-white text-violet-700 px-4 py-2 text-sm font-semibold hover:bg-violet-50 transition-colors cursor-pointer">
                    Mulai Rekrutmen
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---- MAIN CONTENT (center + right) ---- */}
          <div className="flex-1 min-w-0">
            {/* Search bar + Tab switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              {/* Search */}
              <div className="flex-1 w-full">
                <Input
                  placeholder="Cari proyek atau nama tim..."
                  leftIcon={Search}
                  className="!max-w-full !rounded-xl !bg-white"
                />
              </div>

              {/* Tabs */}
              <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shrink-0 shadow-sm">
                <button
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    activeTab === "all"
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  Semua Rekrutan
                </button>
                <button
                  onClick={() => setActiveTab("my")}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    activeTab === "my"
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  Aplikasi Saya
                </button>
              </div>
            </div>

            {/* Recruitment cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mockRecruitments.map((recruitment) => (
                <RecruitmentCard key={recruitment.id} data={recruitment} />
              ))}
            </div>

            {/* Featured recruitment */}
            <FeaturedRecruitmentCard data={mockFeaturedRecruitment} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
