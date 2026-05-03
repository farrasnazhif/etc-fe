"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useGetAllBookmarks } from "@/hooks/use-bookmark";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import RekrutmenCard from "@/components/ui/rekrutmen-card";

export default function BookmarkPage() {
  const { data: bookmarkList, isPending, isError } = useGetAllBookmarks();

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="max-w-7xl mx-auto space-y-6 px-2 py-2 md:px-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Bookmark Saya
            </h1>
          </div>
        </div>

        {/* loading */}
        {isPending && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* error */}
        {isError && (
          <div className="text-center py-20 text-destructive">
            <p>Terjadi kesalahan saat mengambil data bookmark.</p>
          </div>
        )}

        {/* empty state */}
        {!isPending &&
          !isError &&
          (!bookmarkList || bookmarkList.length === 0) && (
            <div className="text-center py-20 bg-card rounded-md border border-border shadow-xs">
              <h3 className="text-lg font-medium text-primary mb-2">
                Kamu belum memiliki bookmark
              </h3>

              <p className="text-muted-foreground mb-6">
                Simpan rekrutmen favoritmu agar lebih mudah ditemukan nanti.
              </p>

              <Link href="/feed" data-theme="light">
                <Button>Lihat Rekrutmen</Button>
              </Link>
            </div>
          )}

        {/* content */}
        {!isPending && !isError && bookmarkList && bookmarkList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkList.map((bookmark) => (
              <RekrutmenCard
                key={bookmark.id}
                item={bookmark.rekrutmen}
                href={`/feed/${bookmark.rekrutmen.rekrutmen_id}`}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
