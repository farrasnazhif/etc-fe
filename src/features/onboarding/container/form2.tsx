"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/toaster";
import Select from "@/components/ui/select";

export default function Form2Page({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();
  const { addToast } = useToast();

  // alias biar tidak bentrok dengan register dari react-hook-form
  const { register: registerUser } = useAuth();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const role = watch("role");

  async function handleFinalSubmit(data: OnboardingFormData) {
    try {
      await registerUser.mutateAsync({
        nama: data.nama,
        password: data.password,
        role: data.role!,
        jurusan: data.role === "dosen" ? undefined : data.jurusan,
        no_pengenal: data.nomor_pengenal,
        no_telp: data.no_hp,
      });

      sessionStorage.removeItem("register-draft");

      addToast("Berhasil membuat akun!", "success");
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login gagal. Coba lagi.";

      addToast(message, "error");
    }
  }

  function handleNextStep() {
    setStep(3);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-screen w-full items-center justify-center md:px-4"
    >
      <form
        onSubmit={
          role === "dosen"
            ? handleSubmit(handleFinalSubmit)
            : handleSubmit(handleNextStep)
        }
        className="flex w-full max-w-md flex-col items-center justify-center text-start md:p-8"
      >
        {/* header */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-semibold text-neutral-900"
        >
          Lengkapi data diri
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mt-2 text-sm text-neutral-500"
        >
          Masukkan data identitas Anda
        </motion.p>

        {/* fields */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1,
              },
            },
          }}
          className="w-full"
        >
          {/* jurusan */}
          {role !== "dosen" && (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="mt-6 w-full"
            >
              <Select
                label="Jurusan"
                placeholder="Pilih jurusan"
                options={[
                  {
                    label: "Teknik Informatika",
                    value: "Teknik Informatika",
                  },
                  {
                    label: "Rekayasa Perangkat Lunak",
                    value: "Rekayasa Perangkat Lunak",
                  },
                  {
                    label: "Rekayasa Kecerdasan Artificial",
                    value: "Rekayasa Kecerdasan Artificial",
                  },
                ]}
                {...register("jurusan", {
                  required: "Jurusan wajib diisi",
                })}
                error={errors.jurusan?.message}
                className="w-full"
                required
              />
            </motion.div>
          )}

          {/* nomor pengenal */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="mt-4 w-full"
          >
            <Input
              label={role === "dosen" ? "NIP" : "NRP"}
              placeholder={role === "dosen" ? "Masukkan NIP" : "Masukkan NRP"}
              {...register("nomor_pengenal", {
                required:
                  role === "dosen" ? "NIP wajib diisi" : "NRP wajib diisi",
                pattern: {
                  value: /^[0-9]+$/,
                  message:
                    role === "dosen"
                      ? "NIP hanya boleh angka"
                      : "NRP hanya boleh angka",
                },
              })}
              error={errors.nomor_pengenal?.message}
              className="w-full"
              required
            />
          </motion.div>

          {/* no hp */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="mt-6 w-full"
          >
            <Input
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              {...register("no_hp", {
                required: "Nomor telepon wajib diisi",
              })}
              error={errors.no_hp?.message}
              className="w-full"
              required
            />
          </motion.div>
        </motion.div>

        {/* actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 flex w-full gap-3"
        >
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setStep(1)}
          >
            Kembali
          </Button>

          <Button
            type="submit"
            className="flex-1"
            disabled={registerUser.isPending}
          >
            {registerUser.isPending
              ? "Memproses..."
              : role === "dosen"
                ? "Submit"
                : "Lanjutkan"}
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
