"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { GraduationCap, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";
import { motion } from "motion/react";

export default function Form1Page({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const { handleSubmit, setValue, watch } =
    useFormContext<OnboardingFormData>();

  const role = watch("role");

  const onSubmit = () => {
    if (!role) return;

    setStep(2);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-screen w-full items-center justify-center md:px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center md:p-8 text-center"
      >
        {/* header */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-2xl font-semibold text-neutral-900"
        >
          Anda mahasiswa atau dosen?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-2 text-sm text-neutral-500"
        >
          Pilih peran untuk melanjutkan
        </motion.p>

        {/* options */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="mt-6 grid w-full grid-cols-2 gap-4"
        >
          {/* mahasiswa */}
          <motion.button
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.25 }}
            animate={{
              scale: role === "mahasiswa" ? 1.02 : 1,
            }}
            type="button"
            onClick={() => setValue("role", "mahasiswa")}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition",
              role === "mahasiswa"
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-neutral-300 hover:bg-blue-100",
            )}
          >
            <GraduationCap className="size-6 text-blue-600" />
            <span className="text-sm font-medium">Mahasiswa</span>
          </motion.button>

          {/* dosen */}
          <motion.button
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.25 }}
            animate={{
              scale: role === "dosen" ? 1.02 : 1,
            }}
            type="button"
            onClick={() => setValue("role", "dosen")}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition",
              role === "dosen"
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-neutral-300 hover:bg-blue-100",
            )}
          >
            <User className="size-6 text-blue-600" />
            <span className="text-sm font-medium">Dosen</span>
          </motion.button>
        </motion.div>

        {/* action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full"
        >
          <Button type="submit" className="mt-6 w-full" disabled={!role}>
            Lanjutkan
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-4 text-xs text-neutral-400"
        >
          Anda dapat mengubahnya nanti
        </motion.p>
      </form>
    </motion.div>
  );
}
