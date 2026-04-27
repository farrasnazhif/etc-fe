"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    setError("");

    // TODO: handle login
    console.log({ email, password });
  }

  return (
    <main
      data-theme="light"
      className="min-h-screen flex items-center justify-center  px-4 bg-gradient-to-b from-blue-100 via-blue-50 to-white"
    >
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Masuk ke ETC</h1>
          <p className="text-sm text-gray-500">
            Masukkan email dan password kamu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Button className="w-full" type="submit">
            Login
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
