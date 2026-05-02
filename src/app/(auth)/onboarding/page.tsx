"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import Form1Page from "@/features/onboarding/container/form1";
import Form2Page from "@/features/onboarding/container/form2";
import { OnboardingFormData } from "@/types/onboarding";
import Form3Page from "@/features/onboarding/container/form3";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const router = useRouter();

  const methods = useForm<OnboardingFormData>({
    defaultValues: {
      nama: "",
      password: "",
      confirmPassword: "",
      role: null,
      jurusan: "",
      nomor_pengenal: "",
      no_hp: "",
    },
    mode: "onSubmit",
  });

  // ambil draft dari register page
  useEffect(() => {
    const savedDraft = sessionStorage.getItem("register-draft");

    if (!savedDraft) {
      router.replace("/register");
      return;
    }

    const parsedDraft: OnboardingFormData = JSON.parse(savedDraft);

    methods.reset({
      ...methods.getValues(),
      nama: parsedDraft.nama,
      password: parsedDraft.password,
      confirmPassword: parsedDraft.confirmPassword,
    });
  }, [methods, router]);

  return (
    <FormProvider {...methods}>
      <section data-theme="light" className="min-h-screen flex overflow-hidden">
        {/* left section */}
        <aside className="hidden w-[340px] lg:flex flex-col bg-blue-400/60 px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex justify-start"
          >
            <Link href="/" className="text-2xl font-bold text-black">
              ETC
            </Link>
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
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
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
              className="mt-3 text-sm leading-relaxed text-neutral-800/70"
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
            <p className="font-medium text-neutral-900">Butuh bantuan?</p>

            <p className="text-sm text-neutral-800/70">
              Jika ada kendala, kami siap membantu Anda melanjutkan proses ini.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Button>Contact us</Button>
            </div>
          </motion.div>
        </aside>

        {/* right section */}
        <main
          data-theme="light"
          className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-white px-8"
        >
          {step === 1 && <Form1Page setStep={setStep} />}
          {step === 2 && <Form2Page setStep={setStep} />}
          {step === 3 && <Form3Page setStep={setStep} />}
        </main>
      </section>
    </FormProvider>
  );
}
