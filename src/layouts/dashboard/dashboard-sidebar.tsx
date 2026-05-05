"use client";

import Link from "next/link";
import {
  Settings,
  HelpCircle,
  X,
  PanelRight,
  Home,
  Bell,
  Bookmark,
  User,
  Users,
} from "lucide-react";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";

// mobile + desktop sidebar
export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // detect when sticky header area is passed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-md bg-white p-2 shadow md:hidden"
      >
        <PanelRight />
      </button>

      {/* desktop sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar isScrolled={isScrolled} />
      </div>

      {/* mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-screen w-64 bg-white shadow-xl">
            <DesktopSidebar
              onClose={() => setOpen(false)}
              isScrolled={isScrolled}
            />
          </div>
        </div>
      )}
    </>
  );
}

function DesktopSidebar({
  onClose,
  isScrolled,
}: {
  onClose?: () => void;
  isScrolled?: boolean;
}) {
  const navLinks = [
    {
      href: "/feed",
      label: "Feed",
      icon: Home,
    },
    {
      href: "/tim-saya",
      label: "Tim Saya",
      icon: Users,
    },
    {
      href: "/bookmark",
      label: "Bookmark",
      icon: Bookmark,
    },
    {
      href: "/notifikasi",
      label: "Notifikasi",
      icon: Bell,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between overflow-y-auto border-r-2 border-gray-100 bg-white">
      {/* top */}
      <div>
        {/* header */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h2 className="font-semibold text-blue-600">Project Hub</h2>
            <p className="text-sm text-gray-500">Academic Workspace</p>
          </div>

          {/* mobile close */}
          {onClose && (
            <button onClick={onClose} className="md:hidden">
              <X className="size-5" />
            </button>
          )}
        </div>

        {/* cta */}
        <div data-theme="light" className="p-4">
          <Link href="/buat-postingan">
            <Button className="w-full">Buat Postingan</Button>
          </Link>
        </div>

        {/* show navbar links after scroll threshold */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isScrolled
              ? "max-h-[500px] border-t border-gray-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="space-y-1 p-4">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-primary/10 hover:text-black"
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* bottom */}
      <div className="space-y-3 border-t p-4">
        <Link
          href="/settings"
          className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
        >
          <Settings className="size-4" />
          Settings
        </Link>

        <Link
          href="/support"
          className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
        >
          <HelpCircle className="size-4" />
          Support
        </Link>
      </div>
    </aside>
  );
}
