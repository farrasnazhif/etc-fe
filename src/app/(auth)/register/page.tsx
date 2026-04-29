"use client";

import Link from "next/link";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { OnboardingFormData } from "@/types/onboarding";

export default function RegisterPage() {
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

  function handleContinueToOnboarding(data: OnboardingFormData) {
    if (data.password !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        message: "Password tidak cocok",
      });
      return;
    }

    // simpan sementara agar /onboarding bisa lanjut
    sessionStorage.setItem("register-draft", JSON.stringify(data));

    // pindah ke onboarding page
    router.push("/onboarding");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-white px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Daftar ke ETC</h1>
          <p className="text-sm text-gray-500">
            Buat akun untuk mulai berkolaborasi
          </p>
        </div>

        <FormProvider {...methods}>
          <RegisterForm
            onSubmit={methods.handleSubmit(handleContinueToOnboarding)}
          />
        </FormProvider>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

function RegisterForm({ onSubmit }: { onSubmit: () => void }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  return (
    <form data-theme="light" onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap"
        {...register("nama", {
          required: "Nama wajib diisi",
        })}
        error={errors.nama?.message}
        className="w-full"
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register("password", {
          required: "Password wajib diisi",
          minLength: {
            value: 6,
            message: "Minimal 6 karakter",
          },
        })}
        error={errors.password?.message}
        className="w-full"
        required
      />

      <Input
        label="Konfirmasi Password"
        type="password"
        placeholder="••••••••"
        {...register("confirmPassword", {
          required: "Konfirmasi password wajib diisi",
        })}
        error={errors.confirmPassword?.message}
        className="w-full"
        required
      />

      <Button className="w-full" type="submit">
        Lanjutkan
      </Button>
    </form>
  );
}
