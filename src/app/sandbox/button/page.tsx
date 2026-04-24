"use client";

import Button from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "outline"
  | "ghost"
  | "success"
  | "error"
  | "warning";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-base-content">{title}</h2>
      {children}
    </section>
  );
}

function ButtonGroup({ variant }: { variant: ButtonVariant }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant={variant} size="lg">
        Continue
      </Button>
      <Button variant={variant}>Continue</Button>
      <Button variant={variant} size="sm">
        Continue
      </Button>
      <Button variant={variant} disabled>
        Disabled
      </Button>
      <Button variant={variant} isLoading>
        Loading
      </Button>
    </div>
  );
}

function ButtonWithIconGroup({ variant }: { variant: ButtonVariant }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant={variant} leftIcon={Home}>
        Home
      </Button>
      <Button variant={variant} rightIcon={ArrowRight}>
        Next
      </Button>
      <Button variant={variant} leftIcon={Home} isLoading>
        Loading
      </Button>
    </div>
  );
}

export default function ButtonSandboxPage() {
  return (
    <main
      data-theme="light"
      className="min-h-screen bg-base-200 px-8 py-16 space-y-12 flex flex-col justify-center items-center"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-base-content">
          ETC Button Sandbox
        </h1>
        <p className="text-base-content/70">
          Preview semua variasi button memakai daisyUI
        </p>
      </div>

      <Section title="Variants">
        <ButtonGroup variant="primary" />
        <ButtonGroup variant="secondary" />
        <ButtonGroup variant="accent" />
        <ButtonGroup variant="neutral" />
        <ButtonGroup variant="outline" />
        <ButtonGroup variant="ghost" />
        <ButtonGroup variant="success" />
        <ButtonGroup variant="error" />
        <ButtonGroup variant="warning" />
      </Section>

      <Section title="With Icons">
        <ButtonWithIconGroup variant="primary" />
        <ButtonWithIconGroup variant="secondary" />
        <ButtonWithIconGroup variant="accent" />
        <ButtonWithIconGroup variant="outline" />
      </Section>
    </main>
  );
}
