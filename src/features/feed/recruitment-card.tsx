"use client";
// TODO : replace with the new card component

import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recruitment } from "@/_mock/feed-data";

type RecruitmentCardProps = {
  data: Recruitment;
};

export default function RecruitmentCard({ data }: RecruitmentCardProps) {
  const extraMembers = data.totalMembers - data.teamMembers.length;

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
      {/* Header: avatar + name + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={data.researcher.avatar}
            alt={data.researcher.name}
            className="h-10 w-10 rounded-full bg-muted object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {data.researcher.name}
            </p>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {data.researcher.department}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
            data.status === "AKTIF" &&
            "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
            data.status === "DITUTUP" &&
            "bg-destructive/10 text-destructive border border-destructive/20",
            data.status === "SEGERA" &&
            "bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
          )}
        >
          {data.status}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-[15px] font-bold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors duration-200">
        {data.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
        {data.description}
      </p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {data.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground bg-muted border border-border"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer: team avatars + action link */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        {/* Avatar stack */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {data.teamMembers.map((member, i) => (
              <img
                key={i}
                src={member.avatar}
                alt={member.name}
                className="h-7 w-7 rounded-full border-2 border-card bg-muted object-cover"
              />
            ))}
          </div>
          {extraMembers > 0 && (
            <span className="ml-2 text-xs font-medium text-muted-foreground">
              +{extraMembers}
            </span>
          )}
        </div>

        {/* Action link */}
        {data.actionType === "apply" ? (
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer group/btn">
            Lamar Sekarang
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        ) : (
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer group/btn">
            Lihat Detail
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  );
}
