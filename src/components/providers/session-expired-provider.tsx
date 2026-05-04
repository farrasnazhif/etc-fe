"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useToast } from "@/components/ui/toaster";

export default function SessionExpiredHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  const hasHandled = useRef(false);

  useEffect(() => {
    function handleSessionExpired(event: Event) {
      if (hasHandled.current) return;

      // public routes that should ignore session-expired entirely
      const publicRoutes = [
        "/login",
        "/register",
        "/feed",
        "/bookmark",
        "/tim-saya",
      ];

      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route),
      );

      // on public pages:
      // - no toast
      // - no redirect
      if (isPublicRoute) {
        return;
      }

      hasHandled.current = true;

      const customEvent = event as CustomEvent<{ message?: string }>;

      addToast(
        customEvent.detail?.message ||
          "Sesi kamu telah berakhir. Silakan login kembali.",
        "error",
      );

      router.push("/login");

      setTimeout(() => {
        hasHandled.current = false;
      }, 1500);
    }

    window.addEventListener("auth:expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:expired", handleSessionExpired);
    };
  }, [addToast, pathname, router]);

  return null;
}
