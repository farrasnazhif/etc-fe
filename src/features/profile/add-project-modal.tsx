// src/features/profile/add-project-modal.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { Briefcase, X, Code, Link as LinkIcon } from "lucide-react";

type AddProjectForm = {
  nama: string;
  deskripsi: string;
  teknologi: string;
  tautan: string;
};

type AddProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // onSave: (data: AddProjectForm) => Promise<void> | void;
};

export default function AddProjectModal({
  isOpen,
  onClose,
  // onSave,
}: AddProjectModalProps) {
  const [form, setForm] = useState<AddProjectForm>({
    nama: "",
    deskripsi: "",
    teknologi: "",
    tautan: "",
  });

  if (!isOpen) return null;

  const handleChange = (field: keyof AddProjectForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await onSave(form);

    setForm({
      nama: "",
      deskripsi: "",
      teknologi: "",
      tautan: "",
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Briefcase size={18} className="text-indigo-600" />
            Tambah Proyek Baru
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* nama proyek */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nama Proyek <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                required
                value={form.nama}
                onChange={(e) => handleChange("nama", e.target.value)}
                placeholder="Contoh: Campus Lost & Found"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
              />
            </div>

            {/* deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Deskripsi Proyek <span className="text-red-500">*</span>
              </label>

              <textarea
                required
                rows={3}
                value={form.deskripsi}
                onChange={(e) => handleChange("deskripsi", e.target.value)}
                placeholder="Ceritakan singkat tentang proyek ini dan peranmu..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm resize-y"
              />
            </div>

            {/* teknologi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Teknologi yang Digunakan
              </label>

              <div className="relative">
                <Code
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={form.teknologi}
                  onChange={(e) => handleChange("teknologi", e.target.value)}
                  placeholder="Contoh: Next.js, Go, PostgreSQL"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
                />
              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                Pisahkan masing-masing teknologi dengan tanda koma.
              </p>
            </div>

            {/* tautan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tautan Proyek (Opsional)
              </label>

              <div className="relative">
                <LinkIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="url"
                  value={form.tautan}
                  onChange={(e) => handleChange("tautan", e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 pt-4 mt-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Batal
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Simpan Proyek
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
