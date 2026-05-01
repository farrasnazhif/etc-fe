"use client";

import dynamic from "next/dynamic";
import { LogOut } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";


import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useToast } from "@/components/ui/toaster";


import { 
  Mail, 
  MapPin, 
  UserPen, 
  Send, 
  ExternalLink,
  Users,
  GraduationCap,
  Phone
} from "lucide-react";

function ProfileContent() {
  
  const {
    user,
    isAuthenticated,
    isLoadingUser,
    userError,
    logout,
  } = useAuth();

  const { addToast } = useToast();

  
  if (isLoadingUser) {
    return (
      <DashboardLayout withNavbar withSidebar>
        {/* bg-white latar belakang bersih dan items-center justify-center untuk posisi tengah */}
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-sm font-medium text-base-content/60 italic">
              Memuat data user...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  
  if (!isAuthenticated) {
    return (
      <DashboardLayout withNavbar withSidebar>
        {/* Latar belakang putih bersih */}
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Teks diubah menjadi hitam pekat (text-black) */}
            <p className="text-lg font-medium text-black">
              Silakan login terlebih dahulu.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout withNavbar withSidebar>
      <main data-theme="light" className="min-h-screen bg-base-200/50 p-4 md:p-8 text-base-content font-sans">
        <div className="mx-auto max-w-[1440px] space-y-8">
          
          {/* ================= HEADER PROFIL ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 flex flex-col md:flex-row items-start gap-8 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0">
              
                {user?.profile_picture ? (
                  <img 
                    src={user.profile_picture} 
                    alt="Profil" 
                    className="h-full w-full rounded-xl object-cover border border-base-300" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "";
                      (e.target as HTMLImageElement).className = "hidden";
                    }}
                  />
                ) : null}
                
                {/* Fallback Avatar Huruf */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-black shadow-inner -z-10">
                  {user?.nama?.charAt(0) || "U"}
                </div>

                <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-base-100 bg-primary text-primary-content shadow-lg hover:scale-110 transition-transform">
                  <UserPen size={14} />
                </button>
              </div>
              
              <div className="flex-1 w-full">
                <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{user?.nama}</h1>
                    <p className="flex items-center gap-2 text-sm font-semibold text-base-content/60 mt-1 uppercase tracking-wider">
                      <GraduationCap size={16} /> {user?.role} {user?.jurusan && `• ${user?.jurusan}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" leftIcon={UserPen}>Sunting</Button>
                  </div>
                </div>

                <p className="mb-6 max-w-2xl text-sm leading-relaxed text-base-content/80 font-medium">
                  {user?.spesialisasi && user.spesialisasi.length > 0 
                    ? user.spesialisasi.join(" • ") 
                    : "Mahasiswa Teknologi Informasi ITS yang berfokus pada inovasi dan pengembangan teknologi informasi."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 rounded-full bg-info/10 px-3 py-1 text-[10px] font-bold text-info uppercase tracking-tight border border-info/20">
                    <MapPin size={12} /> Surabaya, Indonesia
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-[10px] font-bold text-base-content/70 uppercase tracking-tight">
                    <Phone size={12} /> {user?.no_telp}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-[10px] font-bold text-base-content/70 uppercase tracking-tight">
                    <Users size={12} /> {user?.no_pengenal}
                  </div>
                </div>
              </div>
            </section>

            {/* Data Gabungan */}
            <section className="lg:col-span-1 grid grid-cols-2 gap-4">
              {[
                { label: 'Tim Aktif', value: 3, active: true },
                { label: 'Proyek', value: 5, active: false },
                { label: 'NRP', value: user?.no_pengenal?.slice(-4) || "----", active: false },
                { label: 'Status', value: user?.role === 'mahasiswa' ? 'Aktif' : 'Staff', active: false },
              ].map((item, index) => (
                <div key={index} className={`flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:-translate-y-1 ${item.active ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10' : ''}`}>
                  <span className={`text-3xl font-black ${item.active ? 'text-primary' : 'text-base-content'}`}>{item.value}</span>
                  <span className="mt-1 text-[10px] uppercase font-bold text-base-content/50 tracking-widest">{item.label}</span>
                </div>
              ))}
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* ================= SIDEBAR ================= */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-base-content/50">Keahlian Utama</h2>
                <div className="flex flex-wrap gap-2">
                  {user?.spesialisasi?.map((s) => (
                    <span key={s} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary border border-primary/10">{s}</span>
                  )) || <span className="text-xs text-base-content/40 italic font-medium">Belum ada data keahlian.</span>}
                </div>
              </div>
              
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-base-content/50">Tim Saat Ini</h2>
                  <button className="text-xs font-bold text-primary hover:underline">Lihat Semua</button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-base-200 bg-base-200/20 hover:bg-base-200/40 transition-all cursor-pointer group">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">E</div>
                  <div>
                    <p className="text-sm font-bold">ETC Frontend Core</p>
                    <p className="text-[10px] text-base-content/40 font-bold uppercase">4 Anggota</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* ================= KONTEN UTAMA ================= */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Portofolio */}
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-base-content/50">Portofolio Proyek</h2>
                  <div className="flex gap-2 bg-base-200 p-1 rounded-xl">
                    <Button variant="primary" size="sm" className="px-6">Semua</Button>
                    <Button variant="ghost" size="sm" className="px-6 text-base-content/50">Selesai</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Kartu Proyek*/}
                  <div className="rounded-2xl border border-base-200 p-6 group hover:border-primary hover:shadow-xl transition-all cursor-pointer bg-base-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={20} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Campus Lost & Found</h3>
                    <p className="text-xs text-base-content/60 leading-relaxed mt-2 font-medium">Aplikasi manajemen barang hilang terintegrasi di lingkungan kampus ITS berbasis Web.</p>
                    <div className="mt-4 flex items-center gap-2">
                       <span className="text-[9px] bg-base-200 px-2 py-1 rounded font-bold uppercase text-base-content/40">Next.js</span>
                       <span className="text-[9px] bg-base-200 px-2 py-1 rounded font-bold uppercase text-base-content/40">Go</span>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-base-300 rounded-2xl flex flex-col items-center justify-center p-8 text-base-content/30 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all cursor-pointer group">
                    <div className="h-10 w-10 rounded-full bg-base-200 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                       <span className="text-2xl font-light">+</span>
                    </div>
                    <span className="font-bold text-xs tracking-widest uppercase">Tambah Proyek</span>
                  </div>
                </div>
              </div>

              {/* Form Kolaborasi */}
              <div className="rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="mb-8">
                  <h2 className="text-2xl font-black mb-1 tracking-tight">Hubungi {user?.nama?.split(' ')[0]}</h2>
                  <p className="text-sm text-base-content/50 font-medium">Tertarik berkolaborasi dalam proyek riset atau pengembangan terbaru?</p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  addToast("Permintaan kolaborasi berhasil dikirim!", "success");
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Nama Lengkap" placeholder="Masukkan nama Anda" leftIcon={Users} required />
                    <Input label="Alamat Email" type="email" placeholder="nama@email.com" leftIcon={Mail} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-base-content/70 ml-1 uppercase tracking-wider">Pesan</label>
                    <textarea 
                      rows={4} 
                      className="w-full rounded-xl border border-base-300 bg-base-100 p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" 
                      placeholder={`Halo ${user?.nama?.split(' ')[0]}, saya ingin berdiskusi mengenai...`}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button type="submit" variant="primary" rightIcon={Send} className="w-full sm:w-auto px-12 font-bold shadow-lg h-12">
                      Kirim Pesan
                    </Button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(ProfileContent), {
  ssr: false,
});