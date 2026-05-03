"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import {
  User,
  Settings,
  Plus,
  X,
  Briefcase,
  Phone,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import Input from "@/components/ui/input";
import Link from "next/link";

type EditProfileForm = {
  nama: string;
  jurusan: string;
  no_telp: string;
  spesialisasi: string[];
};

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSave: (data: EditProfileForm) => Promise<void> | void;
  user: {
    nama?: string;
    jurusan?: string;
    no_telp?: string;
    role?: string;
    spesialisasi?: string[];
  } | null;
};

export default function EditProfileModal({
  isOpen,
  onClose,
  isLoading,
  onSave,
  user,
}: EditProfileModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [form, setForm] = useState<EditProfileForm>({
    nama: user?.nama || "",
    jurusan: user?.jurusan || "",
    no_telp: user?.no_telp || "",
    spesialisasi: user?.spesialisasi || [],
  });

  if (!isOpen) return null;

  const handleChange = (
    field: keyof EditProfileForm,
    value: string | string[],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSpesialisasi = () => {
    const value = inputValue.trim();

    if (!value) return;

    if (form.spesialisasi.includes(value)) {
      setInputValue("");

      return;
    }

    setForm((prev) => ({
      ...prev,

      spesialisasi: [...prev.spesialisasi, value],
    }));

    setInputValue("");
  };

  const removeSpesialisasi = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,

      spesialisasi: prev.spesialisasi.filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };
  const handleSave = async () => {
    await onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-md shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200">
        {/* sidebar */}
        <aside className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-6 flex flex-col">
          {/* profile preview */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-slate-200">
            <div className="relative h-24 w-24">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-black">
                {(form.nama?.charAt(0) || "U").toUpperCase()}
              </div>
              {/* 
              <button
                // onClick={handleUbahFoto}

                className="absolute -bottom-1 -right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border-1 border-white bg-primary text-white shadow-lg transition-transform cursor-pointer"
              >
                <UserPen size={14} />
              </button> */}
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {form.nama || "Nama User"}
            </h3>

            <p className="text-sm text-slate-500 uppercase">
              {user?.role || "Mahasiswa"}
            </p>
          </div>

          {/* navigation */}
          <div className="mt-6 flex h-full flex-col justify-end space-y-3">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >
              <Settings className="size-4" />
              Settings
            </Link>

            <Link
              href="/support"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >
              <HelpCircle className="size-4" />
              Support
            </Link>
          </div>
        </aside>

        {/* main content */}
        <section className="flex-1 flex flex-col overflow-hidden">
          {/* header */}
          <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>

              <p className="text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>
          </div>

          {/* body */}
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50 space-y-6">
            {/* personal info */}
            <div className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User size={18} />
                Personal Identity
              </h3>

              <div
                data-theme="light"
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <Input
                  label="Full Name"
                  value={form.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full"
                  required
                />

                <Input
                  label="Jurusan"
                  value={form.jurusan}
                  onChange={(e) => handleChange("jurusan", e.target.value)}
                  placeholder="Masukkan jurusan"
                  leftIcon={BookOpen}
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* contact */}
            <div
              data-theme="light"
              className="rounded-md border border-slate-200 bg-white p-6"
            >
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Phone size={18} />
                Contact Information
              </h3>

              <Input
                label="No. Telepon"
                value={form.no_telp}
                onChange={(e) => handleChange("no_telp", e.target.value)}
                placeholder="Masukkan nomor telepon"
                leftIcon={Phone}
                className="w-full"
                required
              />
            </div>

            {/* expertise */}
            <div className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase size={18} />
                Expertise & Skills
              </h3>

              {/* input tambah */}
              <div data-theme="light" className="flex w-full items-end gap-2">
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
                {form.spesialisasi.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
                  >
                    <span>{item}</span>

                    <button
                      type="button"
                      onClick={() => removeSpesialisasi(index)}
                      className="transition hover:scale-110 hover:text-red-500"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* footer */}
          <div
            data-theme="light"
            className="px-8 py-4 border-t border-slate-200 bg-white flex justify-end gap-3"
          >
            <Button variant="error" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save Profile
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
