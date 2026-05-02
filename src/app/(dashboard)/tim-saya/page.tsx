"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useMyRekrutmen } from "@/hooks/useMyRekrutmen";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/button";

export default function TimSayaListPage() {
  const { data: rekrutmenList, isLoading, isError } = useMyRekrutmen();

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Tim Saya
        </h1>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-destructive">
            <p>Terjadi kesalahan saat mengambil data rekrutmen.</p>
          </div>
        )}

        {!isLoading && !isError && (!rekrutmenList || rekrutmenList.length === 0) && (
          <div className="text-center py-20 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-medium text-primary mb-2">
              Kamu belum membuat rekrutmen apapun
            </h3>
            <p className="text-muted-foreground mb-6">
              Mulai bangun tim kamu dengan membuat postingan rekrutmen baru.
            </p>
            <Link href="/buat-postingan">
              <Button>Buat Rekrutmen</Button>
            </Link>
          </div>
        )}

        {!isLoading && !isError && rekrutmenList && rekrutmenList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rekrutmenList.map((item) => (
              <Link
                key={item.rekrutmen_id}
                href={`/tim-saya/${item.rekrutmen_id}`}
              >
                <div className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all shadow-sm hover:shadow-md h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-semibold text-lg text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                      {item.role}
                    </h3>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary shrink-0">
                      {item.kegiatan}
                    </span>
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="truncate">
                        {item.tanggal_mulai} – {item.tanggal_selesai}
                      </span>
                    </div>

                    <div className="font-medium text-foreground">
                      {formatIDR(item.fee)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
