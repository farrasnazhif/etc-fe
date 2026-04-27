"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { GraduationCap, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";

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
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex w-full max-w-md flex-col items-center
          p-8 text-center
        "
      >
        {/* header */}
        <h1 className="text-2xl font-semibold text-neutral-900">
          Anda mahasiswa atau dosen?
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Pilih peran untuk melanjutkan
        </p>

        {/* options */}
        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          {/* mahasiswa */}
          <button
            type="button"
            onClick={() => setValue("role", "mahasiswa")}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition",
              role === "mahasiswa"
                ? "border-blue-500 bg-blue-50"
                : "border-neutral-300 hover:bg-neutral-50",
            )}
          >
            <GraduationCap className="size-6 text-blue-600" />
            <span className="text-sm font-medium">Mahasiswa</span>
          </button>

          {/* dosen */}
          <button
            type="button"
            onClick={() => setValue("role", "dosen")}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition",
              role === "dosen"
                ? "border-blue-500 bg-blue-50"
                : "border-neutral-300 hover:bg-neutral-50",
            )}
          >
            <User className="size-6 text-blue-600" />
            <span className="text-sm font-medium">Dosen</span>
          </button>
        </div>

        {/* action */}
        <Button type="submit" className="mt-6 w-full" disabled={!role}>
          Lanjutkan
        </Button>

        <p className="mt-4 text-xs text-neutral-400">
          Anda dapat mengubahnya nanti
        </p>
      </form>
    </div>
  );
}
