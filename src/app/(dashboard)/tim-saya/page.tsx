"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import { useMyRekrutmen } from "@/hooks/useMyRekrutmen";
import { useAuth } from "@/hooks/use-auth";
import { useGetAppliedRecruitments } from "@/hooks/use-recruitment";

import Link from "next/link";

import { Loader2, Clock3, CheckCircle2, XCircle } from "lucide-react";

import Button from "@/components/ui/button";
import RekrutmenCard from "@/components/ui/rekrutmen-card";
import Select from "@/components/ui/select";

type ViewMode = "created" | "applied";
type AppliedFilter = "all" | "pending" | "accepted" | "rejected";

export default function TimSayaListPage() {
  const { isAuthenticated } = useAuth();

  const { data: rekrutmenList, isPending, isError } = useMyRekrutmen();

  const {
    data: appliedRecruitments,
    isPending: isAppliedPending,
    isError: isAppliedError,
  } = useGetAppliedRecruitments();

  const [viewMode, setViewMode] = useState<ViewMode>("created");
  const [appliedFilter, setAppliedFilter] = useState<AppliedFilter>("all");

  function getStatusBadge(status: "pending" | "accepted" | "rejected") {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: <Clock3 className="size-3.5" />,
          className: "border-yellow-200 bg-yellow-50 text-yellow-700",
        };

      case "accepted":
        return {
          label: "Diterima",
          icon: <CheckCircle2 className="size-3.5" />,
          className: "border-green-200 bg-green-50 text-green-700",
        };

      case "rejected":
        return {
          label: "Ditolak",
          icon: <XCircle className="size-3.5" />,
          className: "border-red-200 bg-red-50 text-red-700",
        };

      default:
        return {
          label: status,
          icon: null,
          className: "border-slate-200 bg-slate-50 text-slate-700",
        };
    }
  }

  const filteredAppliedRecruitments = useMemo(() => {
    if (!appliedRecruitments) return [];

    if (appliedFilter === "all") {
      return appliedRecruitments;
    }

    return appliedRecruitments.filter(
      (application) => application.status === appliedFilter,
    );
  }, [appliedRecruitments, appliedFilter]);

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="mx-auto max-w-7xl space-y-8 px-2 py-2 md:px-4">
        {/* header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tim Saya
          </h1>

          <p className="text-sm text-muted-foreground">
            Kelola tim yang kamu buat atau pantau tim yang pernah kamu lamar.
          </p>
        </div>

        {/* not logged in */}
        {!isAuthenticated && (
          <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Kamu belum login
            </h3>

            <p className="mb-6 text-muted-foreground">
              Login terlebih dahulu untuk melihat dan mengelola aktivitas tim
              kamu.
            </p>

            <Link href="/login" data-theme="light">
              <Button>Login Sekarang</Button>
            </Link>
          </div>
        )}

        {/* authenticated */}
        {isAuthenticated && (
          <>
            {/* main filter */}
            <div className="flex w-full flex-col gap-3 rounded-md p-1 sm:flex-row sm:items-end sm:justify-between">
              <div data-theme="light" className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={viewMode === "created" ? "primary" : "ghost"}
                  onClick={() => setViewMode("created")}
                  className="rounded-md"
                >
                  Tim Yang Saya Buat
                </Button>

                <Button
                  size="sm"
                  variant={viewMode === "applied" ? "primary" : "ghost"}
                  onClick={() => setViewMode("applied")}
                  className="rounded-md"
                >
                  Tim Yang Saya Lamar
                </Button>
              </div>

              {viewMode === "applied" && (
                <div data-theme="light" className="w-full sm:w-64">
                  <Select
                    value={appliedFilter}
                    onChange={(e) =>
                      setAppliedFilter(
                        e.target.value as
                          | "all"
                          | "pending"
                          | "accepted"
                          | "rejected",
                      )
                    }
                    className="w-full"
                    options={[
                      {
                        label: "Semua Status",
                        value: "all",
                      },
                      {
                        label: "Pending",
                        value: "pending",
                      },
                      {
                        label: "Diterima",
                        value: "accepted",
                      },
                      {
                        label: "Ditolak",
                        value: "rejected",
                      },
                    ]}
                  />
                </div>
              )}
            </div>

            {/* created */}
            {viewMode === "created" && (
              <>
                {isPending && (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                {isError && (
                  <div className="py-20 text-center text-destructive">
                    <p>Terjadi kesalahan saat mengambil data rekrutmen.</p>
                  </div>
                )}

                {!isPending &&
                  !isError &&
                  (!rekrutmenList || rekrutmenList.length === 0) && (
                    <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
                      <h3 className="mb-2 text-lg font-medium text-primary">
                        Kamu belum membuat rekrutmen apapun
                      </h3>

                      <p className="mb-6 text-muted-foreground">
                        Mulai bangun tim kamu dengan membuat postingan rekrutmen
                        baru.
                      </p>

                      <Link href="/buat-postingan" data-theme="light">
                        <Button>Buat Rekrutmen</Button>
                      </Link>
                    </div>
                  )}

                {!isPending &&
                  !isError &&
                  rekrutmenList &&
                  rekrutmenList.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {rekrutmenList.map((item) => (
                        <RekrutmenCard
                          key={item.rekrutmen_id}
                          item={item}
                          href={`/tim-saya/${item.rekrutmen_id}`}
                        />
                      ))}
                    </div>
                  )}
              </>
            )}

            {/* applied */}
            {viewMode === "applied" && (
              <>
                {isAppliedPending && (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                {isAppliedError && (
                  <div className="py-12 text-center text-destructive">
                    <p>Terjadi kesalahan saat mengambil data lamaran.</p>
                  </div>
                )}

                {!isAppliedPending &&
                  !isAppliedError &&
                  filteredAppliedRecruitments.length === 0 && (
                    <div className="rounded-md border border-slate-200 bg-white py-16 text-center shadow-xs">
                      <h3 className="text-lg font-medium text-primary">
                        Tidak ada lamaran pada kategori ini
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Coba ubah filter status atau cari rekrutmen lain.
                      </p>

                      <Link href="/feed" data-theme="light">
                        <Button className="mt-6">Cari Rekrutmen</Button>
                      </Link>
                    </div>
                  )}

                {!isAppliedPending &&
                  !isAppliedError &&
                  filteredAppliedRecruitments.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredAppliedRecruitments.map((application) => {
                        const status = getStatusBadge(application.status);

                        return (
                          <div
                            key={application.pendaftar_id}
                            className="relative"
                          >
                            <div className="absolute right-3 top-3 z-20">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm ${status.className}`}
                              >
                                {status.icon}
                                {status.label}
                              </span>
                            </div>

                            <RekrutmenCard
                              item={application.rekrutmen}
                              href={`/tim-saya/${application.rekrutmen.rekrutmen_id}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
