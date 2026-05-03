"use client";

import { useState, useEffect } from "react";
import { Search, Users, ClipboardList, Sparkles, Loader2 } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Button from "@/components/ui/button";
import TypewriterSubtitle from "@/features/feed/typewriter-subtitle";
import CategoryFilter from "@/features/feed/category-filter";
import RoleSearch from "@/features/feed/role-search";
import RekrutmenCard from "@/components/ui/rekrutmen-card";
import { useRekrutmen, KegiatanType } from "@/hooks/useRekrutmen";
import { useAppliedRekrutmen } from "@/hooks/useAppliedRekrutmen";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Tab = "all" | "my";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [activeKegiatan, setActiveKegiatan] = useState<
    KegiatanType | undefined
  >(undefined);
  const [roleSearch, setRoleSearch] = useState("");
  const [debouncedRoleSearch, setDebouncedRoleSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRoleSearch(roleSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [roleSearch]);

  const handleKegiatanChange = (kegiatan: KegiatanType | undefined) => {
    setActiveKegiatan(kegiatan);
    if (kegiatan) setRoleSearch("");
    setPage(1);
  };

  const handleRoleChange = (role: string) => {
    setRoleSearch(role);
    if (role) setActiveKegiatan(undefined);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useRekrutmen(
    page,
    limit,
    activeKegiatan,
    debouncedRoleSearch || undefined,
  );
  const {
    data: appliedData,
    isLoading: isAppliedLoading,
    isError: isAppliedError,
    error: appliedError,
  } = useAppliedRekrutmen();

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="max-w-7xl mx-auto px-2 py-2 md:px-4">
        {/* ===== HEADER SECTION ===== */}
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          {/* Title & subtitle */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Discovery Dashboard
            </h1>
            <TypewriterSubtitle />
          </div>

          {/* Stat cards */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Active Recruitments */}
            <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-xs">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Rekrutmen Aktif
                </p>
                <p className="text-xl font-bold text-foreground">
                  {data?.total_items || 0}
                </p>
              </div>
            </div>

            {/* Pending Applications */}
            <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-xs">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                <ClipboardList className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Aplikasi Tertunda
                </p>
                <p className="text-xl font-bold text-foreground">0</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== MAIN LAYOUT: 3 columns ===== */}
        <div className="flex gap-6">
          {/* ---- LEFT SIDEBAR (desktop) ---- */}
          <aside className="hidden lg:flex flex-col gap-5 w-[250px] shrink-0">
            {activeTab === "all" && (
              <>
                <RoleSearch
                  roleSearch={roleSearch}
                  onRoleChange={handleRoleChange}
                  isDisabled={!!activeKegiatan}
                />
                <CategoryFilter
                  activeKegiatan={activeKegiatan}
                  onKegiatanChange={handleKegiatanChange}
                  isDisabled={!!roleSearch}
                />
              </>
            )}

            {/* CTA Card */}
            <div className="relative rounded-md bg-primary p-5 text-primary-foreground overflow-hidden shadow-lg">
              {/* Decorative circles */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary-foreground/10 pointer-events-none" />
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-primary-foreground/5 pointer-events-none" />

              <Sparkles className="h-5 w-5 mb-3 text-primary-foreground/70" />
              <h3 className="text-base font-bold mb-2">Butuh Mitra?</h3>
              <p className="text-xs text-primary-foreground/70 mb-4 leading-relaxed">
                Mulai rekrutmen Anda sendiri dan temukan kolaborator sempurna
                untuk proyek riset berikutnya.
              </p>
              <Link
                href="/buat-postingan"
                className="w-full block text-center rounded-md bg-primary-foreground text-primary px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/90 transition-colors cursor-pointer shadow-xs"
              >
                Mulai Rekrutmen
              </Link>
            </div>
          </aside>

          {/* ---- Mobile sidebar toggle ---- */}
          <div className="lg:hidden mb-4 fixed bottom-4 right-4 z-50">
            <Button
              variant="primary"
              className="bg-primary! rounded-full! h-12! w-12! p-0! shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile sidebar drawer */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div
                className="absolute inset-0 bg-foreground/40"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative z-50 w-[280px] bg-muted p-4 space-y-4 overflow-y-auto animate-in slide-in-from-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Filter</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setSidebarOpen(false)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer p-0 h-auto hover:bg-transparent"
                  >
                    ✕
                  </Button>
                </div>
                {activeTab === "all" ? (
                  <>
                    <CategoryFilter
                      activeKegiatan={activeKegiatan}
                      onKegiatanChange={handleKegiatanChange}
                      isDisabled={!!roleSearch}
                    />
                    <RoleSearch
                      roleSearch={roleSearch}
                      onRoleChange={handleRoleChange}
                      isDisabled={!!activeKegiatan}
                    />
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic mb-4">
                    Filter tidak tersedia untuk tab ini.
                  </p>
                )}

                {/* CTA Card mobile */}
                <div className="relative rounded-md bg-primary p-5 text-primary-foreground overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary-foreground/10 pointer-events-none" />
                  <Sparkles className="h-5 w-5 mb-3 text-primary-foreground/70" />
                  <h3 className="text-base font-bold mb-2">Butuh Mitra?</h3>
                  <p className="text-xs text-primary-foreground/70 mb-4 leading-relaxed">
                    Mulai rekrutmen Anda sendiri dan temukan kolaborator
                    sempurna untuk proyek riset berikutnya.
                  </p>
                  <Link
                    href="/tim-saya"
                    className="w-full block text-center rounded-md bg-primary-foreground text-primary px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/90 transition-colors cursor-pointer"
                  >
                    Mulai Rekrutmen
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ---- MAIN CONTENT (center + right) ---- */}
          <div className="flex-1 min-w-0">
            {/* Search bar + Tab switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              {/* Tabs */}
              <div className="flex items-center rounded-md border border-border bg-card p-1 shrink-0 shadow-xs">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer h-auto",
                    activeTab === "all"
                      ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent",
                  )}
                >
                  Semua Rekrutan
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("my")}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer h-auto",
                    activeTab === "my"
                      ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent",
                  )}
                >
                  Aplikasi Saya
                </Button>
              </div>
            </div>

            {/* Recruitment Content */}
            <div className="min-h-[400px]">
              {activeTab === "all" ? (
                <>
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                      <p>Memuat data rekrutmen...</p>
                    </div>
                  )}

                  {isError && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                      <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20 text-center">
                        <p className="font-semibold mb-1">Gagal memuat data</p>
                        <p className="text-sm">
                          {error instanceof Error
                            ? error.message
                            : "Terjadi kesalahan yang tidak diketahui"}
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => window.location.reload()}
                        >
                          Coba Lagi
                        </Button>
                      </div>
                    </div>
                  )}

                  {!isLoading &&
                    !isError &&
                    data?.data &&
                    data.data.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground bg-card rounded-md border border-border">
                        <ClipboardList className="w-12 h-12 mb-4 text-muted-foreground/50" />
                        <p className="font-medium text-foreground">
                          Tidak ada rekrutmen
                        </p>
                        <p className="text-sm">
                          Belum ada data rekrutmen yang tersedia saat ini.
                        </p>
                      </div>
                    )}

                  {!isLoading &&
                    !isError &&
                    data?.data &&
                    data.data.length > 0 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {data.data.map((recruitment) => (
                            <RekrutmenCard
                              key={recruitment.rekrutmen_id}
                              item={recruitment}
                            />
                          ))}
                        </div>

                        {/* Pagination controls */}
                        {data.total_pages > 1 && (
                          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border">
                            <Button
                              variant="outline"
                              onClick={() => setPage((p) => Math.max(1, p - 1))}
                              disabled={page === 1}
                              className="cursor-pointer"
                            >
                              Sebelumnya
                            </Button>
                            <span className="text-sm font-medium text-muted-foreground">
                              Halaman {data.page} dari {data.total_pages}
                            </span>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setPage((p) =>
                                  Math.min(data.total_pages, p + 1),
                                )
                              }
                              disabled={page === data.total_pages}
                              className="cursor-pointer"
                            >
                              Selanjutnya
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                </>
              ) : (
                <>
                  {isAppliedLoading && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                      <p>Memuat data aplikasi...</p>
                    </div>
                  )}

                  {isAppliedError && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                      <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20 text-center">
                        <p className="font-semibold mb-1">Gagal memuat data</p>
                        <p className="text-sm">
                          {appliedError instanceof Error
                            ? appliedError.message
                            : "Terjadi kesalahan yang tidak diketahui"}
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => window.location.reload()}
                        >
                          Coba Lagi
                        </Button>
                      </div>
                    </div>
                  )}

                  {!isAppliedLoading &&
                    !isAppliedError &&
                    (!appliedData || appliedData.length === 0) && (
                      <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground bg-card rounded-md border border-border">
                        <ClipboardList className="w-12 h-12 mb-4 text-muted-foreground/50" />
                        <p className="font-medium text-foreground">
                          Tidak ada aplikasi
                        </p>
                        <p className="text-sm">
                          Kamu belum mendaftar ke rekrutmen apapun
                        </p>
                      </div>
                    )}

                  {!isAppliedLoading &&
                    !isAppliedError &&
                    appliedData &&
                    appliedData.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {appliedData.map((applied) => (
                          <RekrutmenCard
                            key={applied.pendaftar_id}
                            item={applied.rekrutmen}
                            status={applied.status}
                          />
                        ))}
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
