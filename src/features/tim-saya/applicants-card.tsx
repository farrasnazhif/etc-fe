"use client";

import { UserPlus, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Pendaftar } from "@/hooks/useApplicants";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicantsCardProps {
  applicants: Pendaftar[];
  isLoading?: boolean;
  onAccept: (pendaftarId: string) => void;
  onReject: (pendaftarId: string) => void;
  isActionLoading?: boolean;
}

export default function ApplicantsCard({
  applicants,
  isLoading,
  onAccept,
  onReject,
  isActionLoading,
}: ApplicantsCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 border-b pb-4">
        <UserPlus className="size-5 text-primary" />
        <CardTitle className="text-base font-semibold">Pelamar Baru</CardTitle>
        <Badge
          variant="default"
          className="ml-1 size-5 items-center justify-center rounded-full p-0 text-[10px]"
        >
          {applicants.length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {isLoading ? (
          <div className="space-y-4 py-4">
            {[1, 2].map((i) => (
              <Card key={i} className="ring-1 ring-border/60 shadow-none">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 px-4">
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
        ) : applicants.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Tidak ada pelamar baru saat ini.
          </p>
        ) : (
          applicants.map((applicant) => (
            <Card
              key={applicant.pendaftar_id}
              className="ring-1 ring-border/60 shadow-none"
            >
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 px-4">
                {/* Avatar */}
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

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    {applicant.nama_pendaftar || "Tanpa Nama"}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {applicant.cv_url && (
                      <Link
                        href={applicant.cv_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Lihat CV <ExternalLink className="ml-1 size-3" />
                      </Link>
                    )}
                    {applicant.cv_url && applicant.portofolio_url && (
                      <span className="text-muted-foreground">•</span>
                    )}
                    {applicant.portofolio_url && (
                      <Link
                        href={applicant.portofolio_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Portofolio <ExternalLink className="ml-1 size-3" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 shrink-0 self-center mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => onReject(applicant.pendaftar_id)}
                    disabled={isActionLoading}
                  >
                    {isActionLoading ? <Loader2 className="size-3 animate-spin mr-1" /> : null}
                    Tolak
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => onAccept(applicant.pendaftar_id)}
                    disabled={isActionLoading}
                  >
                    {isActionLoading ? <Loader2 className="size-3 animate-spin mr-1" /> : null}
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
