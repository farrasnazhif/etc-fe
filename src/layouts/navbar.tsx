"use client";

import Button from "@/components/ui/button";
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
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
          name: "Tim Saya",
          href: "/create-team",
          icon: UserPlus,
          description: "Kelola tim kamu dan pantau anggota yang bergabung",
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
          <h1 className="font-bold text-2xl">ETC</h1>
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
        <Link href="/explore">
          <Button className="hidden rounded-full  md:inline-block">
            Login
          </Button>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="absolute inset-0 bg-black/30"
            />

            {/* sidebar panel */}
            <motion.div
              initial={{ x: "-100%", scale: 0.96 }}
              animate={{ x: 0, scale: 1 }}
              exit={{ x: "-100%", scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-xl p-6 flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-bold text-xl">ETC</h1>

                <button onClick={() => setIsOpen(false)}>
                  <XIcon className="size-5" />
                </button>
              </div>

              {/* menu */}
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <div key={link.name}>
                    {link.subLinks ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === link.name ? null : link.name,
                            )
                          }
                          className="flex items-center justify-between w-full font-medium"
                        >
                          {link.name}

                          <ChevronDown
                            className={`size-4 transition ${
                              openDropdown === link.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === link.name && (
                          <div className="mt-2 ml-2 flex flex-col gap-2 text-sm">
                            {link.subLinks.map((sub: SubLink) => (
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
                      <Link
                        href={link.href!}
                        onClick={() => setIsOpen(false)}
                        className="font-medium"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* bottom section */}
              <div className="mt-auto pt-6">
                <Link href="/explore" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full">Login</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
