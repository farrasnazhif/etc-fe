"use client";

import { Search, X } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export type RoleSearchFilterProps = {
  roleSearch: string;
  onRoleChange: (role: string) => void;
  isDisabled?: boolean;
};

export default function RoleSearch({ roleSearch, onRoleChange, isDisabled }: RoleSearchFilterProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${isDisabled ? 'opacity-40 transition-opacity duration-200' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Cari Role</h3>
      </div>
      <div className="relative">
        <Input
          value={roleSearch}
          onChange={(e) => onRoleChange(e.target.value)}
          placeholder="Cari berdasarkan role..."
          className="max-w-full! rounded-xl! bg-card!"
        />
        {roleSearch && (
          <Button
            variant="ghost"
            onClick={() => onRoleChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 cursor-pointer p-0 h-auto hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
