import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.15),transparent_40%)]" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-6">
          <h1 className="max-w-5xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl">
            Ship faster with a production-ready Next.js starter.
          </h1>
          <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
            Includes a landing starter, `shadcn/ui` component sandbox, Husky
            pre-commit hooks, and React Query configuration.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="gap-2"
              nativeButton={false}
              render={<Link href="/sandbox" />}
            >
              Open Sandbox <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="#features" />}
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
