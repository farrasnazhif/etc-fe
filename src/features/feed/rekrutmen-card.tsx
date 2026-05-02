"use client";

import { useState } from "react";
import { Calendar, HandCoins, User, FileText } from "lucide-react";
import { Rekrutmen } from "@/hooks/useRekrutmen";
import Button from "@/components/ui/button";
import ApplyModal from "@/features/feed/apply-modal";
import { cn } from "@/lib/utils";

export default function RekrutmenCard({ item, status }: { item: Rekrutmen; status?: "pending" | "approved" | "rejected" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div className="group rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3 gap-2">
          <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            {item.kegiatan}
          </span>
          {status && (
            <span
              className={cn(
                "shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                status === "pending" && "bg-yellow-100 text-yellow-700 border-yellow-200",
                status === "approved" && "bg-green-100 text-green-700 border-green-200",
                status === "rejected" && "bg-red-100 text-red-700 border-red-200"
              )}
            >
              {status}
            </span>
          )}
        </div>

        <h4 className="text-[15px] font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
          {item.role}
        </h4>

        <div className="text-sm text-muted-foreground mb-4 grow space-y-2">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
            <p className="line-clamp-3 leading-relaxed">
              {item.Kriteria ? item.Kriteria : "Tidak ada kriteria"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
            <p>{formatDate(item.tanggal_mulai)} – {formatDate(item.tanggal_selesai)}</p>
          </div>
          <div className="flex items-center gap-2">
            <HandCoins className="w-4 h-4 shrink-0 text-muted-foreground" />
            <p className="font-semibold text-foreground">{formatRupiah(item.fee)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground truncate max-w-[150px]">
              {item.contact_person}
            </span>
          </div>
        </div>

        {!status && (
          <Button
            variant="primary"
            className="w-full cursor-pointer mt-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Apply
          </Button>
        )}
      </div>

      <ApplyModal
        rekrutmenId={item.rekrutmen_id}
        roleLabel={item.role}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
