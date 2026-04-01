import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SandboxPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Badge variant="secondary">Sandbox Directory</Badge>
            <h1 className="text-3xl font-semibold tracking-tight">
              Component sandbox pages
            </h1>
            <p className="text-muted-foreground">
              Open a dedicated route for each component playground.
            </p>
          </div>
          <Button variant="outline" render={<Link href="/" />}>
            Back to landing
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Button</CardTitle>
              <CardDescription>Variants, sizes, icons, and states.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button render={<Link href="/sandbox/button" />}>Open page</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Input styles and form patterns.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button render={<Link href="/sandbox/input" />}>Open page</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>Layout composition with card primitives.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button render={<Link href="/sandbox/card" />}>Open page</Button>
            </CardContent>
          </Card>
        </div>

        <Separator />
      </div>
    </main>
  );
}
