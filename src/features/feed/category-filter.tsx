"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { type KegiatanType } from "@/hooks/useRekrutmen";

type CategoryFilterProps = {
  activeKegiatan: KegiatanType | undefined;
  onKegiatanChange: (kegiatan: KegiatanType | undefined) => void;
  isDisabled?: boolean;
};

const categories: { id: KegiatanType | undefined; label: string }[] = [
  { id: "projek", label: "Projek" },
  { id: "lomba", label: "Lomba" },
  { id: "riset", label: "Riset" },
];

export default function CategoryFilter({
  activeKegiatan,
  onKegiatanChange,
  isDisabled,
}: CategoryFilterProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 shadow-sm", isDisabled && "opacity-40 transition-opacity duration-200")}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Kategori</h3>
      </div>

      {/* Category buttons */}
      <div className="flex flex-col gap-2">
        {categories.map((category) => {
          const isActive = activeKegiatan === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onKegiatanChange(isActive ? undefined : category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-left",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
