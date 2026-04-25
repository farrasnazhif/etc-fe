"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, User } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { name: "Feed Rekrutmen", href: "/feed" },
  { name: "Tim Saya", href: "/tim-saya" },
  { name: "Profile", href: "/profile" },
];

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close when click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-black">
          ETC
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition pb-1",
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-black",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Button>Create Post</Button>

        {/* notification */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="size-5 text-gray-600" />
        </button>

        {/* profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <User className="size-5 text-gray-600" />
          </button>

          {/* dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-md py-2 px-2 z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>

              <Link
                href="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 mb-2"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>

              <div className="my-1 border-t" />

              <Button
                onClick={() => {
                  setOpen(false);
                  // TODO: handle logout logic
                }}
                variant="error"
                className="w-full text-left text-sm py-4 mt-2"
                leftIcon={LogOut}
                size="sm"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
