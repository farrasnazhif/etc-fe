// applicants-card.tsx

"use client";

import { UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import type { Pendaftar } from "@/hooks/useApplicants";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

interface ApplicantsCardProps {
  applicants: Pendaftar[];
  isLoading?: boolean;
  onAccept: (pendaftarId: string) => void;
  onReject: (pendaftarId: string) => void;
  isAccepting?: boolean;
  isRejecting?: boolean;
  activePendaftarId?: string | null;
}

export default function ApplicantsCard({
  applicants,
  isLoading,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
  activePendaftarId,
}: ApplicantsCardProps) {
  const params = useParams();

  const rekrutmenId = params.rekrutmen_id as string;

  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status === "pending",
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b pb-4">
        <UserPlus className="size-5 text-primary" />

        <CardTitle className="text-base font-semibold">Pelamar Baru</CardTitle>

        <Badge
          variant="default"
          className="ml-1 size-5 items-center justify-center rounded-full p-0 text-[10px]"
        >
          {pendingApplicants.length}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {isLoading ? (
          <div className="space-y-4 py-4">
            {[1, 2].map((i) => (
              <Card key={i} className="ring-1 ring-border/60 shadow-none">
                <CardContent className="flex flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center">
                  <Skeleton className="h-12 w-12 rounded-lg" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>

                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : pendingApplicants.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Tidak ada pelamar baru saat ini.
          </p>
        ) : (
          pendingApplicants.map((applicant) => (
            <Card
              key={applicant.pendaftar_id}
              className="ring-1 ring-border/60 shadow-none"
            >
              <CardContent className="flex flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center">
                {/* avatar */}
                <Avatar size="lg" className="rounded-lg after:rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {applicant.nama_pendaftar
                      ? applicant.nama_pendaftar
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "??"}
                  </AvatarFallback>
                </Avatar>

                {/* info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {applicant.nama_pendaftar || "Tanpa Nama"}
                  </p>
                </div>

                {/* actions */}
                <div
                  data-theme="light"
                  className="mt-2 flex shrink-0 gap-2 self-center sm:mt-0"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-24 justify-center"
                  >
                    <Link
                      href={`/tim-saya/${rekrutmenId}/applicants/${applicant.pendaftar_id}`}
                    >
                      Review
                    </Link>
                  </Button>

                  <Button
                    variant="error"
                    size="sm"
                    className="w-20 justify-center"
                    disabled={
                      isRejecting &&
                      activePendaftarId === applicant.pendaftar_id
                    }
                    isLoading={
                      isRejecting &&
                      activePendaftarId === applicant.pendaftar_id
                    }
                    onClick={() => onReject(applicant.pendaftar_id)}
                  >
                    Tolak
                  </Button>

                  <Button
                    variant="success"
                    size="sm"
                    className="w-20 justify-center"
                    disabled={
                      isAccepting &&
                      activePendaftarId === applicant.pendaftar_id
                    }
                    isLoading={
                      isAccepting &&
                      activePendaftarId === applicant.pendaftar_id
                    }
                    onClick={() => onAccept(applicant.pendaftar_id)}
                  >
                    Terima
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
