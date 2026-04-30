"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Category, mockCategories } from "@/_mock/feed-data";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat,
      ),
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Kategori</h3>
      </div>

      {/* Category list */}
      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={cn(
                "h-[18px] w-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-200",
                category.checked
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/40 group-hover:border-primary/60",
              )}
              onClick={() => toggleCategory(category.id)}
            >
              {category.checked && (
                <svg
                  className="h-3 w-3 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span
              className={cn(
                "text-sm transition-colors duration-200",
                category.checked
                  ? "text-foreground font-medium"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {category.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
