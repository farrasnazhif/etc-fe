"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useToast } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import api from "@/lib/api";

import { Lightbulb, Eye } from "lucide-react";
import RekrutmenCard from "@/components/ui/rekrutmen-card";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";

function BuatPostinganContent() {
  const router = useRouter();
  const { addToast } = useToast();
  const { user, isAuthenticated, isLoadingUser } = useAuth();

  const [formData, setFormData] = useState({
    kegiatan: "projek",
    tanggal_mulai: "",
    tanggal_selesai: "",
    kriteria: "",
    fee: "",
    role: "",
    contact_person: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      addToast("Anda harus login untuk memposting.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const formatTanggal = (dateStr: string) => {
        if (!dateStr) return "";
        return `${dateStr}T00:00:00Z`;
      };

      await api.post("/api/rekrutmen", {
        kegiatan: formData.kegiatan,
        Kriteria: formData.kriteria,
        tanggal_mulai: formatTanggal(formData.tanggal_mulai),
        tanggal_selesai: formatTanggal(formData.tanggal_selesai),
        fee: parseInt(formData.fee) || 0,
        role: formData.role,
        contact_person: formData.contact_person,
      });

      addToast("Peluang rekrutmen berhasil dipublikasikan!", "success");
      router.push("/feed");
    } catch (error: unknown) {
      // Menggunakan unknown untuk menghindari 'any'
      const err = error as {
        response?: { data?: { message?: string } & Record<string, unknown> };
        message?: string;
      };

      const errorMessage =
        err.response?.data?.message ||
        (err.response?.data
          ? JSON.stringify(err.response.data)
          : err.message) ||
        "Terjadi kesalahan pada server";

      console.error("Detail Ditolak Backend:", errorMessage);
      addToast(`Validasi Gagal: ${errorMessage}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return (
      <DashboardLayout withNavbar>
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-sm font-medium text-black/60 italic">
              Memverifikasi sesi...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout withNavbar>
        <main className="min-h-screen px-2 py-2 md:px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-black mb-2">
                Buat Rekrutmen
              </h1>
              <p className="text-black/60 text-sm">
                Tentukan detail rekrutmen Anda berdasarkan kriteria, peran, dan
                durasi yang dibutuhkan.
              </p>
            </div>

            <div className="rounded-md border border-border bg-card py-20 text-center shadow-xs">
              <h3 className="mb-2 text-lg font-medium text-primary">
                Kamu belum login
              </h3>

              <p className="mb-6 text-muted-foreground">
                Login terlebih dahulu untuk membuat dan mempublikasikan
                rekrutmen baru.
              </p>

              <div data-theme="light">
                <Button
                  onClick={() => router.push("/login")}
                  variant="primary"
                  className="px-8"
                >
                  Login Sekarang
                </Button>
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  const previewData = {
    rekrutmen_id: "preview",

    kegiatan: formData.kegiatan || "projek",

    role: formData.role || "Peran belum diisi",

    Kriteria:
      formData.kriteria || "Deskripsi dan kriteria akan tampil di sini.",

    tanggal_mulai: formData.tanggal_mulai
      ? `${formData.tanggal_mulai}T00:00:00Z`
      : new Date().toISOString(),

    tanggal_selesai: formData.tanggal_selesai
      ? `${formData.tanggal_selesai}T00:00:00Z`
      : new Date().toISOString(),

    fee: Number(formData.fee) || 0,

    contact_person: formData.contact_person || "Kontak person",

    user_id: user?.user_id || "preview-user",
  };

  return (
    <DashboardLayout withNavbar>
      <main className="min-h-screen  px-2 py-2 md:px-4 text-black">
        <div className="mx-auto max-w-[1200px]">
          {/* <div className="flex items-center gap-2 text-sm font-medium mb-6">
            <Link
              href="/feed"
              className="text-black/50 hover:text-primary transition-colors"
            >
              Feed Rekrutmen
            </Link>
            <ChevronRight size={14} className="text-black/30" />
            <span className="text-primary font-bold">Buat Postingan Baru</span>
          </div> */}

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-black mb-2">
              Buat Rekrutmen
            </h1>
            <p className="text-black/60 text-sm">
              Tentukan detail rekrutmen Anda berdasarkan kriteria, peran, dan
              durasi yang dibutuhkan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <section className="lg:col-span-2">
              <div className="rounded-md border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
                <form
                  data-theme="light"
                  onSubmit={handleSubmit}
                  className="space-y-8 w-full"
                >
                  {/* jenis kegiatan + kontak person */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
                    <div className="w-full min-w-0">
                      <Select
                        label="Jenis Kegiatan"
                        value={formData.kegiatan}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            kegiatan: e.target.value,
                          }))
                        }
                        required
                        className="w-full"
                        options={[
                          {
                            label: "Riset",
                            value: "riset",
                          },
                          {
                            label: "Proyek IT",
                            value: "projek",
                          },
                          {
                            label: "Lomba/Kompetisi",
                            value: "lomba",
                          },
                        ]}
                      />
                    </div>

                    <div className="w-full min-w-0">
                      <Input
                        label="Kontak Person"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        placeholder="Contoh: 08123456789 atau email@its.ac.id"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* kriteria */}
                  <div className="w-full">
                    <TextArea
                      label="Kriteria & Deskripsi"
                      name="kriteria"
                      value={formData.kriteria}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Jelaskan spesifikasi, metodologi, dan persyaratan yang dibutuhkan..."
                      required
                      className="w-full"
                    />
                  </div>

                  {/* tanggal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
                    <div className="w-full min-w-0">
                      <Input
                        type="date"
                        label="Tanggal Mulai"
                        name="tanggal_mulai"
                        value={formData.tanggal_mulai}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="w-full min-w-0">
                      <Input
                        type="date"
                        label="Tanggal Selesai"
                        name="tanggal_selesai"
                        value={formData.tanggal_selesai}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* role + fee */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
                    <div className="w-full min-w-0">
                      <Input
                        label="Peran yang Dibutuhkan"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Contoh: UI/UX, Data Analyst"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="w-full min-w-0">
                      <Input
                        type="number"
                        label="Honorarium / Fee (Rp)"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        placeholder="Contoh: 500000 (Kosongi jika tidak ada)"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* actions */}
                  <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      type="button"
                      className="w-full sm:w-auto font-bold"
                      onClick={() => router.back()}
                    >
                      Batal
                    </Button>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-full sm:w-auto font-bold px-6"
                      isLoading={isSubmitting}
                    >
                      Publikasikan Postingan
                    </Button>
                  </div>
                </form>
              </div>
            </section>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-indigo-600 rounded-md p-6 text-white shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                    <Lightbulb size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-sm tracking-wide">
                    Tips Rekrutmen
                  </h3>
                </div>
                <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
                  Proyek dengan peran yang spesifik dan tenggat waktu yang jelas
                  menerima{" "}
                  <span className="font-bold text-white">40% lebih banyak</span>{" "}
                  lamaran berkualitas tinggi.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex -space-x-3">
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-blue-400 flex items-center justify-center text-[10px] font-bold">
                      A
                    </div>
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-emerald-400 flex items-center justify-center text-[10px] font-bold">
                      R
                    </div>
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-amber-400 flex items-center justify-center text-[10px] font-bold">
                      K
                    </div>
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-white/20 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm">
                      +12
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
                    Peneliti Aktif di Sekitar Anda
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-md p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-6">
                  <Eye size={18} className="text-black/50" />

                  <h3 className="font-bold text-sm text-black/70">
                    Pratinjau Langsung
                  </h3>
                </div>

                <div className=" scale-[0.92] origin-top ">
                  <RekrutmenCard item={previewData} href="#" />
                </div>

                <p className="text-center text-xs text-black/40 italic mt-3 font-medium">
                  Postingan Anda akan terlihat seperti ini di feed rekrutmen.
                </p>
              </div>

              <div className="bg-blue-300/20 border-l-4 border-indigo-600 p-6">
                <h3 className="font-bold text-sm mb-2 text-black">
                  Ketentuan Institusi
                </h3>
                <p className="text-xs text-black/60 leading-relaxed font-medium">
                  Dengan mempublikasikan, Anda menyetujui{" "}
                  <a
                    href="#"
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Kebijakan Etika Riset
                  </a>{" "}
                  dan standar kolaboratif institusi kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(BuatPostinganContent), {
  ssr: false,
});
