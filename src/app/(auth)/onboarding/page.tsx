"use client";

import Button from "@/components/ui/button";
import Form1Page from "@/features/onboarding/container/form1";
import Form2Page from "@/features/onboarding/container/form2";
import { OnboardingFormData } from "@/types/onboarding";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "motion/react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const methods = useForm<OnboardingFormData>({
    defaultValues: {
      role: null,
      name: "",
      jurusan: "",
      nomor_pengenal: null,
      no_hp: null,
    },
  });

  return (
    <section className="min-h-screen flex overflow-hidden">
      {/* left section (step indicator) */}
      <aside className="w-[340px] hidden lg:flex flex-col  bg-blue-400/60 px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className=" flex justify-start"
        >
          <h1 className="font-bold text-2xl leading-none">ETC</h1>
        </motion.div>

        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="text-3xl font-semibold leading-snug text-blue-900"
          >
            Beberapa langkah lagi untuk membangun
            <br />
            kolaborasimu.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="mt-3 text-neutral-800/70 text-sm leading-relaxed"
          >
            Temukan tim yang sesuai.
            <br />
            Mulai kolaborasi dengan lebih mudah.
          </motion.p>
        </motion.div>

        {/* help card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          className="mt-8 space-y-3"
        >
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Butuh bantuan?
          </p>

          <p className="text-sm text-neutral-800/70 dark:text-neutral-100">
            Jika ada kendala, kami siap membantu Anda melanjutkan proses ini.
          </p>

          <div className="flex gap-2 items-center mt-4">
            <Button>Contact us</Button>
          </div>
        </motion.div>
      </aside>

      {/* right section (onboarding content) */}
      <main className="flex-1 flex items-center justify-center px-8 bg-gradient-to-b from-blue-100 via-blue-50 to-white">
        <FormProvider {...methods}>
          {step === 1 && <Form1Page setStep={setStep} />}
          {step === 2 && <Form2Page setStep={setStep} />}
        </FormProvider>
      </main>
    </section>
  );
}
