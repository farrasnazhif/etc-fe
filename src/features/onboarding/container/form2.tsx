"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";
import { motion } from "motion/react";

export default function Form2Page({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const role = watch("role");

  const onSubmit = () => {
    setStep(3);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-screen w-full items-center justify-center px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col justify-center items-center p-8 text-start"
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
          Masukkan nama dan NRP Anda
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
          {/* input nama */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="mt-6 w-full"
          >
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
          </motion.div>

          {/* input jurusan */}
          {role !== "dosen" && (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="mt-6 w-full"
            >
              <Input
                label="Jurusan"
                placeholder="Masukkan jurusan"
                {...register("jurusan", {
                  required: "Jurusan wajib diisi",
                })}
                error={errors.jurusan?.message}
                className="w-full"
                required
              />
            </motion.div>
          )}

          {/* input nomor pengenal */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="mt-4 w-full"
          >
            <Input
              label={role === "dosen" ? "NIND" : "NRP"}
              placeholder={role === "dosen" ? "Masukkan NIND" : "Masukkan NRP"}
              {...register("nomor_pengenal", {
                required:
                  role === "dosen" ? "NIND wajib diisi" : "NRP wajib diisi",
                pattern: {
                  value: /^[0-9]+$/,
                  message:
                    role === "dosen"
                      ? "NIND hanya boleh angka"
                      : "NRP hanya boleh angka",
                },
              })}
              error={errors.nomor_pengenal?.message}
              className="w-full"
              required
            />
          </motion.div>

          {/* input no hp */}
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
          className="mt-6 flex gap-3 w-full"
        >
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setStep(1)}
          >
            Kembali
          </Button>

          <Button type="submit" className="flex-1">
            Submit
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
