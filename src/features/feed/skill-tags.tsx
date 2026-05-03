"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type PopularSkill, mockPopularSkills } from "@/_mock/feed-data";

export default function SkillTags() {
  const [skills, setSkills] = useState<PopularSkill[]>(mockPopularSkills);

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, active: !skill.active } : skill,
      ),
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Keahlian Populer
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => toggleSkill(skill.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer",
              skill.active
                ? "bg-primary/10 text-primary border-primary/30 shadow-sm"
                : "bg-muted text-muted-foreground border-border hover:bg-accent hover:border-accent-foreground/20",
            )}
          >
            {skill.label}
          </button>
        ))}
      </div>
    </div>
  );
}
