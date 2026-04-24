"use client";

import {
  MenuIcon,
  XIcon,
  ChevronDown,
  Users,
  Search,
  UserPlus,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SubLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

type LinkItem = {
  name: string;
  href?: string;
  subLinks?: SubLink[];
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const links: LinkItem[] = [
    { name: "Beranda", href: "/" },
    {
      name: "Jelajahi",
      subLinks: [
        {
          name: "Cari Tim",
          href: "/explore",
          icon: Search,
          description: "Temukan tim sesuai minat dan keahlian",
        },
        {
          name: "Buat Tim",
          href: "/create-team",
          icon: UserPlus,
          description: "Rekrut anggota untuk kebutuhan tim",
        },
        {
          name: "Manajemen Tim",
          href: "/team",
          icon: Users,
          description: "Kelola anggota dan aktivitas tim",
        },
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          description: "Pantau aktivitas dan progres tim",
        },
      ],
    },
    { name: "Cerita Pengguna", href: "/stories" },
    { name: "Dokumentasi", href: "/docs" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200/70 bg-white/70 px-4 py-3.5 backdrop-blur-md md:px-16 lg:px-24">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="ETC logo"
            className="h-7.5 w-auto"
            width={205}
            height={48}
          />
        </Link>

        {/* desktop */}
        <div className="hidden items-center space-x-6 text-gray-700 md:flex">
          {links.map((link) =>
            link.subLinks ? (
              <div
                key={link.name}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex cursor-pointer items-center gap-1 hover:text-black">
                  {link.name}
                  <ChevronDown
                    className={`mt-px size-4 transition ${
                      openDropdown === link.name ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`absolute top-6 left-0 z-40 w-lg rounded-md border border-gray-100 bg-white p-3 shadow-lg transition ${
                    openDropdown === link.name
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-500">
                    Mulai kolaborasi dengan tim yang tepat
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {link.subLinks.map((sub) => (
                      <Link
                        href={sub.href}
                        key={sub.name}
                        className="group/link flex items-center gap-2 rounded-md p-2 transition hover:bg-gray-100"
                      >
                        <div className="rounded-md bg-gray-800 p-2">
                          <sub.icon className="size-4 text-white transition group-hover/link:scale-110" />
                        </div>
                        <div>
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-xs text-gray-400">
                            {sub.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href!}
                className="transition hover:text-black"
              >
                {link.name}
              </Link>
            ),
          )}
        </div>

        {/* cta */}
        <Link
          href="/explore"
          className="hidden rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-block"
        >
          Mulai Sekarang
        </Link>

        {/* mobile button */}
        <button
          onClick={() => setIsOpen(true)}
          className="transition active:scale-90 md:hidden"
        >
          <MenuIcon className="size-6" />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/30 text-lg font-medium backdrop-blur-xl transition md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {links.map((link) => (
          <div key={link.name} className="text-center">
            {link.subLinks ? (
              <>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.name ? null : link.name,
                    )
                  }
                  className="flex items-center gap-1"
                >
                  {link.name}
                  <ChevronDown
                    className={`size-4 transition ${
                      openDropdown === link.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === link.name && (
                  <div className="mt-2 flex flex-col gap-2 text-sm">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="text-gray-600 hover:text-black"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={link.href!} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            )}
          </div>
        ))}

        <Link
          href="/explore"
          className="rounded-full bg-gray-900 px-6 py-2 text-white"
          onClick={() => setIsOpen(false)}
        >
          Mulai
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md bg-gray-900 p-2 text-white"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
