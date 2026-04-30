"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Applicant } from "@/_mock/team-data";

interface ApplicantsCardProps {
  initialApplicants: Applicant[];
}

export default function ApplicantsCard({ initialApplicants }: ApplicantsCardProps) {
  const [applicants, setApplicants] = useState(initialApplicants);

  const handleAccept = (id: string) => {
    setApplicants((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id: string) => {
    setApplicants((prev) => prev.filter((a) => a.id !== id));
  };

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
        {applicants.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Tidak ada pelamar baru saat ini.
          </p>
        ) : (
          applicants.map((applicant) => (
            <Card
              key={applicant.id}
              className="ring-1 ring-border/60 shadow-none"
            >
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 px-4">
                {/* Avatar */}
                <Avatar size="lg" className="rounded-lg after:rounded-lg">
                  <AvatarImage
                    src={applicant.avatarUrl}
                    alt={applicant.name}
                    className="rounded-lg"
                  />
                  <AvatarFallback className="rounded-lg">
                    {applicant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    {applicant.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {applicant.title} • {applicant.field}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {applicant.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[10px] font-semibold tracking-wider bg-muted text-muted-foreground uppercase"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 shrink-0 self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => handleReject(applicant.id)}
                  >
                    Tolak
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleAccept(applicant.id)}
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
