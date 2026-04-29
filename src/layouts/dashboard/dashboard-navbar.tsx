"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, User, Menu as MenuIcon, X as XIcon } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/toaster";

const navItems = [
  { name: "Feed Rekrutmen", href: "/feed" },
  { name: "Buat Postingan", href: "/buat-postingan" },
  { name: "Tim Saya", href: "/tim-saya" },
  { name: "Profile", href: "/profile" },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  const { logout } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    addToast("Berhasil logout!", "success");
    router.push("/login");
  }

  return (
    <>
      <nav className="w-full border-b bg-white px-4 md:px-6  py-3 flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-black">
            ETC
          </Link>

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-6">
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

        {/* right */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* <div className="hidden sm:block">
            <Button>Create Post</Button>
          </div> */}

          {/* notification */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Bell className="size-5 text-gray-600" />
          </button>

          {/* profile dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <User className="size-5 text-gray-600" />
            </button>

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
                    handleLogout();
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

          {/* mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />

          {/* drawer */}
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-6 flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-bold text-lg">ETC</h1>
              <button onClick={() => setMobileOpen(false)}>
                <XIcon className="size-5" />
              </button>
            </div>

            {/* nav items */}
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-md font-medium transition  px-2",
                      isActive
                        ? "text-blue-600 border-l-2 border-blue-600 "
                        : "text-gray-500 hover:text-black",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* bottom section */}
            <div className="mt-auto space-y-3">
              {/* <Button className="w-full">Create Post</Button> */}

              <Button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                variant="error"
                className="w-full text-left text-sm py-4 "
                leftIcon={LogOut}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
