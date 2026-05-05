"use client";

import {
  Calendar,
  HandCoins,
  User,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Rekrutmen } from "@/hooks/useRekrutmen";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type RekrutmenCardProps = {
  item: Rekrutmen;
  status?: "pending" | "approved" | "rejected";
  href?: string;
};

export default function RekrutmenCard({
  item,
  status,
  href,
}: RekrutmenCardProps) {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);

      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const kegiatanStyle = {
    projek: "bg-blue-100 text-blue-700 border-blue-200",
    lomba: "bg-orange-100 text-orange-700 border-orange-200",
    riset: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const kegiatanLabel = {
    projek: "Projek",
    lomba: "Lomba",
    riset: "Riset",
  };

  function getStatusConfig(currentStatus: "pending" | "approved" | "rejected") {
    switch (currentStatus) {
      case "pending":
        return {
          label: "Pending",
          icon: <Clock3 className="size-3" />,
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };

      case "approved":
        return {
          label: "Diterima",
          icon: <CheckCircle2 className="size-3" />,
          className: "bg-green-100 text-green-700 border-green-200",
        };

      case "rejected":
        return {
          label: "Ditolak",
          icon: <XCircle className="size-3" />,
          className: "bg-red-100 text-red-700 border-red-200",
        };

      default:
        return {
          label: currentStatus,
          icon: null,
          className: "bg-green-100 text-green-700 border-green-200",
        };
    }
  }

  const statusConfig = status ? getStatusConfig(status) : null;

  return (
    <Link
      href={href ?? `/feed/${item.rekrutmen_id}`}
      className="block h-full cursor-pointer"
    >
      <div className="group flex h-full flex-col rounded-md border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              kegiatanStyle[item.kegiatan as keyof typeof kegiatanStyle] ||
                "border-primary/20 bg-primary/10 text-primary",
            )}
          >
            {kegiatanLabel[item.kegiatan as keyof typeof kegiatanLabel] ||
              item.kegiatan}
          </span>

          {statusConfig && (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                statusConfig.className,
              )}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          )}
        </div>

        <h4 className="mb-3 text-[15px] font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          {item.role}
        </h4>

        <div className="mb-4 grow space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <p className="line-clamp-3 leading-relaxed">
              {item.Kriteria || "Tidak ada kriteria"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />

            <p>
              {formatDate(item.tanggal_mulai)} –{" "}
              {formatDate(item.tanggal_selesai)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <HandCoins className="h-4 w-4 shrink-0 text-muted-foreground" />

            <p className="font-semibold text-foreground">
              {formatRupiah(item.fee)}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>

            <span className="max-w-[150px] truncate text-xs font-medium text-foreground">
              {item.contact_person}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
