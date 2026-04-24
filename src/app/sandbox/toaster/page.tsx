"use client";

import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 text-center">
      <h2 className="text-xl font-semibold text-base-content">{title}</h2>
      {children}
    </section>
  );
}

export default function ToasterSandboxPage() {
  const { addToast } = useToast();

  return (
    <main
      data-theme="light"
      className="min-h-screen bg-base-200 px-8 py-16 flex flex-col items-center gap-10"
    >
      <h1 className="text-3xl font-bold text-base-content">
        ETC Toaster Sandbox
      </h1>

      <Section title="Trigger Toast">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => addToast("Berhasil bergabung tim!", "success")}
          >
            Success
          </Button>

          <Button onClick={() => addToast("Terjadi kesalahan", "error")}>
            Error
          </Button>

          <Button
            onClick={() => addToast("Informasi terbaru tersedia", "info")}
          >
            Info
          </Button>

          <Button
            onClick={() => addToast("Perhatikan kembali input", "warning")}
          >
            Warning
          </Button>
        </div>
      </Section>
    </main>
  );
}
