"use client";

import Button from "@/components/ui/button";
import SectionTitle from "@/components/ui/section-title";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { container, item } from "./constants/animation";

export default function CallToActionSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <SectionTitle
        title="Mulai Bangun Tim Sekarang"
        description="Temukan tim atau rekrut anggota tim untuk berbagai kebutuhan, mulai dari lomba hingga proyek kolaboratif."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <motion.div variants={item}>
          <Link href="/feed">
            <Button className="mt-8" rightIcon={ArrowRightIcon} size="lg">
              Mulai Sekarang
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
