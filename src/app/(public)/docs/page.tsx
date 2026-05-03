"use client";

import Link from "next/link";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { 
  BookOpen, 
  UserPlus, 
  Users, 
  Handshake, 
  ShieldCheck, 
  Briefcase, 
  Eye, 
  MessageSquare,
  Layers,
  ArrowRight
} from "lucide-react";

export default function DokumentasiPage() {
  return (
    <DashboardLayout withNavbar>
      <main data-theme="light" className="min-h-screen bg-base-200/30 p-4 md:p-8 font-sans pb-12">
        <div className="mx-auto max-w-[1000px] space-y-12">
          
          {/* ================= HERO BANNER ================= */}
          <div className="bg-primary rounded-3xl p-10 md:p-14 relative overflow-hidden flex items-center justify-between shadow-sm">
            <div className="relative z-10 max-w-2xl text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Pusat Dokumentasi ETC
              </h1>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium">
                Panduan lengkap cara menggunakan platform ETC untuk mempercepat riset akademis dan kolaborasi antar peneliti di seluruh ekosistem kampus.
              </p>
            </div>
            <BookOpen className="absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-64 text-white/10" strokeWidth={1} />
          </div>

          {/* ================= CARA KERJA SECTION ================= */}
          <section>
            <div className="mb-8 border-b-2 border-primary inline-block pb-2">
              <h2 className="text-base font-bold text-base-content">
                Cara Kerja ETC (Detail Panduan)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-6">
                  <UserPlus size={24} />
                </div>
                <h3 className="text-lg font-bold text-base-content mb-3 leading-snug">
                  1. Buat dan Lengkapi Profil Anda
                </h3>
                <p className="text-sm text-base-content/60 mb-8 flex-grow leading-relaxed">
                  Tentukan peran Anda dalam tim riset. Pilih spesialisasi seperti UI/UX Design, Data Analyst, Software Engineer, atau Academic Writer.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Data Analyst</span>
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">UI/UX Design</span>
                </div>
              </div>

              <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-bold text-base-content mb-3 leading-snug">
                  2. Temukan Tim atau Buat Rekrutmen
                </h3>
                <p className="text-sm text-base-content/60 mb-8 flex-grow leading-relaxed">
                  Jelajahi proyek yang sedang aktif atau buat rekrutmen baru untuk mencari talenta yang dibutuhkan dalam riset Anda sendiri.
                </p>
                <Link href="#" className="text-sm font-bold text-primary hover:text-primary/80 mt-auto inline-flex items-center gap-1 transition-colors group">
                  Pelajari Rekrutmen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-6">
                  <Handshake size={24} />
                </div>
                <h3 className="text-lg font-bold text-base-content mb-3 leading-snug">
                  3. Mulai Kolaborasi Terstruktur
                </h3>
                <p className="text-sm text-base-content/60 mb-8 flex-grow leading-relaxed">
                  Gunakan alat bantu manajemen tugas terintegrasi. Pantau progress secara real-time dan komunikasikan setiap milestone tim.
                </p>
                <div className="flex -space-x-3 mt-auto">
                  <div className="w-8 h-8 rounded-full border-2 border-base-100 bg-base-300 flex items-center justify-center text-base-content/50 text-[10px] font-bold z-20 shadow-sm overflow-hidden">
                     <img src="https://i.pravatar.cc/100?img=1" alt="User 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-base-100 bg-base-300 flex items-center justify-center text-base-content/50 text-[10px] font-bold z-10 shadow-sm overflow-hidden">
                     <img src="https://i.pravatar.cc/100?img=2" alt="User 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-base-100 bg-primary flex items-center justify-center text-white text-[10px] font-bold z-0 shadow-sm">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ATURAN & SYARAT SECTION ================= */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-base-200/80 p-2.5 rounded-xl text-base-content/70">
                <Layers size={20} />
              </div>
              <h2 className="text-base font-bold text-base-content">
                Aturan & Syarat Platform
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: ShieldCheck, title: "Integritas Akademik", desc: "Menjaga standar kejujuran tinggi dalam setiap publikasi dan riset." },
                { icon: Briefcase, title: "Komitmen", desc: "Profesionalisme dalam menjalankan tugas sesuai tenggat waktu." },
                { icon: Eye, title: "Transparansi Proyek", desc: "Keterbukaan alur kerja dan pembagian peran yang jelas." },
                { icon: MessageSquare, title: "Etika Berkomunikasi", desc: "Menghargai setiap perbedaan pendapat dalam kolaborasi tim." }
              ].map((item, idx) => (
                <div key={idx} className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <item.icon size={26} className="text-primary mb-5" />
                  <h4 className="font-bold text-base-content mb-2.5 text-[15px]">{item.title}</h4>
                  <p className="text-[13px] text-base-content/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CTA SECTION (SEKARANG BIRU) ================= */}
          {/* Mengganti bg-neutral menjadi bg-blue-600 agar cerah dan interaktif */}
          <section className="bg-blue-600 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl relative overflow-hidden">
            {/* Dekorasi cahaya di dalam kotak biru */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Butuh Bantuan Lebih Lanjut?</h3>
              <p className="text-blue-100 text-sm md:text-base font-medium">Tim support kami siap membantu Anda 24/7 untuk kendala teknis.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
              <button className="flex-1 md:flex-none bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-md">
                Buka FAQ
              </button>
              <button className="flex-1 md:flex-none bg-blue-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-blue-900 transition-all active:scale-95 shadow-lg border border-blue-700">
                Hubungi Kami
              </button>
            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="pt-8 mt-12 border-t border-base-300 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-base-content/50">
            <p>© 2026 ResearchCollab Platform. Academic Excellence Initiative.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-base-content transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:text-base-content transition-colors underline-offset-4 hover:underline">Security</Link>
              <Link href="#" className="hover:text-base-content transition-colors underline-offset-4 hover:underline">Status</Link>
            </div>
          </footer>

        </div>
      </main>
    </DashboardLayout>
  );
}