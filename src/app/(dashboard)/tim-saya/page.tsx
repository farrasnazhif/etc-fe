"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useMyRekrutmen } from "@/hooks/useMyRekrutmen";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import RekrutmenCard from "@/components/ui/rekrutmen-card";

export default function TimSayaListPage() {
  const { data: rekrutmenList, isLoading, isError } = useMyRekrutmen();

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
              <RekrutmenCard key={item.rekrutmen_id} item={item} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
