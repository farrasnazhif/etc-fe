"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import ActiveMembersCard from "@/features/tim-saya/active-members-card";
import ApplicantsCard from "@/features/tim-saya/applicants-card";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

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

export default function TimSayaPage() {
  const params = useParams();
  const rekrutmenId = params.rekrutmen_id as string;

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

  if (isDetailLoading) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
        <Breadcrumbs
          customLabels={{
            feed: "Feed",
            [rekrutmenId]: `${rekrutmenId.slice(0, 8)}`,
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* active members always visible */}
            <ActiveMembersCard
              members={timMembers ?? []}
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
