"use client";

import {
  Users,
  MoreVertical,
  Trash2,
  Archive,
  Phone,
  IdCard,
  GraduationCap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";

import type { TimMember } from "@/hooks/useTimMembers";
import type { Pendaftar } from "@/hooks/useApplicants";

interface ActiveMembersCardProps {
  members: TimMember[];
  applicants: Pendaftar[];
  isLoading?: boolean;
}

export default function ActiveMembersCard({
  members,
  applicants,
  isLoading,
}: ActiveMembersCardProps) {
  const params = useParams();
  const router = useRouter();

  const rekrutmenId = params.rekrutmen_id as string;

  function getPendaftarIdByUserId(userId: string) {
    return applicants.find((applicant) => applicant.user_id === userId)
      ?.pendaftar_id;
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            Anggota Aktif
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-0 p-0">
        {isLoading ? (
          <div className="space-y-4 px-4 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            ))}
          </div>
        ) : !members || members.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Tidak ada anggota aktif.
          </p>
        ) : (
          members.map((member, index) => {
            const pendaftarId = getPendaftarIdByUserId(member.user_id);

            return (
              <div
                key={member.user_id}
                className={cn(
                  "flex items-start gap-4 px-8 py-8",
                  index < members.length - 1 && "border-b border-border",
                )}
              >
                {/* avatar */}
                <div className="relative shrink-0">
                  <Avatar size="lg">
                    <AvatarFallback>
                      {member.nama
                        ? member.nama
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "??"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* full info */}
                <div className="min-w-0 flex-1 space-y-2">
                  {/* nama + metadata */}
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                    {/* nama */}
                    <p className="truncate text-sm font-semibold text-foreground">
                      {member.nama || "Tanpa Nama"}
                    </p>

                    {/* detail user */}
                  </div>

                  <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 mb-3">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <GraduationCap className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">{member.jurusan || "-"}</span>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5">
                      <IdCard className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">
                        {member.no_pengenal || "-"}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5">
                      <Phone className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">{member.no_telp || "-"}</span>
                    </div>
                  </div>

                  {/* spesialisasi */}
                  <div className="flex flex-wrap gap-1.5">
                    {member.spesialisasi?.length ? (
                      member.spesialisasi.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-primary/10 text-[10px] font-semibold tracking-wider text-primary uppercase"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-primary">
                        Tidak ada spesialisasi
                      </span>
                    )}
                  </div>
                </div>

                {/* dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer rounded-md p-1 outline-none transition-colors hover:bg-muted">
                    <MoreVertical className="size-4 text-muted-foreground" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" sideOffset={8}>
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      disabled={!pendaftarId}
                      onClick={() => {
                        if (!pendaftarId) return;

                        router.push(
                          `/tim-saya/${rekrutmenId}/pelamar/${pendaftarId}`,
                        );
                      }}
                    >
                      <Archive className="size-4" />
                      Berkas
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer gap-2"
                    >
                      <Trash2 className="size-4" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
