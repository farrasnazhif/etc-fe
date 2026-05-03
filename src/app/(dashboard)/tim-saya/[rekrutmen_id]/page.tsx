"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import RecruitmentStatusToggle from "@/features/tim-saya/recruitment-status-toggle";
import ActiveMembersCard from "@/features/tim-saya/active-members-card";
import ApplicantsCard from "@/features/tim-saya/applicants-card";
import TeamStatsCard from "@/features/tim-saya/team-stats-card";
import ProjectOverviewCard from "@/features/tim-saya/project-overview-card";
import UserPresenceCard from "@/features/tim-saya/user-presence-card";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  projectItems,
  onlineUsers,
  additionalOnlineCount,
  teamStats,
} from "@/_mock/team-data";

import { useRekrutmenDetail } from "@/hooks/useRekrutmenDetail";
import { useApplicants } from "@/hooks/useApplicants";
import { useAcceptRejectApplicant } from "@/hooks/useAcceptRejectApplicant";
import { useTimMembers } from "@/hooks/useTimMembers";

export default function TimSayaPage() {
  const params = useParams();
  const rekrutmenId = params.rekrutmen_id as string;

  const { data: rekrutmenDetail, isPending: isDetailLoading } = useRekrutmenDetail(rekrutmenId);
  const { data: applicantsData, isPending: isApplicantsLoading } = useApplicants(rekrutmenId);
  const { accept, reject, isAccepting, isRejecting, activePendaftarId } = useAcceptRejectApplicant(rekrutmenId);

  const timId = rekrutmenDetail?.tim_id;
  const { data: timMembers, isPending: isTimMembersLoading } = useTimMembers(timId);

  if (isDetailLoading) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Tim Saya</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-semibold text-primary">
                {rekrutmenDetail?.role ?? "Loading..."}
              </span>
            </nav>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Manajemen Tim
            </h1>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left Column — Main Content */}
          <div className="space-y-6">
            <ActiveMembersCard
              members={timMembers ?? []}
              isLoading={isTimMembersLoading}
            />
            <ApplicantsCard
              applicants={applicantsData?.pendaftar ?? []}
              isLoading={isApplicantsLoading}
              onAccept={accept}
              onReject={reject}
              isAccepting={isAccepting}
              isRejecting={isRejecting}
              activePendaftarId={activePendaftarId}
            />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
