"use client";

import Button from "@/components/ui/button";
import StepIndicator from "@/features/onboarding/components/step";
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
      nomor_pengenal: null,
    },
  });

  return (
    <section className="min-h-screen flex overflow-hidden">
      {/* left section (step indicator) */}
      <aside className="w-[340px] hidden lg:flex flex-col  bg-blue-500/60 px-8 py-10">
        {/* stepper */}
        <div className="mt-8 flex-1 flex justify-center">
          <StepIndicator activeStep={step} />
        </div>

        {/* help card */}
        <div className="mt-8 space-y-3">
          <h1 className="font-bold text-xl leading-none">ETC</h1>

          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Need help?
          </p>

          <p className="text-sm text-neutral-900 dark:text-neutral-100">
            If something doesn’t feel right, we’re here to help you move
            forward.
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
