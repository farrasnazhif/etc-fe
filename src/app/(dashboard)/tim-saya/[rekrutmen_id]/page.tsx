"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import ActiveMembersCard from "@/features/tim-saya/active-members-card";
import ApplicantsCard from "@/features/tim-saya/applicants-card";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp, FileText, Loader2 } from "lucide-react";

import { useRekrutmenDetail } from "@/hooks/useRekrutmenDetail";
import { useApplicants } from "@/hooks/useApplicants";
import { useAcceptRejectApplicant } from "@/hooks/useAcceptRejectApplicant";
import { useTimMembers } from "@/hooks/useTimMembers";
import { useAuth } from "@/hooks/use-auth";

import { useState } from "react";

import Button from "@/components/ui/button";
import EditRekrutmenModal from "@/features/tim-saya/edit-rekrutmen-modal";

import { useUpdateDeleteRekrutmen } from "@/hooks/useUpdateDeleteRekrutmen";
import { useToast } from "@/components/ui/toaster";

import ConfirmDialog from "@/components/ui/confirm-dialog";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Image from "next/image";
import Link from "next/link";

export default function TimSayaPage() {
  const params = useParams();
  const rekrutmenId = params.rekrutmen_id as string;
  const [showRecruitmentDetail, setShowRecruitmentDetail] = useState(false);

  const { user } = useAuth();

  const { data: rekrutmenDetail, isPending: isDetailLoading } =
    useRekrutmenDetail(rekrutmenId);

  const { data: applicantsData, isPending: isApplicantsLoading } =
    useApplicants(rekrutmenId);

  const { accept, reject, isAccepting, isRejecting, activePendaftarId } =
    useAcceptRejectApplicant(rekrutmenId, rekrutmenDetail?.tim_id);

  const timId = rekrutmenDetail?.tim_id;

  const { data: timMembers, isPending: isTimMembersLoading } =
    useTimMembers(timId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { deletee, isDeleting } = useUpdateDeleteRekrutmen(rekrutmenId);

  const { addToast } = useToast();

  // access check
  const isMaker = user?.user_id === rekrutmenDetail?.user_id;

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function calculateDuration(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diff =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    return `${diff} hari`;
  }

  if (isDetailLoading || !rekrutmenDetail) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  function getContactLink(contact: string) {
    const trimmedContact = contact.trim();

    // cek apakah diawali angka (wa)
    const isPhoneNumber = /^[0-9]/.test(trimmedContact);

    if (isPhoneNumber) {
      const normalizedPhone = trimmedContact.replace(/^0/, "62");

      return {
        href: `https://wa.me/${normalizedPhone}`,
        label: trimmedContact,
        type: "whatsapp",
      };
    }

    // fallback email
    return {
      href: `mailto:${trimmedContact}`,
      label: trimmedContact,
      type: "email",
    };
  }

  const contactInfo = getContactLink(rekrutmenDetail.contact_person);

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
        <Breadcrumbs
          customLabels={{
            [rekrutmenId]: rekrutmenDetail?.kegiatan
              ? rekrutmenDetail.kegiatan.charAt(0).toUpperCase() +
                rekrutmenDetail.kegiatan.slice(1)
              : "Detail Rekrutmen",
          }}
        />

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Manajemen Tim
            </h1>

            <p className="text-sm text-muted-foreground">
              {isMaker
                ? "Kelola anggota aktif dan seleksi pelamar baru."
                : "Lihat perkembangan tim dan anggota aktif."}
            </p>
          </div>

          {/* only maker can edit/delete */}
          {isMaker && (
            <div data-theme="light" className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
                disabled={isDeleting}
              >
                Edit
              </Button>

              <Button
                variant="error"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Hapus
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* active members always visible */}
            <ActiveMembersCard
              members={timMembers ?? []}
              applicants={applicantsData?.pendaftar ?? []}
              isLoading={!!timId && isTimMembersLoading}
            />

            {/* applicants only visible for maker */}
            {isMaker && (
              <ApplicantsCard
                applicants={applicantsData?.pendaftar ?? []}
                isLoading={isApplicantsLoading}
                onAccept={accept}
                onReject={reject}
                isAccepting={isAccepting}
                isRejecting={isRejecting}
                activePendaftarId={activePendaftarId}
              />
            )}
          </div>

          <div className="space-y-6 lg:col-span-1">
            {rekrutmenDetail && (
              <section className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
                {/* header */}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {rekrutmenDetail.kegiatan}
                    </span>

                    <h2 className="mt-3 break-words text-lg font-bold leading-snug text-slate-900">
                      {rekrutmenDetail.role}
                    </h2>
                  </div>
                </div>

                {/* toggle button */}

                <div data-theme="light">
                  <Button
                    type="button"
                    onClick={() =>
                      setShowRecruitmentDetail(!showRecruitmentDetail)
                    }
                    className="mt-4 w-full"
                    variant="primary"
                  >
                    {showRecruitmentDetail ? (
                      <div className="flex items-center justify-center gap-2">
                        Tutup Detail
                        <ChevronUp className="size-4" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Lihat Detail Rekrutmen
                        <ChevronDown className="size-4" />
                      </div>
                    )}
                  </Button>
                </div>

                {/* collapsible detail */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    showRecruitmentDetail
                      ? "mt-5 max-h-[1200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-slate-100 pt-5">
                    <p className="mb-5 text-sm leading-relaxed text-slate-600 break-words">
                      {rekrutmenDetail.Kriteria ||
                        "Tidak ada deskripsi rekrutmen."}
                    </p>

                    <div className="space-y-3">
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Fee
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-slate-900">
                          {formatCurrency(rekrutmenDetail.fee)}
                        </p>
                      </div>

                      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Durasi
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-slate-900">
                          {calculateDuration(
                            rekrutmenDetail.tanggal_mulai,

                            rekrutmenDetail.tanggal_selesai,
                          )}
                        </p>
                      </div>

                      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Tanggal Mulai
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {formatDate(rekrutmenDetail.tanggal_mulai)}
                        </p>
                      </div>

                      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Deadline
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {formatDate(rekrutmenDetail.tanggal_selesai)}
                        </p>
                      </div>

                      <Link href={contactInfo.href} target="_blank">
                        <div className="rounded-md border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Contact Person
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            {contactInfo.type === "whatsapp" ? (
                              <Image
                                width={13}
                                height={13}
                                alt="whatsapp icon"
                                src="/images/wa.svg"
                              />
                            ) : (
                              <FileText className="size-4 text-blue-800" />
                            )}

                            <p className=" font-semibold text-slate-900 truncate">
                              {rekrutmenDetail.contact_person}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* only maker can edit */}
      {isMaker && rekrutmenDetail && (
        <EditRekrutmenModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          rekrutmenId={rekrutmenId}
          defaultValues={{
            kegiatan: rekrutmenDetail.kegiatan as "projek" | "lomba" | "riset",
            role: rekrutmenDetail.role,
            Kriteria: rekrutmenDetail.Kriteria,
            fee: rekrutmenDetail.fee,
            tanggal_mulai: rekrutmenDetail.tanggal_mulai,
            tanggal_selesai: rekrutmenDetail.tanggal_selesai,
            contact_person: rekrutmenDetail.contact_person,
          }}
        />
      )}

      {/* only maker can delete */}
      {isMaker && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="Hapus Rekrutmen"
          description="Yakin ingin menghapus rekrutmen ini? Tindakan ini tidak dapat dibatalkan."
          confirmLabel="Ya, Hapus"
          cancelLabel="Batal"
          isLoading={isDeleting}
          onConfirm={() => {
            deletee(undefined, {
              onSuccess: () => {
                addToast("Rekrutmen berhasil dihapus", "success");

                setIsDeleteDialogOpen(false);
              },

              onError: () => addToast("Gagal menghapus rekrutmen", "error"),
            });
          }}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </DashboardLayout>
  );
}
