"use client";

import Link from "next/link";
import { Folder, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

// const menu = [
//   { name: "Active Projects", href: "/projects", icon: Folder },
//   { name: "Team Chat", href: "/chat", icon: MessageSquare },
//   { name: "Shared Files", href: "/files", icon: FileText },
//   { name: "Milestones", href: "/milestones", icon: Flag },
// ];

export default function DashboardSidebar() {
  // const pathname = usePathname();

  return (
    <aside className="w-64 h-auto border-r bg-white flex flex-col justify-between">
      {/* top */}
      <div>
        {/* header */}
        <div className="p-4 border-b">
          <h2 className="font-semibold text-blue-600">Project Hub</h2>
          <p className="text-sm text-gray-500">Academic Workspace</p>
        </div>

        {/* cta */}
        <div className="p-4">
          <Button className="w-full ">New Project</Button>
        </div>

        {/* menu */}
        <nav className="px-4">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-md text-sm transition",
              "bg-blue-50 text-blue-600 font-medium",
              "border-l-4 border-blue-500",
            )}
          >
            <Folder className="size-4" />
            Projects
          </div>
        </nav>
        {/* <nav className="px-2">
          {menu.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <item.icon className="size-4" />
                {item.name}
              </Link>
            );
          })}
        </nav> */}
      </div>

      {/* bottom */}
      <div className="p-4 border-t space-y-3">
        <Link
          href="/settings"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <Settings className="size-4" />
          Settings
        </Link>

        <Link
          href="/support"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <HelpCircle className="size-4" />
          Support
        </Link>
      </div>
    </aside>
  );
}
