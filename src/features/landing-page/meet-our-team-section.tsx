"use client";

import SectionTitle from "@/components/ui/section-title";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { container, item } from "./constants/animation";
import { useState } from "react";

export default function MeetOurTeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      name: "Farras Nazhif Pratikno",
      title: "Frontend Engineer",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      name: "Kagendra Amadeo ",
      title: "Frontend Engineer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      name: "Via Hana Nurma Putri",
      title: "Frontend Engineer",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      name: "Hartmann Kanisius",
      title: "Backend Engineer",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      name: "Muhammad Zulfiqar",
      title: "Backend Engineer",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="Meet Our Team"
        description="Kenali tim di balik ETC dan bagaimana kami membantu mahasiswa membangun kolaborasi."
      />

      <div className="mt-12 md:hidden w-full flex flex-col items-center gap-6">
        {/* stack wrapper */}
        <div
          onClick={() => setActiveIndex((prev) => (prev + 1) % data.length)}
          className="relative w-[260px] h-[360px] cursor-pointer select-none"
        >
          {/* back card, furthest */}
          <div
            className="absolute top-6 left-1/2 w-[260px] h-[330px] rounded-2xl shadow-md"
            style={{
              transform: "translateX(-47%) rotate(-7deg) scale(0.88)",
              background: "#cfc6bb",
              opacity: 0.5,
            }}
          />

          {/* back card, middle */}
          <div
            className="absolute top-3 left-1/2 w-[260px] h-[330px] rounded-2xl shadow-md"
            style={{
              transform: "translateX(-53%) rotate(4deg) scale(0.94)",
              background: "#ddd5cc",
              opacity: 0.75,
            }}
          />

          {/* front card */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40, scale: 0.88, rotate: -4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -30, scale: 1.05, rotate: 3 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] flex flex-col items-center bg-white rounded-2xl shadow-xl p-3"
            >
              <Image
                src={data[activeIndex].image}
                alt={data[activeIndex].name}
                className="h-64 w-full object-cover rounded-xl"
                width={260}
                height={256}
              />
              <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-gray-900">
                {data[activeIndex].name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {data[activeIndex].title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dot indicators */}
        <div className="flex items-center gap-1.5">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-4 h-1.5 bg-gray-700"
                  : "w-1.5 h-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-12 hidden md:flex flex-wrap items-center justify-center gap-8"
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
              className="h-64 w-52 object-cover rounded-lg"
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
