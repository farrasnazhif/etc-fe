"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";

export default function Form2Page({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const onSubmit = () => {
    setStep(3);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col justify-center items-center p-8 text-start"
      >
        {/* header */}
        <h1 className="text-2xl font-semibold text-neutral-900">
          Lengkapi data diri
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Masukkan nama dan NRP Anda
        </p>

        {/* input nama */}
        <div className="mt-6 w-full">
          <Input
            label="Nama"
            placeholder="Masukkan nama lengkap"
            {...register("name", {
              required: "Nama wajib diisi",
            })}
            error={errors.name?.message}
            className="w-full"
            required
          />
        </div>

        {/* input nrp */}
        <div className="mt-4 w-full">
          <Input
            label="NRP"
            placeholder="Contoh: 5025221234"
            {...register("nomor_pengenal", {
              required: "NRP wajib diisi",
              pattern: {
                value: /^[0-9]+$/,
                message: "NRP hanya boleh angka",
              },
            })}
            error={errors.nomor_pengenal?.message}
            className="w-full"
            required
          />
        </div>

        {/* actions */}
        <div className="mt-6 flex gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setStep(1)}
          >
            Kembali
          </Button>

          <Button type="submit" className="flex-1">
            Lanjutkan
          </Button>
        </div>
      </form>
    </div>
  );
}
