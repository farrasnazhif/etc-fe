"use client";

import SectionTitle from "@/components/ui/section-title";
import Image from "next/image";
import { motion } from "motion/react";
import { container, item } from "./constants/animation";

export default function MeetOurTeamSection() {
  const data = [
    {
      name: "Farras Nazhif Pratikno",
      title: "Frontend Engineer",
      image: "/assets/team-user-1.png",
    },
    {
      name: "Kagendra Amadeo ",
      title: "Frontend Engineer",
      image: "/assets/team-user-2.png",
    },
    {
      name: "Via Hana Nurma Putri",
      title: "Frontend Engineer",
      image: "/assets/team-user-3.png",
    },
    {
      name: "Hartmann Kanisius",
      title: "Backend Engineer",
      image: "/assets/team-user-4.png",
    },
    {
      name: "Muhammad Zulfiqar",
      title: "Backend Engineer",
      image: "/assets/team-user-4.png",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="Meet Our Team"
        description="Kenali tim di balik ETC dan bagaimana kami membantu mahasiswa membangun kolaborasi."
      />

      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-8"
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
            className="flex flex-col "
          >
            <Image
              src={itemData.image}
              alt="User Image"
              className="h-64 w-52 object-cover"
              width={100}
              height={100}
            />
            <h3 className="mt-2 text-base font-medium">{itemData.name}</h3>
            <p className="text-sm text-gray-500">{itemData.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
