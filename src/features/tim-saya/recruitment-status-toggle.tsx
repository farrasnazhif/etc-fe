"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

export default function RecruitmentStatusToggle() {
  const [isActive, setIsActive] = useState(true);

  return (
    <Card className="w-fit">
      <CardContent className="flex items-center gap-4 py-3 px-5">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Status Rekrutmen</span>
          <span className="text-sm font-semibold text-foreground">
            {isActive ? "Aktif & Menerima" : "Tidak Aktif"}
          </span>
        </div>
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => setIsActive(checked)}
          aria-label="Toggle status rekrutmen"
        />
      </CardContent>
    </Card>
  );
}
