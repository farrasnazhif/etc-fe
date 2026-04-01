import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.15),transparent_40%)]" />
      <div className="w-full max-w-xl space-y-5 p-8 text-center">
        <p className="text-4xl font-bold tracking-wide text-black uppercase">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-slate-600">
          The page you are looking for does not exist.
        </p>
        <div className="flex justify-center gap-3 ">
          <Button nativeButton={false} render={<Link href="/" />}>
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
