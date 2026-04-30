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
import type { TeamMember, MemberRole } from "@/_mock/team-data";

const roleBadgeVariant: Record<MemberRole, {
  variant: "default" | "secondary" | "outline";
  className: string;
}> = {
  ADMIN: {
    variant: "outline",
    className: "border-primary text-primary",
  },
  EDITOR: {
    variant: "secondary",
    className: "bg-secondary text-secondary-foreground",
  },
  VIEWER: {
    variant: "outline",
    className: "border-border text-muted-foreground",
  },
};

interface ActiveMembersCardProps {
  members: TeamMember[];
}

export default function ActiveMembersCard({ members }: ActiveMembersCardProps) {
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
        {members.map((member, index) => (
          <div
            key={member.id}
            className={cn(
              "flex items-center gap-4 px-4 py-4",
              index < members.length - 1 && "border-b border-border"
            )}
          >
            {/* Avatar with online indicator */}
            <div className="relative">
              <Avatar size="lg">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
                {member.isOnline && (
                  <AvatarBadge className="bg-green-500 ring-2 ring-card" />
                )}
              </Avatar>
            </div>

            {/* Name + Position */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {member.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {member.position}
              </p>
            </div>

            {/* Role Badge */}
            <Badge
              variant={roleBadgeVariant[member.role].variant}
              className={cn(
                "text-[10px] font-semibold tracking-wider px-2.5",
                roleBadgeVariant[member.role].className
              )}
            >
              {member.role}
            </Badge>

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
        ))}
      </CardContent>
    </Card>
  );
}
