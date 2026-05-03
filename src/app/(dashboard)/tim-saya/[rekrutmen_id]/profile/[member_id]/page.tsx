// src/app/(dashboard)/tim-saya/profile/[user_id]/page.tsx

"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  User,
  Phone,
  GraduationCap,
  IdCard,
  Briefcase,
  Loader2,
} from "lucide-react";

import { useParams } from "next/navigation";
import { useMemo } from "react";

import { useRekrutmenDetail } from "@/hooks/useRekrutmenDetail";
import { useTimMembers } from "@/hooks/useTimMembers";

export default function TimMemberProfilePage() {
  const params = useParams();

  const userId = params.user_id as string;
  const rekrutmenId = params.rekrutmen_id as string;

  const { data: rekrutmenDetail, isPending: isRekrutmenLoading } =
    useRekrutmenDetail(rekrutmenId);

  const timId = rekrutmenDetail?.tim_id;

  const { data: members, isPending: isMembersLoading } = useTimMembers(timId);

  const member = useMemo(() => {
    return members?.find((item) => item.user_id === userId);
  }, [members, userId]);

  const isLoading = isRekrutmenLoading || isMembersLoading;

  if (isLoading) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!member) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Data anggota tidak ditemukan.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout withNavbar withSidebar>
      <main className="px-2 py-2 md:px-4">
        <div className="mx-auto max-w-7xl space-y-6">
          <Breadcrumbs
            customLabels={{
              "tim-saya": "Tim Saya",
              profile: "Profile",
              [userId]: member.nama,
            }}
          />

          {/* hero */}
          <Card className="border border-border shadow-xs">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* avatar */}
                <Avatar className="h-28 w-28">
                  <AvatarFallback className="text-3xl font-bold">
                    {member.nama
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>

                {/* main info */}
                <div className="min-w-0 flex-1">
                  <div className="space-y-2">
                    <h1 className="break-words text-3xl font-extrabold tracking-tight text-foreground">
                      {member.nama}
                    </h1>

                    <p className="text-sm text-muted-foreground">
                      Profil anggota tim aktif
                    </p>
                  </div>

                  {/* quick info */}
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap className="size-4 text-primary" />
                      <span>{member.jurusan || "-"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="size-4 text-primary" />
                      <span>{member.no_telp || "-"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <IdCard className="size-4 text-primary" />
                      <span>{member.no_pengenal || "-"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Briefcase className="size-4 text-primary" />
                      <span>Member #{member.member_ke}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* spesialisasi */}
          <Card className="border border-border shadow-xs">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <User className="size-4 text-primary" />
                <h2 className="text-lg font-semibold">Spesialisasi</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {member.spesialisasi?.length ? (
                  member.spesialisasi.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 text-xs font-semibold uppercase"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Belum ada spesialisasi.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
