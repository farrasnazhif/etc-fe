"use client";

import { Users, MoreVertical, ShieldCheck, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { TimMember } from "@/hooks/useTimMembers";
import { Skeleton } from "@/components/ui/skeleton";

interface ActiveMembersCardProps {
  members: TimMember[];
  isLoading?: boolean;
}

export default function ActiveMembersCard({ members, isLoading }: ActiveMembersCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <CardTitle className="text-base font-semibold">Anggota Aktif</CardTitle>
        </div>
        <button className="text-sm font-medium text-primary hover:underline transition-colors cursor-pointer">
          Kelola Peran
        </button>
      </CardHeader>
      <CardContent className="space-y-0 p-0">
        {isLoading ? (
          <div className="px-4 py-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            ))}
          </div>
        ) : !members || members.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Tidak ada anggota aktif.
          </p>
        ) : (
          members.map((member, index) => (
            <div
              key={member.user_id}
              className={cn(
                "flex items-center gap-4 px-4 py-4",
                index < members.length - 1 && "border-b border-border"
              )}
            >
              {/* Avatar */}
              <div className="relative">
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

              {/* Name + Jurusan + Spesialisasi */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {member.nama || "Tanpa Nama"}
                </p>
                <p className="text-xs text-muted-foreground truncate mb-1">
                  {member.jurusan}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.spesialisasi?.map((skill) => (
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

              {/* Member Ke Badge */}
              {/* <Badge
                variant="secondary"
                className="text-[10px] font-semibold tracking-wider px-2.5 bg-secondary text-secondary-foreground uppercase whitespace-nowrap"
              >
                Member #{member.member_ke}
              </Badge> */}

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer outline-none">
                  <MoreVertical className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8}>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <ShieldCheck className="size-4" />
                    Ubah Peran
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" className="gap-2 cursor-pointer">
                    <Trash2 className="size-4" />
                    Hapus Anggota
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
