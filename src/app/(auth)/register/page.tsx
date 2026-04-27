"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function validate() {
    const newError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!email) newError.email = "Email wajib diisi";

    if (!password) newError.password = "Password wajib diisi";
    else if (password.length < 6) newError.password = "Minimal 6 karakter";

    if (!confirmPassword)
      newError.confirmPassword = "Konfirmasi password wajib diisi";
    else if (password !== confirmPassword)
      newError.confirmPassword = "Password tidak cocok";

    setError(newError);

    return !newError.email && !newError.password && !newError.confirmPassword;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    // TODO: handle register
    console.log({ email, password });
  }

  return (
    <main
      data-theme="light"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-white px-4"
    >
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Daftar ke ETC</h1>
          <p className="text-sm text-gray-500">
            Buat akun untuk mulai berkolaborasi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
            className="w-full"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
            className="w-full"
            required
          />

          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error.confirmPassword}
            className="w-full"
            required
          />

          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
