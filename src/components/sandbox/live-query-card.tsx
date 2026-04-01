"use client";

import { RefreshCcw } from "lucide-react";
import { useRandomQuote } from "@/hooks/use-random-quote";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LiveQueryCard() {
  const { data, isPending, isError, error, refetch, isFetching } =
    useRandomQuote();

  return (
    <Card>
      <CardHeader>
        <CardTitle>React Query + Axios</CardTitle>
        <CardDescription>
          Fetches a random quote from a free public API using `src/lib/api.ts`.
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
              <span className="font-medium">Quote:</span> {data.quote}
            </p>
            <p>
              <span className="font-medium">Author:</span> {data.author}
            </p>
            <p>
              <span className="font-medium">ID:</span> {data.id}
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
