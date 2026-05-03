// src/app/(dashboard)/tim-saya/[rekrutmenId]/applicants/[pendaftarId]/page.tsx

"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import { useParams } from "next/navigation";
import Link from "next/link";

import {
  User,
  FolderKanban,
  Star,
  CalendarDays,
  ExternalLink,
  BadgeCheck,
  Clock3,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { useApplicantDetail } from "@/hooks/use-detail-applicant";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getStatusConfig(status: "pending" | "approved" | "rejected") {
  switch (status) {
    case "approved":
      return {
        label: "Diterima",
        icon: <BadgeCheck className="size-4" />,
        className: "bg-green-50 text-green-700 border-green-200",
      };

    case "rejected":
      return {
        label: "Ditolak",
        icon: <XCircle className="size-4" />,
        className: "bg-red-50 text-red-700 border-red-200",
      };

    default:
      return {
        label: "Pending",
        icon: <Clock3 className="size-4" />,
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      };
  }
}

export default function ApplicantDetailPage() {
  const params = useParams();

  const rekrutmenId = params?.rekrutmen_id as string;
  const pendaftarId = params?.pendaftar_id as string;

  const { data, isLoading, error } = useApplicantDetail(
    rekrutmenId,
    pendaftarId,
  );

  if (isLoading) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-sm text-muted-foreground">
              Memuat detail pelamar...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-red-500">
            {error instanceof Error
              ? error.message
              : "Gagal memuat detail pelamar."}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const status = getStatusConfig(data.status);

  const averageRating =
    data.histories.length > 0
      ? (
          data.histories.reduce((acc, item) => acc + item.rating, 0) /
          data.histories.length
        ).toFixed(1)
      : "0.0";

  return (
    <DashboardLayout withNavbar withSidebar>
      <main className="px-2 py-2 md:px-4">
        <div className="mx-auto max-w-7xl space-y-6">
          <Breadcrumbs
            customLabels={{
              "tim-saya": "Tim Saya",
              [rekrutmenId]: rekrutmenId.slice(0, 8),
              applicants: "Pelamar",
              [pendaftarId]: data.nama_pendaftar,
            }}
          />

          {/* top profile */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* left */}
            <section className="lg:col-span-2 rounded-md border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col gap-6 md:flex-row">
                {/* avatar */}
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-black text-white">
                  {(data.nama_pendaftar?.charAt(0) || "U").toUpperCase()}
                </div>

                {/* info */}
                <div className="flex-1">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        {data.nama_pendaftar}
                      </h1>

                      <div className="mt-3">
                        <Badge
                          className={`inline-flex gap-2 border ${status.className}`}
                        >
                          {status.icon}
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="size-4" />
                      User ID: {data.user_id.slice(0, 8)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FolderKanban className="size-4" />
                      Rekrutmen ID: {data.rekrutmen_id.slice(0, 8)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* rating */}
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Total Rating Pelamar
                </h2>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-black text-primary">
                    {averageRating}
                  </span>

                  <span className="mb-1 text-base font-bold text-slate-400">
                    /5
                  </span>
                </div>

                <div className="mt-3 text-lg text-primary">
                  {"★".repeat(Math.round(Number(averageRating)))}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {data.histories.length} histori penilaian
                </p>
              </div>
            </section>
          </div>

          {/* lower section */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* motivation */}
            <aside className="space-y-4 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wider text-slate-600">
                    Motivasi Mendaftar
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {data.alasan_mendaftar}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wider text-slate-600">
                    Dokumen Pelamar
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <Link href={data.cv_url} target="_blank">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Lihat CV
                      <ExternalLink className="size-4" />
                    </Button>
                  </Link>

                  <Link href={data.portofolio_url} target="_blank">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Lihat Portofolio
                      <ExternalLink className="size-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </aside>

            {/* histories */}
            <section className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="size-5 text-primary" />
                    Histori Penilaian
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {data.histories.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      Belum ada histori penilaian.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {data.histories.map((history) => (
                        <div
                          key={history.id}
                          className="rounded-md border border-slate-200 p-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {history.reviewer_name}
                              </h3>

                              <p className="text-xs uppercase tracking-wide text-slate-500">
                                {history.tipe_tim}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                ⭐ {history.rating}/5
                              </Badge>
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed text-slate-700">
                            {history.deskripsi}
                          </p>

                          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <CalendarDays className="size-3.5" />
                            {formatDate(history.created_at)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
