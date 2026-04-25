"use client";

import Link from "next/link";
import { Folder, Settings, HelpCircle, X, PanelRight } from "lucide-react";
import Button from "@/components/ui/button";
import { useState } from "react";

// mobile sidebar
export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-r-2 border-gray-100">
      <button onClick={() => setOpen(true)} className="md:hidden p-2">
        <PanelRight />
      </button>

      {/* desktop */}
      <div className="hidden md:block h-full">
        <DesktopSidebar />
      </div>

      {/* mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <DesktopSidebar onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-64 h-full bg-white flex flex-col justify-between">
      {/* top */}
      <div>
        {/* header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-blue-600">Project Hub</h2>
            <p className="text-sm text-gray-500">Academic Workspace</p>
          </div>

          {/* close button (mobile only) */}
          {onClose && (
            <button onClick={onClose} className="md:hidden">
              <X className="size-5" />
            </button>
          )}
        </div>

        {/* cta */}
        <div className="p-4">
          <Button className="w-full">New Project</Button>
        </div>

        {/* menu */}
        <nav className="px-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-md text-sm bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500">
            <Folder className="size-4" />
            Projects
          </div>
        </nav>
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
