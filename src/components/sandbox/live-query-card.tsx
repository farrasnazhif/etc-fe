"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SandboxStats = {
  timestamp: string;
  status: string;
  build: string;
};

async function getSandboxStats() {
  const response = await fetch("/api/sandbox-stats");
  if (!response.ok) {
    throw new Error("Failed to load sandbox stats");
  }
  return (await response.json()) as SandboxStats;
}

export function LiveQueryCard() {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["sandbox-stats"],
    queryFn: getSandboxStats,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>React Query Live Fetch</CardTitle>
        <CardDescription>
          This card fetches data from a local API route with caching enabled.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isPending && <p className="text-sm text-muted-foreground">Loading...</p>}
        {isError && (
          <p className="text-sm text-destructive">{(error as Error).message}</p>
        )}
        {data && (
          <div className="rounded-lg border bg-muted/50 p-3 text-sm">
            <p>
              <span className="font-medium">Status:</span> {data.status}
            </p>
            <p>
              <span className="font-medium">Build:</span> {data.build}
            </p>
            <p>
              <span className="font-medium">Fetched at:</span> {data.timestamp}
            </p>
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCcw className="size-4" />
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </CardContent>
    </Card>
  );
}
