"use client";

import Button from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import type { FeaturedRecruitment } from "@/_mock/feed-data";

type FeaturedRecruitmentCardProps = {
  data: FeaturedRecruitment;
};

export default function FeaturedRecruitmentCard({
  data,
}: FeaturedRecruitmentCardProps) {
  return (
    <div className="relative rounded-xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8 shadow-sm overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
        {/* Text content */}
        <div className="flex-1">
          {/* Badge */}
          <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary text-primary-foreground mb-4">
            {data.badge}
          </span>

          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
            {data.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-lg">
            {data.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="primary"
              className="!bg-primary !border-primary hover:!bg-primary/90 text-primary-foreground"
            >
              Bergabung
            </Button>
            <Button
              variant="outline"
              leftIcon={BookOpen}
              className="!border-border !text-foreground hover:!bg-accent"
            >
              Pelajari Lebih
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[280px] lg:w-[320px] shrink-0">
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-muted">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a gradient placeholder if image doesn't load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.classList.add(
                  "bg-gradient-to-br",
                  "from-primary/60",
                  "to-primary/90",
                );
                target.parentElement!.innerHTML = `
                  <div class="flex items-center justify-center h-full text-primary-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
