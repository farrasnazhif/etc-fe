import SectionTitle from "@/components/ui/section-title";
import { ArrowRightIcon } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <SectionTitle
        title="Mulai Bangun Tim Sekarang"
        description="Temukan tim atau rekrut anggota tim untuk berbagai kebutuhan, mulai dari lomba hingga proyek kolaboratif."
      />
      <a
        href="/explore"
        className="mt-4 flex items-center gap-2 rounded-full bg-gray-900 px-8 py-2.5 font-medium text-white transition hover:opacity-90"
      >
        Mulai Sekarang
        <ArrowRightIcon className="size-5" />
      </a>
    </section>
  );
}
