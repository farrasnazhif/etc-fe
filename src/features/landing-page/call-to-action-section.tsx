"use client";

import Button from "@/components/ui/button";
import SectionTitle from "@/components/ui/section-title";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <SectionTitle
        title="Mulai Bangun Tim Sekarang"
        description="Temukan tim atau rekrut anggota tim untuk berbagai kebutuhan, mulai dari lomba hingga proyek kolaboratif."
      />

      <Link href="/explore">
        <Button
          className="mt-8 rounded-full"
          rightIcon={ArrowRightIcon}
          size="lg"
        >
          Mulai Sekarang
        </Button>
      </Link>
    </section>
  );
}
