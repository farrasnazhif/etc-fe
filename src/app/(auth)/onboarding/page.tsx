"use client";

import Button from "@/components/ui/button";
import Form1Page from "@/features/onboarding/container/form1";
import Form2Page from "@/features/onboarding/container/form2";
import { OnboardingFormData } from "@/types/onboarding";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
        {/* stepper */}
        <div className=" flex justify-start">
          <h1 className="font-bold text-2xl leading-none">ETC</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold leading-snug text-blue-900">
            Beberapa langkah lagi untuk membangun
            <br />
            kolaborasimu.
          </h1>

          <p className="mt-3 text-neutral-800/70 text-sm leading-relaxed">
            Temukan tim yang sesuai.
            <br />
            Mulai kolaborasi dengan lebih mudah.
          </p>
        </div>

        {/* help card */}
        <div className="mt-8 space-y-3">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Butuh bantuan?
          </p>

          <p className="text-sm text-neutral-800/70 dark:text-neutral-100">
            Jika ada kendala, kami siap membantu Anda melanjutkan proses ini.
          </p>

          <div className="flex gap-2 items-center mt-4">
            <Button>Contact us</Button>
          </div>
        </div>
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
