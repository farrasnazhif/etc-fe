import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardSandboxPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Card component playground
            </h1>
            <p className="text-muted-foreground">
              Explore card structures for dashboard and marketing layouts.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/sandbox" />}
            >
              All sandboxes
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/" />}
            >
              Back to landing
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>
                Basic card with heading and body copy.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This structure is useful for displaying short summaries or
              highlights in grid layouts.
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost">Dismiss</Button>
              <Button>Continue</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Action</CardTitle>
              <CardDescription>
                Header action area for contextual controls.
              </CardDescription>
              <CardAction>
                <Button size="sm" variant="outline">
                  Manage
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Add filters, dropdowns, or quick actions via{" "}
              <code>CardAction</code>.
            </CardContent>
          </Card>
        </div>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Small Card Variant</CardTitle>
            <CardDescription>
              Compact card style for dense dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Use <code>size=&quot;sm&quot;</code> when space is limited.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
