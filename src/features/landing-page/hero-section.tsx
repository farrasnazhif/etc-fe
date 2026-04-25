"use client";

import Button from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { container, item } from "./constants/animation";

export default function HeroSection() {
  const specialFeatures = [
    "Temukan tim sesuai minat dan keahlian",
    "Rekrut anggota secara efisien",
    "Mulai kolaborasi dengan lebih terstruktur",
  ];

  return (
    <section className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24">
      <svg
        className="absolute inset-0  size-full max-md:hidden"
        width="1440"
        height="720"
        viewBox="0 0 1440 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="var(--color-gray-200)"
          strokeOpacity=".5"
          d="M-15.227 702.342H1439.7"
        />
        <circle
          cx="711.819"
          cy="372.562"
          r="308.334"
          stroke="var(--color-gray-200)"
          strokeOpacity=".5"
        />
        <circle
          cx="16.942"
          cy="20.834"
          r="308.334"
          stroke="var(--color-gray-200)"
          strokeOpacity=".5"
        />
        <path
          stroke="var(--color-gray-200)"
          strokeOpacity=".5"
          d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7"
        />
        <circle
          cx="782.595"
          cy="411.166"
          r="308.334"
          stroke="var(--color-gray-200)"
          strokeOpacity=".5"
        />
      </svg>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center z-10"
      >
        <motion.div variants={item}>
          <Link
            href="/feed"
            className="mt-32 flex items-center gap-2 rounded-full border border-gray-200 bg-blue-200/30 px-3 py-1 text-sm font-medium transition hover:bg-blue-100/80"
          >
            <p className="flex items-center gap-1">
              <span>Temukan tim atau rekrut anggota</span>
              <ChevronRight className="size-4" />
            </p>
          </Link>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-4 max-w-3xl scale-105 bg-gradient-to-r from-black to-[#748298] bg-clip-text text-center text-4xl/12 font-bold text-transparent md:scale-100 md:text-6xl/20"
        >
          Temukan tim dan bangun kolaborasi dengan{" "}
          <span className="text-blue-500">ETC</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-2 max-w-xl text-center text-base/7 text-gray-700"
        >
          ETC membantu mahasiswa menemukan tim dan membangun kolaborasi untuk
          berbagai kebutuhan.
        </motion.p>

        <motion.div variants={item}>
          <Link href="/feed">
            <Button className="mt-8" rightIcon={ArrowRightIcon} size="lg">
              Mulai Sekarang
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-gray-500 md:gap-14"
        >
          {specialFeatures.map((feature, index) => (
            <motion.p
              variants={item}
              className="flex items-center gap-2"
              key={index}
            >
              <CheckIcon className="size-5" />
              <span>{feature}</span>
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
