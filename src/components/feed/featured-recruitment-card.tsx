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
    <div className="relative rounded-xl border border-violet-200 bg-gradient-to-br from-white via-white to-violet-50/50 p-6 md:p-8 shadow-sm overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
        {/* Text content */}
        <div className="flex-1">
          {/* Badge */}
          <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-white mb-4">
            {data.badge}
          </span>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {data.title}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mb-6 leading-relaxed max-w-lg">
            {data.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="primary"
              className="!bg-violet-600 !border-violet-600 hover:!bg-violet-700 text-white"
            >
              Bergabung
            </Button>
            <Button
              variant="outline"
              leftIcon={BookOpen}
              className="!border-gray-300 !text-gray-700 hover:!bg-gray-50"
            >
              Pelajari Lebih
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[280px] lg:w-[320px] shrink-0">
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100">
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
                  "from-violet-400",
                  "to-indigo-600",
                );
                target.parentElement!.innerHTML = `
                  <div class="flex items-center justify-center h-full text-white/80">
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
