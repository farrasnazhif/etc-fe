"use client";

import DropzoneInput from "@/components/ui/dropzone-input";
import FileUpload from "@/components/ui/file-upload";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { Mail, Lock, Search } from "lucide-react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 text-center">
      <h2 className="text-xl font-semibold text-base-content">{title}</h2>
      {children}
    </section>
  );
}

export default function InputSandboxPage() {
  return (
    <main
      data-theme="light"
      className="min-h-screen bg-base-200 px-8 py-16 flex flex-col items-center gap-12"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-base-content">
          ETC Input Sandbox
        </h1>
        <p className="text-base-content/70">
          Preview variasi input memakai daisyUI
        </p>
      </div>

      <Section title="Basic">
        <Input placeholder="Masukkan teks..." />
      </Section>

      <Section title="With Label">
        <Input label="Email" placeholder="email@example.com" />
      </Section>

      <Section title="With Label Required">
        <Input label="Email" placeholder="email@example.com" required />
      </Section>

      <Section title="With Icons">
        <Input label="Email" placeholder="email@example.com" leftIcon={Mail} />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={Lock}
        />

        <Input placeholder="Cari tim..." leftIcon={Search} />
      </Section>

      <Section title="Error State">
        <Input
          label="Email"
          placeholder="email@example.com"
          error="Format email tidak valid"
        />
      </Section>

      <Section title="Helper Text">
        <Input
          label="Username"
          placeholder="username"
          helperText="Gunakan minimal 6 karakter"
        />
      </Section>

      <Section title="Disabled">
        <Input label="Disabled" placeholder="Tidak bisa diisi" disabled />
      </Section>

      <Section title="Select Input">
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
        />

        <Select
          label="Jurusan Required"
          placeholder="Pilih jurusan"
          required
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
        />

        <Select
          label="Error State"
          placeholder="Pilih jurusan"
          error="Jurusan wajib dipilih"
          options={[
            {
              label: "Teknik Informatika",

              value: "Teknik Informatika",
            },

            {
              label: "Rekayasa Perangkat Lunak",

              value: "Rekayasa Perangkat Lunak",
            },
          ]}
        />

        <Select
          label="Helper Text"
          placeholder="Pilih jurusan"
          helperText="Pilih sesuai program studi Anda"
          options={[
            {
              label: "Teknik Informatika",

              value: "Teknik Informatika",
            },

            {
              label: "Rekayasa Perangkat Lunak",

              value: "Rekayasa Perangkat Lunak",
            },
          ]}
        />

        <Select
          label="Disabled"
          placeholder="Tidak tersedia"
          disabled
          options={[
            {
              label: "Teknik Informatika",

              value: "Teknik Informatika",
            },
          ]}
        />
      </Section>

      <Section title="File Upload">
        <FileUpload
          label="Upload Proposal"
          required
          helperText="Format PDF, maksimal 5MB"
        />

        <FileUpload label="Upload CV" accept=".pdf" />

        <FileUpload label="Upload Gambar" accept="image/*" />

        <FileUpload label="Error State" error="File wajib diupload" />

        <FileUpload label="Disabled" disabled />
      </Section>

      <Section title="Dropzone Input">
        <DropzoneInput
          label="Upload Proposal"
          required
          helperText="Format PDF, max 5MB"
        />

        <DropzoneInput label="Upload CV" accept=".pdf" />

        <DropzoneInput label="Error State" error="File wajib diupload" />
      </Section>
    </main>
  );
}
