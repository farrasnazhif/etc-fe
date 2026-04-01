import Link from "next/link";
import { ArrowRight, Blocks, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.15),transparent_40%)]" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-6">
          <Badge className="rounded-full px-3 py-1 text-xs tracking-wide uppercase">
            Next.js 16 Starter
          </Badge>
          <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl">
            Ship faster with a production-ready Next.js starter.
          </h1>
          <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
            Includes a landing starter, `shadcn/ui` component sandbox, Husky
            pre-commit hooks, and React Query configuration out of the box.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2" render={<Link href="/sandbox" />}>
              Open Sandbox <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" size="lg" render={<a href="#features" />}>
              Explore Features
            </Button>
          </div>
        </div>
        <section
          id="features"
          className="grid gap-4 md:grid-cols-3"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Landing Starter
              </CardTitle>
              <CardDescription>
                Structured hero and feature section ready to customize.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Replace copy and visuals while keeping the base layout.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Blocks className="size-4" />
                shadcn Sandbox
              </CardTitle>
              <CardDescription>
                A dedicated page to test reusable UI blocks quickly.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Build and validate components before moving into product pages.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-4" />
                Team Guardrails
              </CardTitle>
              <CardDescription>
                Husky + lint-staged keeps commits clean and consistent.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              React Query is pre-configured for server-state workflows.
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
