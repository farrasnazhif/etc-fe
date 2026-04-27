"use client";

import Form1Page from "@/features/onboarding/container/form1";
import { OnboardingFormData } from "@/types/onboarding";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const methods = useForm<OnboardingFormData>({
    defaultValues: {
      role: null,
      name: "",
    },
  });

  return (
    <FormProvider {...methods}>
      {step === 1 && <Form1Page setStep={setStep} />}
    </FormProvider>
  );
}
