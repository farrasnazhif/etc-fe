"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/toaster";
import axios from "axios";

export default function LoginPage() {
  const [noPengenal, setNoPengenal] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();
  const { addToast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!noPengenal || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    try {
      setError("");

      // const result = await login.mutateAsync({
      //   no_pengenal: noPengenal,
      //   password,
      // });

      await login.mutateAsync({
        no_pengenal: noPengenal,
        password,
      });

      // // redirect berdasarkan role
      // if (result?.role === "dosen") {
      //   router.push("/profile");
      //   return;
      // }

      addToast("Login berhasil!", "success");
      router.push("/feed");
    } catch (err) {
      let rawMessage = "Login gagal. Coba lagi.";

      // check backend error response
      if (axios.isAxiosError(err)) {
        rawMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message;
      } else if (err instanceof Error) {
        rawMessage = err.message;
      }

      const message = rawMessage.toLowerCase();

      if (err instanceof Error && err.message.includes("400")) {
        setError("NRP/NIP atau password salah.");
        addToast("NRP/NIP atau password salah.", "error");
        return;
      }

      if (
        message.includes("credentials salah") ||
        message.includes("credential") ||
        message.includes("invalid") ||
        message.includes("unauthorized") ||
        message.includes("password") ||
        message.includes("nrp") ||
        message.includes("nip")
      ) {
        setError("NRP/NIP atau password salah.");
        addToast("NRP/NIP atau password salah.", "error");
        return;
      }

      setError(rawMessage);
      addToast(rawMessage, "error");
    }
  }

  return (
    <main
      data-theme="light"
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-blue-50 to-white"
    >
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Masuk ke ETC</h1>
          <p className="text-sm text-gray-500 mt-2">
            Masukkan NRP/NIP dan password Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nomor Pengenal"
            placeholder="Masukkan NRP / NIP"
            value={noPengenal}
            onChange={(e) => setNoPengenal(e.target.value)}
            className="w-full"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />

          {error && <p className="text-sm text-error">{error}</p>}

          <Button className="w-full" type="submit" disabled={login.isPending}>
            {login.isPending ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Daftar
          </Link>
        </p>
      </div>
    </main>
  );
}
