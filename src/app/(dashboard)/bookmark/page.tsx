"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useGetAllBookmarks } from "@/hooks/use-bookmark";
import { useAuth } from "@/hooks/use-auth";

import Link from "next/link";

import { Loader2 } from "lucide-react";

import Button from "@/components/ui/button";
import RekrutmenCard from "@/components/ui/rekrutmen-card";

import { useEffect, useState } from "react";

export default function BookmarkPage() {
  const { isAuthenticated } = useAuth();

  const { data: bookmarkList, isPending, isError } = useGetAllBookmarks();

  const [mounted, setMounted] = useState(false);

  // prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // initial safe loading before client auth state is ready
  if (!mounted) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-2 py-2 md:px-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout withNavbar withSidebar>
      <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Bookmark Saya
            </h1>
          </div>
        </div>

        {/* not login state */}
        {!isAuthenticated ? (
          <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Kamu belum login
            </h3>

            <p className="mb-6 text-muted-foreground">
              Login untuk menyimpan dan melihat bookmark rekrutmen.
            </p>

            <div
              data-theme="light"
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link href="/login">
                <Button>Login</Button>
              </Link>

              <Link href="/feed">
                <Button variant="outline">Lihat Rekrutmen</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* loading */}
            {isPending && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* error */}
            {isError && (
              <div className="py-20 text-center text-destructive">
                <p>Terjadi kesalahan saat mengambil data bookmark.</p>
              </div>
            )}

            {/* empty state */}
            {!isPending &&
              !isError &&
              (!bookmarkList || bookmarkList.length === 0) && (
                <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
                  <h3 className="mb-2 text-lg font-medium text-primary">
                    Kamu belum memiliki bookmark
                  </h3>

                  <p className="mb-6 text-muted-foreground">
                    Simpan rekrutmen favoritmu agar lebih mudah ditemukan nanti.
                  </p>

                  <Link href="/feed" data-theme="light">
                    <Button>Lihat Rekrutmen</Button>
                  </Link>
                </div>
              )}

            {/* content */}
            {!isPending &&
              !isError &&
              bookmarkList &&
              bookmarkList.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {bookmarkList.map((bookmark) => (
                    <RekrutmenCard
                      key={bookmark.id}
                      item={bookmark.rekrutmen}
                      href={`/feed/${bookmark.rekrutmen.rekrutmen_id}`}
                    />
                  ))}
                </div>
              )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
