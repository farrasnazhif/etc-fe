"use client";

import SectionTitle from "@/components/ui/section-title";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const data: FaqItem[] = [
    {
      question: "Apa itu ETC dan siapa yang bisa menggunakannya?",
      answer:
        "ETC adalah platform yang membantu mahasiswa menemukan tim, mencari partner, serta merekrut anggota untuk berbagai kebutuhan seperti lomba, proyek kampus, dan side project.",
    },
    {
      question: "Apakah saya bisa bergabung dengan tim yang sudah ada?",
      answer:
        "Ya, kamu dapat mencari tim yang sesuai dengan minat dan keahlianmu, kemudian mengajukan permohonan untuk bergabung.",
    },
    {
      question: "Bagaimana cara merekrut anggota tim?",
      answer:
        "Kamu dapat membuat posting kebutuhan tim dan menentukan kriteria yang dibutuhkan, sehingga anggota yang sesuai dapat mendaftar.",
    },
    {
      question: "Apakah ETC gratis digunakan?",
      answer:
        "ETC dapat digunakan secara gratis untuk membantu mahasiswa membangun dan bergabung dalam tim.",
    },
    {
      question: "Apakah saya bisa mengelola anggota tim?",
      answer:
        "Ya, sebagai pembuat tim kamu dapat mengelola anggota, seperti menerima, menolak, atau mengatur komposisi tim.",
    },
    {
      question: "Bagaimana jika tim sudah penuh?",
      answer:
        "Tim yang telah mencapai kapasitas dapat ditandai sebagai penuh atau tidak lagi ditampilkan dalam pencarian umum.",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="FAQ"
        description="Temukan jawaban seputar penggunaan ETC."
      />

      <div className="mx-auto mt-12 w-full max-w-xl">
        {data.map((item, index) => {
          const isActive = isOpen === index;

          return (
            <div
              key={index}
              className="flex flex-col border-b border-gray-200 bg-white"
            >
              <h3
                className="flex cursor-pointer items-start justify-between gap-4 py-4 font-medium"
                onClick={() => setIsOpen(isActive ? null : index)}
              >
                {item.question}
                {isActive ? (
                  <MinusIcon className="size-5 text-gray-500" />
                ) : (
                  <PlusIcon className="size-5 text-gray-500" />
                )}
              </h3>

              <p
                className={`pb-4 text-sm/6 text-gray-500 ${
                  isActive ? "block" : "hidden"
                }`}
              >
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
