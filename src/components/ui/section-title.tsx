"use client";

import React from "react";
import { motion } from "motion/react";
import { container, item } from "@/features/landing-page/constants/animation";

export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="mt-40 flex flex-col items-center justify-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h3
        variants={item}
        className="text-center text-[32px] font-semibold"
      >
        {title}
      </motion.h3>

      <motion.p
        variants={item}
        className="mt-3 max-w-xs text-center text-gray-500 md:max-w-lg"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
