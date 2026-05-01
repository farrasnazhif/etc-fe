"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import DropzoneInput from "@/components/ui/dropzone-input";
import {
  FileText,
  ChevronUp,
  ChevronDown,
  Bookmark,
  UserPlusIcon,
} from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRecruitmentDetail } from "@/hooks/use-detail-feed";
import Link from "next/link";

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

  const params = useParams();
  const recruitmentId = params?.id as string;

  const { data, isLoading, error } = useRecruitmentDetail(recruitmentId);

  if (isLoading) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
          <p className="text-slate-500">Memuat detail rekrutmen...</p>
        </main>
      </DashboardLayout>
    );
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

  return (
    <DashboardLayout withNavbar withSidebar>
      <main
        data-theme="light"
        className="min-h-screen bg-slate-50 text-slate-900"
      >
        <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
          {/* hero */}
          <section className="relative overflow-hidden rounded-md border border-slate-200 bg-white shadow-xs">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600"
              alt={data.kegiatan}
              width={1600}
              height={700}
              className="h-[220px] w-full object-cover sm:h-[260px] md:h-[360px]"
              unoptimized
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/70 to-blue-900/10" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:left-0 md:p-10 text-white">
              <h1 className="max-w-3xl text-lg leading-tight font-bold sm:text-2xl md:text-4xl capitalize">
                {data.kegiatan}
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-white/90 md:text-base">
                Posisi dibutuhkan: {data.role}
              </p>

              {/* <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/85 sm:text-sm">
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                  <MapPin className="size-4" />
                  Indonesia
                </span>
              </div> */}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {/* left */}
            <div className="space-y-6 lg:col-span-2">
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setBookmarked(!bookmarked)}
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

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Role
                      </p>

                      <p className="mt-2 font-semibold capitalize text-slate-900">
                        {data.role}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Fee
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {formatCurrency(data.fee)}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
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

                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Tanggal Mulai
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {formatDate(data.tanggal_mulai)}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
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
            <aside className="space-y-6">
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
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <UserPlusIcon className="size-4.5 text-blue-800" />
                  Gabung ke Rekrutmen Ini
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Tertarik dengan posisi ini? Kirim aplikasi Anda sekarang.
                </p>

                <Button
                  type="button"
                  onClick={() => setShowApplyForm(!showApplyForm)}
                  className="mt-4 w-full"
                >
                  {showApplyForm ? (
                    <div className="flex justify-center items-center gap-2">
                      Tutup Formulir
                      <ChevronUp className="size-4" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      Isi Formulir
                      <ChevronDown className="size-4" />
                    </div>
                  )}
                </Button>

                <div
                  className={`overflow-hidden transition-all duration-700 ${
                    showApplyForm
                      ? "mt-5 max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <Select
                      label="Role"
                      placeholder="Pilih role"
                      options={[
                        {
                          label: data.role,
                          value: data.role,
                        },
                      ]}
                    />

                    <Input
                      label="Motivasi Singkat"
                      placeholder="Jelaskan alasan Anda..."
                    />

                    <Input label="Link CV / Portfolio" placeholder="https://" />

                    <DropzoneInput
                      label="Upload CV / Portfolio"
                      helperText="PDF maksimal 10MB"
                    />

                    <Button className="w-full">Submit Application</Button>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}
