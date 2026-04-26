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
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4 w-4 text-violet-600" />
        <h3 className="text-sm font-semibold text-gray-800">Kategori</h3>
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
                  ? "bg-violet-600 border-violet-600"
                  : "border-gray-300 group-hover:border-violet-400",
              )}
              onClick={() => toggleCategory(category.id)}
            >
              {category.checked && (
                <svg
                  className="h-3 w-3 text-white"
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
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 group-hover:text-gray-800",
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
