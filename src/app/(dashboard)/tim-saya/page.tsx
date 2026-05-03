"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import { useMyRekrutmen } from "@/hooks/useMyRekrutmen";
import { useAuth } from "@/hooks/use-auth";

import Link from "next/link";

import { Loader2 } from "lucide-react";

import Button from "@/components/ui/button";
import RekrutmenCard from "@/components/ui/rekrutmen-card";

export default function TimSayaListPage() {
  const { isAuthenticated } = useAuth();

  const { data: rekrutmenList, isPending, isError } = useMyRekrutmen();

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Tim Saya
        </h1>

        {/* not logged in */}
        {!isAuthenticated && (
          <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Kamu belum login
            </h3>

            <p className="mb-6 text-muted-foreground">
              Login terlebih dahulu untuk melihat dan mengelola tim kamu.
            </p>

            <Link href="/login" data-theme="light">
              <Button>Login Sekarang</Button>
            </Link>
          </div>
        )}

        {/* loading */}
        {isAuthenticated && isPending && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* error */}
        {isAuthenticated && isError && (
          <div className="py-20 text-center text-destructive">
            <p>Terjadi kesalahan saat mengambil data rekrutmen.</p>
          </div>
        )}

        {/* empty state */}
        {isAuthenticated &&
          !isPending &&
          !isError &&
          (!rekrutmenList || rekrutmenList.length === 0) && (
            <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
              <h3 className="mb-2 text-lg font-medium text-primary">
                Kamu belum membuat rekrutmen apapun
              </h3>

              <p className="mb-6 text-muted-foreground">
                Mulai bangun tim kamu dengan membuat postingan rekrutmen baru.
              </p>

              <Link href="/buat-postingan" data-theme="light">
                <Button>Buat Rekrutmen</Button>
              </Link>
            </div>
          )}

        {/* list */}
        {isAuthenticated &&
          !isPending &&
          !isError &&
          rekrutmenList &&
          rekrutmenList.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rekrutmenList.map((item) => (
                <RekrutmenCard
                  key={item.rekrutmen_id}
                  item={item}
                  href={`/tim-saya/${item.rekrutmen_id}`}
                />
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
