"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { typewriterTexts } from "@/_mock/feed-data";

export default function TypewriterSubtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typewriterTexts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayedText.length < currentText.length) {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          // Deleting
          if (displayedText.length > 0) {
            setDisplayedText(currentText.slice(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % typewriterTexts.length);
          }
        }
      },
      isDeleting ? 30 : 60,
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={currentIndex}
        className="text-gray-500 text-sm md:text-base mt-1"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {displayedText}
        <motion.span
          className="inline-block w-[2px] h-4 bg-violet-500 ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.p>
    </AnimatePresence>
  );
}
