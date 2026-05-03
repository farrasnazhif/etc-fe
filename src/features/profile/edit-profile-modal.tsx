"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import {
  User,
  Settings,
  Mail,
  Plus,
  X,
  Briefcase,
  Phone,
  BookOpen,
} from "lucide-react";

type EditProfileForm = {
  nama: string;
  jurusan: string;
  no_telp: string;
  spesialisasi: string[];
};

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
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
  onSave,
  user,
}: EditProfileModalProps) {
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

  const handleRemoveSkill = (skillToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      spesialisasi: prev.spesialisasi.filter(
        (skill) => skill !== skillToRemove,
      ),
    }));
  };

  const handleAddSkill = () => {
    const skill = prompt("Tambah keahlian baru:");

    if (!skill?.trim()) return;
    if (form.spesialisasi.includes(skill)) return;

    setForm((prev) => ({
      ...prev,
      spesialisasi: [...prev.spesialisasi, skill],
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
          <div className="mt-6 flex h-full flex-col justify-end space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
              <Settings size={18} />
              Settings
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
              <Mail size={18} />
              Contact Us
            </button>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => handleChange("nama", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Jurusan
                  </label>

                  <div className="relative">
                    <BookOpen
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={form.jurusan}
                      onChange={(e) => handleChange("jurusan", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* contact */}
            <div className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Phone size={18} />
                Contact Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  No. Telepon
                </label>

                <input
                  type="text"
                  value={form.no_telp}
                  onChange={(e) => handleChange("no_telp", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary outline-none text-sm"
                />
              </div>
            </div>

            {/* expertise */}
            <div className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase size={18} />
                Expertise & Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {form.spesialisasi.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
                  >
                    {skill}

                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}

                <button
                  onClick={handleAddSkill}
                  className="flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 hover:border-primary hover:text-primary"
                >
                  <Plus size={14} />
                  Add Skill
                </button>
              </div>
            </div>
          </div>

          {/* footer */}
          <div
            data-theme="light"
            className="px-8 py-4 border-t border-slate-200 bg-white flex justify-end gap-3"
          >
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>

            <Button variant="primary" onClick={handleSave}>
              Save Profile
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
