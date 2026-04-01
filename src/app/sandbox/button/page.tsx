import Link from "next/link";
import { ArrowRight, Download, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ButtonSandboxPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Badge variant="secondary">Button Sandbox</Badge>
            <h1 className="text-3xl font-semibold tracking-tight">
              Button component playground
            </h1>
            <p className="text-muted-foreground">
              Validate button variants, sizes, states, and icon patterns.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" render={<Link href="/sandbox" />}>
              All sandboxes
            </Button>
            <Button variant="outline" render={<Link href="/" />}>
              Back to landing
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>Compare all available visual styles.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>Check spacing and hierarchy by size.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Icon Buttons</CardTitle>
            <CardDescription>
              Common patterns for icon-only and icon-with-label actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button size="icon" aria-label="Create item">
              <Plus className="size-4" />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Download">
              <Download className="size-4" />
            </Button>
            <Button className="gap-2">
              Create project <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>States</CardTitle>
            <CardDescription>Preview disabled and busy interactions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
            <Button className="gap-2" disabled>
              <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading...
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
