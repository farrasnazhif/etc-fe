"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  className?: string;
  customLabels?: Record<string, string>;
  excludePaths?: string[];
};

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/%20/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs({
  className = "",
  customLabels = {},
  excludePaths = [],
}: BreadcrumbsProps) {
  const pathname = usePathname();

  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    if (excludePaths.includes(segment)) return;

    breadcrumbs.push({
      label: customLabels[segment] || formatSegment(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    });
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-sm ${className}`}
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="size-4 text-slate-400" />}

            {isLast ? (
              <span className="font-semibold text-slate-900">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-500 transition-colors hover:text-blue-600"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
