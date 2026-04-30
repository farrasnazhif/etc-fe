"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Plus, X } from "lucide-react";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/toaster";

export default function Form3Page({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const { addToast } = useToast();

  const { handleSubmit, watch, setValue } =
    useFormContext<OnboardingFormData>();

  const spesialisasi = watch("spesialisasi") || [];
  const [inputValue, setInputValue] = useState("");

  function addSpesialisasi() {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;

    // hindari duplikat
    if (spesialisasi.includes(trimmedValue)) {
      setInputValue("");
      return;
    }

    setValue("spesialisasi", [...spesialisasi, trimmedValue]);
    setInputValue("");
  }

  function removeSpesialisasi(index: number) {
    setValue(
      "spesialisasi",
      spesialisasi.filter((_, i) => i !== index),
    );
  }

  async function handleFinalSubmit(data: OnboardingFormData) {
    try {
      await registerUser.mutateAsync({
        nama: data.nama,
        password: data.password,
        role: data.role!,
        jurusan: data.jurusan,
        no_pengenal: data.nomor_pengenal,
        no_telp: data.no_hp,
        spesialisasi: data.spesialisasi || undefined,
      });

      sessionStorage.removeItem("register-draft");

      addToast("Berhasil membuat akun!", "success");
      router.push("/feed");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login gagal. Coba lagi.";

      addToast(message, "error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen w-full items-center justify-center md:px-4"
    >
      <form
        onSubmit={handleSubmit(handleFinalSubmit)}
        className="flex w-full max-w-md flex-col items-center justify-center md:p-8"
      >
        {/* header */}
        <h1 className="text-2xl font-semibold text-neutral-900">
          Pilih spesialisasi
        </h1>

        <p className="mt-2 text-center text-sm text-neutral-500">
          Tambahkan bidang yang paling sesuai dengan kemampuanmu
        </p>

        {/* input tambah */}
        <div className="mt-6 flex w-full justify-center items-end gap-2">
          <Input
            label="Spesialisasi"
            placeholder="Contoh: Frontend, UI/UX, Machine Learning"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
          />

          <Button
            type="button"
            onClick={addSpesialisasi}
            className="h-[40px] px-4 shadow-none"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        {/* chips */}
        <div className="mt-4 flex w-full flex-wrap gap-2">
          {spesialisasi.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => removeSpesialisasi(index)}
                className="transition hover:scale-110"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>

        {/* hint */}
        <p className="mt-3 w-full text-left text-xs text-neutral-400">
          Tambahkan minimal 1 spesialisasi
        </p>

        {/* actions */}
        <div className="mt-8 flex w-full gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setStep(2)}
          >
            Kembali
          </Button>

          <Button
            type="submit"
            className="flex-1"
            disabled={registerUser.isPending || spesialisasi.length === 0}
          >
            {registerUser.isPending ? "Memproses..." : "Sumbit"}
          </Button>
        </div>

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
