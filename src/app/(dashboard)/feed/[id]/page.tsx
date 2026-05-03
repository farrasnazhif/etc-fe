"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
// import Select from "@/components/ui/select";
import {
  FileText,
  ChevronUp,
  ChevronDown,
  Bookmark,
  UserPlusIcon,
  Info,
} from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRecruitmentDetail } from "@/hooks/use-detail-feed";
import Link from "next/link";
import {
  useAddBookmarkRecruitment,
  useDeleteBookmarkRecruitment,
} from "@/hooks/use-bookmark";
import { useToast } from "@/components/ui/toaster";
import {
  useApplyRecruitment,
  useGetAppliedRecruitments,
} from "@/hooks/use-recruitment";
import TextArea from "@/components/ui/text-area";
import { useAuth } from "@/hooks/use-auth";
import Breadcrumbs from "@/components/ui/breadcrumbs";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function calculateDuration(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return `${diff} hari`;
}

export default function FeedDetailPage() {
  const [bookmarked, setBookmarked] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [alasanMendaftar, setAlasanMendaftar] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const { isAuthenticated, user } = useAuth();

  const isDosen = user?.role === "dosen";

  const applyRecruitmentMutation = useApplyRecruitment();

  const router = useRouter();
  const params = useParams();
  const recruitmentId = params?.id as string;

  const { data, isLoading, error } = useRecruitmentDetail(recruitmentId);
  const { data: appliedRecruitments, isLoading: isLoadingApplied } =
    useGetAppliedRecruitments();

  const alreadyApplied = appliedRecruitments?.some(
    (item) => item.rekrutmen.rekrutmen_id === recruitmentId,
  );

  const { addToast } = useToast();

  const addBookmarkMutation = useAddBookmarkRecruitment();
  const deleteBookmarkMutation = useDeleteBookmarkRecruitment();

  function handleBookmark() {
    if (!recruitmentId) {
      addToast("Recruitment tidak valid.", "error");
      return;
    }

    // direct frontend auth check
    if (!isAuthenticated) {
      addToast("Silakan login terlebih dahulu.", "error");
      router.push("/login");
      return;
    }

    function handleBookmarkError(error: Error) {
      const message = error.message.toLowerCase();

      // backend auth fail fallback (expired token / invalid token)
      if (
        message.includes("authorization") ||
        message.includes("unauthorized") ||
        message.includes("token") ||
        message.includes("login")
      ) {
        addToast("Sesi berakhir, silakan login kembali.", "error");
        router.push("/login");
        return;
      }

      addToast(error.message, "error");
    }

    if (bookmarked) {
      deleteBookmarkMutation.mutate(recruitmentId, {
        onSuccess: () => {
          setBookmarked(false);
          addToast("Bookmark dihapus!", "success");
        },
        onError: handleBookmarkError,
      });

      return;
    }

    addBookmarkMutation.mutate(recruitmentId, {
      onSuccess: () => {
        setBookmarked(true);
        addToast("Bookmark ditambahkan!", "success");
      },
      onError: handleBookmarkError,
    });
  }

  function handleApplyRecruitment() {
    if (!recruitmentId) return;

    if (!isAuthenticated) {
      addToast("Silakan login terlebih dahulu.", "error");
      router.push("/login");
      return;
    }

    if (!alasanMendaftar || !cvUrl || !portfolioUrl) {
      addToast("Semua field wajib diisi.", "error");
      return;
    }

    applyRecruitmentMutation.mutate(
      {
        recruitmentId,
        alasan_mendaftar: alasanMendaftar,
        cv_url: cvUrl,
        portofolio_url: portfolioUrl,
      },

      {
        onSuccess: () => {
          addToast("Berhasil mendaftar rekrutmen!", "success");
          setAlasanMendaftar("");
          setCvUrl("");
          setPortfolioUrl("");
          setShowApplyForm(false);
        },

        onError: (error) => {
          addToast(error.message, "error");
        },
      },
    );
  }

  if (isLoading || isLoadingApplied) {
    return <FeedDetailSkeleton recruitmentId={recruitmentId} />;
  }

  if (error || !data) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
          <p className="text-red-500">Gagal memuat data rekrutmen.</p>
        </main>
      </DashboardLayout>
    );
  }

  const isMaker = user?.user_id === data?.user_id;

  return (
    <DashboardLayout withNavbar withSidebar>
      <main className="min-h-screen text-slate-900">
        <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
          <Breadcrumbs
            customLabels={{
              feed: "Feed",
              [recruitmentId]: `${recruitmentId.slice(0, 8)}`,
            }}
          />

          {/* hero */}
          <section className="relative overflow-hidden rounded-md border border-slate-200  shadow-xs">
            {/* background image */}
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600"
              alt={data.kegiatan}
              width={1600}
              height={700}
              className="h-[220px] w-full object-cover sm:h-[260px] md:h-[360px]"
              unoptimized
            />

            {/* image darkening layer */}

            {/* decorative gradient layers */}

            {/* main overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/45 to-blue-950/10" />

            {/* top right branding */}
            {/* <div className="hidden md:absolute md:block top-2 right-2 z-20 text-right ">
              <div className="inline-block   px-4 py-3">
                <h1 className="text-2xl font-bold leading-none text-black drop-shadow-md">
                  ETC
                </h1>

                <p className="mt-3 text-sm font-semibold leading-snug text-blue-800/60 drop-shadow-sm sm:text-xl">
                  Langkah
                  <br />
                  untuk membangun
                  <br />
                  kolaborasimu.
                </p>
              </div>
            </div> */}

            {/* main content */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-[220px] flex-col justify-end p-4 sm:min-h-[260px] sm:p-5 md:min-h-[360px] md:p-10 text-white">
              <h1 className="max-w-3xl text-lg leading-tight font-bold sm:text-2xl md:text-4xl capitalize">
                {data.kegiatan}
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-white/90 md:text-base">
                Posisi dibutuhkan: {data.role}
              </p>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {/* left */}
            <div
              className={`space-y-6 lg:col-span-2 ${isDosen || (isMaker && "lg:col-span-3")}`}
            >
              <div className="space-y-6 lg:col-span-2">
                {/* overview */}
                <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <FileText className="size-4.5 text-blue-800" />
                        Ringkasan Rekrutmen
                      </h2>

                      <p className="mt-2 leading-relaxed text-slate-600 text-sm">
                        {data.Kriteria ||
                          "Belum ada kriteria khusus untuk posisi ini."}
                      </p>
                    </div>

                    {/* bookmark */}

                    <div data-theme="light">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBookmark}
                        className={`shrink-0 rounded-md md:rounded-full px-2.5 transition-all duration-200 ${
                          bookmarked
                            ? "bg-red-600 border-red-600 text-white hover:bg-red-700"
                            : "border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-600"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm md:hidden">
                            {bookmarked ? "Bookmarked" : "Add Bookmark"}
                          </span>

                          <Bookmark
                            className={`size-5 transition-all ${
                              bookmarked ? "fill-current" : ""
                            }`}
                          />
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md border border-slate-200 bg-transparent p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Role
                      </p>

                      <p className="mt-2 font-semibold capitalize text-slate-900">
                        {data.role}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-transparent p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Fee
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {formatCurrency(data.fee)}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-transparent p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Durasi
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {calculateDuration(
                          data.tanggal_mulai,
                          data.tanggal_selesai,
                        )}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-transparent p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Tanggal Mulai
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {formatDate(data.tanggal_mulai)}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-transparent p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Deadline
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {formatDate(data.tanggal_selesai)}
                      </p>
                    </div>

                    <Link
                      href={`https:/wa.me/62${data.contact_person.replace(/^0/, "")}`}
                      target="_blank"
                    >
                      <div className="rounded-md border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Contact Person
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Image
                            width={13}
                            height={13}
                            alt="whatsapp icon"
                            src="/images/wa.svg"
                          />

                          <p className=" font-semibold text-slate-900">
                            {data.contact_person}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            {!isDosen && !isMaker && (
              <aside data-theme="light" className="space-y-6">
                {/* role card */}
                {/* <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="size-5 text-blue-800" />
                  Role Dibutuhkan
                </h2>

                <div className="mt-4 rounded-md border border-blue-200 bg-blue-50/40 p-4">
                  <h3 className="font-semibold capitalize text-slate-900">
                    {data.role}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {data.Kriteria ||
                      "Silakan hubungi contact person untuk detail lebih lanjut."}
                  </p>
                </div>
              </div> */}

                {/* apply */}
                <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                  {alreadyApplied ? (
                    <>
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Info className="size-4.5 text-blue-800" />
                        Status Lamaran Anda
                      </h2>

                      <p className="mt-2 text-sm text-slate-600">
                        Anda sudah mengajukan lamaran untuk rekrutmen ini.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <UserPlusIcon className="size-4.5 text-blue-800" />
                        Gabung ke Rekrutmen Ini
                      </h2>

                      <p className="mt-2 text-sm text-slate-600">
                        Tertarik dengan posisi ini? Kirim aplikasi Anda
                        sekarang.
                      </p>
                    </>
                  )}

                  <Button
                    type="button"
                    onClick={() => {
                      if (alreadyApplied) {
                        router.push("/tim-saya");

                        return;
                      }

                      if (!isAuthenticated) {
                        addToast("Silakan login terlebih dahulu.", "error");

                        router.push("/login");

                        return;
                      }

                      setShowApplyForm(!showApplyForm);
                    }}
                    className={`mt-4 w-full ${
                      alreadyApplied ? "btn-primary  " : ""
                    }`}
                  >
                    {alreadyApplied ? (
                      <div className="flex items-center justify-center gap-2">
                        Check Status
                      </div>
                    ) : showApplyForm ? (
                      <div className="flex items-center justify-center gap-2">
                        Tutup Formulir
                        <ChevronUp className="size-4" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Isi Formulir
                        <ChevronDown className="size-4" />
                      </div>
                    )}
                  </Button>

                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      showApplyForm && !alreadyApplied
                        ? "mt-5 max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-4 border-t border-slate-100 pt-5">
                      {/* <Select
                      label="Role"
                      placeholder="Pilih role"
                      options={[
                        {
                          label: data.role,

                          value: data.role,
                        },
                      ]}
                    /> */}

                      <TextArea
                        label="Motivasi Mendaftar"
                        placeholder="Jelaskan alasan Anda..."
                        value={alasanMendaftar}
                        onChange={(e) => setAlasanMendaftar(e.target.value)}
                        required
                        className="w-full"
                      />

                      <Input
                        label="Link CV"
                        placeholder="https://drive.google.com/..."
                        value={cvUrl}
                        onChange={(e) => setCvUrl(e.target.value)}
                        required
                      />

                      <Input
                        label="Link Portfolio"
                        placeholder="https://drive.google.com/..."
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        required
                      />

                      <Button
                        className="w-full"
                        onClick={handleApplyRecruitment}
                        isLoading={applyRecruitmentMutation.isPending}
                        disabled={applyRecruitmentMutation.isPending}
                      >
                        Submit Application
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}

function FeedDetailSkeleton({ recruitmentId }: { recruitmentId: string }) {
  return (
    <DashboardLayout withNavbar withSidebar>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
          <Breadcrumbs
            customLabels={{
              feed: "Feed",
              [recruitmentId]: `${recruitmentId.slice(0, 8)}`,
            }}
          />

          {/* hero skeleton */}
          <section className="overflow-hidden rounded-md border border-slate-200 bg-white animate-pulse">
            <div className="h-[220px] w-full bg-slate-200 sm:h-[260px] md:h-[360px]" />
          </section>

          <section className="grid gap-6 lg:grid-cols-3 animate-pulse">
            {/* left */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-md border border-slate-200 bg-white p-6">
                {/* header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-6 w-48 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                  </div>

                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                </div>

                {/* stats grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-slate-200 bg-slate-50 p-4 space-y-3"
                    >
                      <div className="h-3 w-20 rounded bg-slate-200" />
                      <div className="h-5 w-24 rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* right */}
            <aside className="space-y-6 ">
              <div className="rounded-md border border-slate-200 bg-white p-6">
                <div className="space-y-3">
                  <div className="h-6 w-40 rounded bg-slate-200" />
                  <div className="h-8 w-full rounded bg-slate-200" />

                  <div className="h-12 w-full rounded bg-slate-200 mt-4" />
                </div>
                {/* 
                <div className="mt-4 h-12 w-full rounded bg-slate-200" />

                <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
                  <div className="h-12 w-full rounded bg-slate-200" />
                  <div className="h-12 w-full rounded bg-slate-200" />
                  <div className="h-12 w-full rounded bg-slate-200" />
                </div> */}
              </div>
            </aside>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}
