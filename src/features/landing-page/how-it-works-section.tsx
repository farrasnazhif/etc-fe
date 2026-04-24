"use client";

import SectionTitle from "@/components/ui/section-title";
import { UsersIcon, SearchIcon, UserPlusIcon } from "lucide-react";
import { motion } from "motion/react";
import { container, item } from "./constants/animation";

export default function HowItWorksSection() {
  const data = [
    {
      title: "Buat Profil",
      description:
        "Lengkapi profil untuk menampilkan minat, keahlian, dan pengalamanmu.",
      icon: UsersIcon,
    },
    {
      title: "Temukan atau Buat Tim",
      description:
        "Cari tim yang sesuai atau buat rekrutmen untuk menemukan anggota yang dibutuhkan.",
      icon: SearchIcon,
    },
    {
      title: "Mulai Kolaborasi",
      description:
        "Bergabung dengan tim dan mulai mengerjakan proyek secara terstruktur.",
      icon: UserPlusIcon,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="Cara Kerja ETC"
        description="Mulai dari menemukan tim hingga membangun kolaborasi dalam beberapa langkah sederhana."
      />

      <motion.div
        className="mt-20 flex flex-wrap items-center justify-center gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {data.map((itemData, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -4 }}
            className="rounded-[14px] bg-blue-200/80 p-0.5 pt-4  "
          >
            <div className="relative flex max-w-80 flex-col items-center rounded-xl bg-white p-6 pb-10 ">
              <div className="absolute -top-6 rounded-full bg-gray-800 p-3">
                <itemData.icon className="size-6 text-white" />
              </div>
              <h3 className="mt-10 text-center text-base font-medium">
                {itemData.title}
              </h3>
              <p className="mt-6 text-center text-gray-500">
                {itemData.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
