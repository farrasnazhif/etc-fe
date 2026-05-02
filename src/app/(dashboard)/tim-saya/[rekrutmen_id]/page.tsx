"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import RecruitmentStatusToggle from "@/features/tim-saya/recruitment-status-toggle";
import ActiveMembersCard from "@/features/tim-saya/active-members-card";
import ApplicantsCard from "@/features/tim-saya/applicants-card";
import TeamStatsCard from "@/features/tim-saya/team-stats-card";
import ProjectOverviewCard from "@/features/tim-saya/project-overview-card";
import UserPresenceCard from "@/features/tim-saya/user-presence-card";
import { useParams } from "next/navigation";
import {
  teamMembers,
  applicants,
  projectItems,
  onlineUsers,
  additionalOnlineCount,
  teamStats,
  typewriterTexts,
} from "@/_mock/team-data";

export default function TimSayaPage() {
  const params = useParams();
  const rekrutmenId = params.rekrutmen_id as string;

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
                {rekrutmenId || "Loading..."}
              </span>
            </nav>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Manajemen Tim
            </h1>

            {/* Typewriter subtitle */}
          </div>

          {/* Recruitment Status */}
          <RecruitmentStatusToggle />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left Column — Main Content */}
          <div className="space-y-6">
            <ActiveMembersCard members={teamMembers} />
            <ApplicantsCard initialApplicants={applicants} />
          </div>

          {/* Right Column — Sidebar Stats */}
          <div className="space-y-6">
            <TeamStatsCard
              velocity={teamStats.velocity}
              engagement={teamStats.engagement}
              description={teamStats.description}
            />
            <ProjectOverviewCard projects={projectItems} />
            <UserPresenceCard
              users={onlineUsers}
              additionalCount={additionalOnlineCount}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
