"use client";

import Link from "next/link";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

import { 
  ChevronRight, 
  Lightbulb, 
  Eye, 
  Trash2, 
  Plus 
} from "lucide-react";

export default function BuatPostinganPage() {
  return (
    <DashboardLayout withNavbar withSidebar>
      <main data-theme="light" className="min-h-screen bg-base-200/30 p-4 md:p-8 text-base-content font-sans">
        <div className="mx-auto max-w-[1200px]">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-medium mb-6">
            <Link href="/feed" className="text-base-content/50 hover:text-primary transition-colors">
              Feed Rekrutmen
            </Link>
            <ChevronRight size={14} className="text-base-content/30" />
            <span className="text-primary font-bold">Buat Postingan Baru</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-base-content mb-2">Buat Peluang Riset</h1>
            <p className="text-base-content/60 text-sm">
              Tentukan tujuan proyek Anda dan temukan kolaborator akademik yang tepat.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* KOLOM KIRI: Form Utama (Lebar 2/3) */}
            <div className="lg:col-span-2 rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm">
              <form>
                {/* Baris 1: Nama Proyek & Kategori */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input 
                    label="Nama Proyek" 
                    placeholder="Contoh: Studi Dinamika Neural Kuantum" 
                    required 
                  />
                  <Select 
                    label="Kategori" 
                    placeholder="Pilih Kategori"
                    required
                    options={[
                      { label: "Makroekonomi", value: "Makroekonomi" },
                      { label: "Keamanan Siber", value: "Keamanan Siber" },
                      { label: "Kecerdasan Buatan", value: "Kecerdasan Buatan" },
                      { label: "Sistem Terdistribusi", value: "Sistem Terdistribusi" },
                    ]}
                  />
                </div>

                {/* Baris 2: Deskripsi */}
                <div className="mb-6 flex flex-col gap-2">
                  <label className="text-sm font-bold text-base-content/70 ml-1">Deskripsi</label>
                  <textarea 
                    rows={5} 
                    className="w-full rounded-xl border border-base-300 bg-base-100 p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-base-content/40" 
                    placeholder="Jelaskan tujuan riset, metodologi, dan hasil yang diharapkan..."
                    required
                  ></textarea>
                </div>

                {/* Baris 3: Deadline & Estimasi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <Input 
                    type="date" 
                    label="Batas Waktu Pendaftaran" 
                    required 
                  />
                  <Input 
                    label="Estimasi Durasi" 
                    placeholder="Contoh: 6 Bulan" 
                    required 
                  />
                </div>

                {/* Bagian: Peran yang Dibutuhkan */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base-content">Peran yang Dibutuhkan</h3>
                    <button type="button" className="flex items-center gap-1.5 text-primary text-sm font-bold hover:text-primary/80 transition-colors">
                      <Plus size={16} /> Tambah Peran
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Role Item 1 */}
                    <div className="bg-base-200/50 rounded-xl p-4 flex items-center justify-between border border-base-200">
                      <div>
                        <p className="font-bold text-sm text-base-content mb-1">Data Analyst</p>
                        <p className="text-xs text-base-content/50 font-medium">Analisis Kuantitatif, Python, R</p>
                      </div>
                      <button type="button" className="text-base-content/30 hover:text-error transition-colors p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Role Item 2 */}
                    <div className="bg-base-200/50 rounded-xl p-4 flex items-center justify-between border border-base-200">
                      <div>
                        <p className="font-bold text-sm text-base-content mb-1">Primary Investigator</p>
                        <p className="text-xs text-base-content/50 font-medium">Tingkat PhD, Penulisan Hibah (Grant Writing)</p>
                      </div>
                      <button type="button" className="text-base-content/30 hover:text-error transition-colors p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-base-200">
                  <Button variant="ghost" type="button" className="font-bold">
                    Simpan sebagai Draf
                  </Button>
                  <Button variant="primary" type="submit" className="font-bold px-6">
                    Publikasikan Postingan
                  </Button>
                </div>
              </form>
            </div>

            {/* KOLOM KANAN: Sidebar Informasi (Lebar 1/3) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Card 1: Tips Rekrutmen */}
              <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                    <Lightbulb size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-sm tracking-wide">Tips Rekrutmen</h3>
                </div>
                <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
                  Proyek dengan peran yang spesifik dan tenggat waktu yang jelas menerima <span className="font-bold text-white">40% lebih banyak</span> lamaran berkualitas tinggi.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex -space-x-3">
                    {/* Placeholder Avatars menggunakan inisial agar tidak kena error Hydration/Image */}
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-blue-400 flex items-center justify-center text-[10px] font-bold">A</div>
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-emerald-400 flex items-center justify-center text-[10px] font-bold">R</div>
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-amber-400 flex items-center justify-center text-[10px] font-bold">K</div>
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-white/20 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm">+12</div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
                    Peneliti Aktif di Sekitar Anda
                  </span>
                </div>
              </div>

              {/* Card 2: Live Preview */}
              <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Eye size={18} className="text-base-content/50" />
                  <h3 className="font-bold text-sm text-base-content/70">Pratinjau Langsung</h3>
                </div>
                
                {/* Skeleton UI */}
                <div className="bg-base-200/50 rounded-xl p-5 border border-base-200 space-y-4">
                  <div className="h-3 w-1/3 bg-base-300/60 rounded-full"></div>
                  <div className="space-y-2 pt-1">
                    <div className="h-2 w-full bg-base-300/50 rounded-full"></div>
                    <div className="h-2 w-5/6 bg-base-300/50 rounded-full"></div>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <div className="h-6 w-16 bg-base-300/40 rounded-lg"></div>
                    <div className="h-6 w-16 bg-base-300/40 rounded-lg"></div>
                  </div>
                </div>

                <p className="text-center text-xs text-base-content/40 italic mt-5 font-medium">
                  Postingan Anda akan terlihat seperti ini di feed rekrutmen.
                </p>
              </div>

              {/* Card 3: Institutional Terms */}
              <div className="bg-base-200/30 border-l-4 border-indigo-600 rounded-r-2xl p-6">
                <h3 className="font-bold text-sm mb-2 text-base-content">Ketentuan Institusi</h3>
                <p className="text-xs text-base-content/60 leading-relaxed font-medium">
                  Dengan mempublikasikan, Anda menyetujui <a href="#" className="text-indigo-600 font-bold hover:underline">Kebijakan Etika Riset</a> dan standar kolaboratif institusi kami.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </DashboardLayout>
  );
}