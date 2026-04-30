"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { ProjectProgress } from "@/_mock/team-data";

interface ProjectOverviewCardProps {
  projects: ProjectProgress[];
}

export default function ProjectOverviewCard({
  projects,
}: ProjectOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Ikhtisar Proyek</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {projects.map((project) => {
          // Override indicator color via data-slot selector
          const indicatorOverride =
            project.colorClass !== "bg-primary"
              ? `[&_[data-slot=progress-indicator]]:${project.colorClass}`
              : "";

          return (
            <Progress
              key={project.id}
              value={project.progress}
              className={cn("gap-1.5", indicatorOverride)}
            >
              <ProgressLabel className="text-xs text-foreground">
                {project.name}
              </ProgressLabel>
              <ProgressValue
                className={cn(
                  "text-xs font-semibold tabular-nums",
                  project.progress >= 75 ? "text-chart-2" : "text-primary"
                )}
              >
                {(_, value) => `${value}%`}
              </ProgressValue>
            </Progress>
          );
        })}
      </CardContent>
    </Card>
  );
}
