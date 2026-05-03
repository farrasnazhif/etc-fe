"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link"; 

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

import { 
  MapPin, 
  UserPen, 
  ExternalLink,
  Users,
  GraduationCap,
  Phone,
  User,
  Briefcase,
  Globe,
  Shield,
  X,
  Plus,
  Mail,
  Link as LinkIcon,
  Code
} from "lucide-react";

function ProfileContent() {
  const {
    user,
    isAuthenticated,
    isLoadingUser,
  } = useAuth();

  const { addToast } = useToast();

  // ==========================================
  // STATE UNTUK KONTROL POP-UP (MODAL)
  // ==========================================
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal"); 
  
  // State baru untuk Modal Tambah Proyek
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // ==========================================
  // FUNGSI-FUNGSI HANDLER KLIK
  // ==========================================
  
  // --- Handler Edit Profil ---
  const handleEditProfile = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleSaveProfile = () => {
    addToast("Profil berhasil diperbarui!", "success");
    setIsEditModalOpen(false);
  };

  // --- Handler Tambah Proyek ---
  const handleTambahProyek = () => setIsAddProjectModalOpen(true);
  const handleCloseAddProject = () => setIsAddProjectModalOpen(false);
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form
    addToast("Proyek berhasil ditambahkan!", "success");
    setIsAddProjectModalOpen(false);
  };

  // --- Handler Lainnya ---
  const handleUbahFoto = () => addToast("Membuka dialog pilih foto...", "success");

  // ==========================================

  if (isLoadingUser) {
    return (
      <DashboardLayout withNavbar withSidebar>
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
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-6 text-center">
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
                
                <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-black shadow-inner -z-10">
                  {user?.nama?.charAt(0) || "U"}
                </div>

                <button 
                  onClick={handleUbahFoto}
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-base-100 bg-primary text-primary-content shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
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
                    <Button 
                      variant="primary" 
                      size="sm" 
                      leftIcon={UserPen}
                      onClick={handleEditProfile}
                    >
                      Sunting
                    </Button>
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
                  <Link href="/tim-saya" className="text-xs font-bold text-primary hover:underline cursor-pointer">
                    Lihat Semua
                  </Link>
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
              
              <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-base-content/50">Portofolio Proyek</h2>
                  <div className="flex gap-2 bg-base-200 p-1 rounded-xl">
                    <Button variant="primary" size="sm" className="px-6">Semua</Button>
                    <Button variant="ghost" size="sm" className="px-6 text-base-content/50">Selesai</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div 
                    onClick={handleTambahProyek}
                    className="border-2 border-dashed border-base-300 rounded-2xl flex flex-col items-center justify-center p-8 text-base-content/30 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all cursor-pointer group"
                  >
                    <div className="h-10 w-10 rounded-full bg-base-200 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                       <span className="text-2xl font-light">+</span>
                    </div>
                    <span className="font-bold text-xs tracking-widest uppercase">Tambah Proyek</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* ================= MODAL TAMBAH PROYEK ===================== */}
      {/* ========================================================= */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-600" />
                Tambah Proyek Baru
              </h2>
              <button onClick={handleCloseAddProject} className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSaveProject} className="space-y-5">
                
                {/* Nama Proyek */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Proyek <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Contoh: Campus Lost & Found" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm" 
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Proyek <span className="text-red-500">*</span></label>
                  <textarea 
                    required
                    rows={3} 
                    placeholder="Ceritakan singkat tentang proyek ini dan peranmu..." 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm resize-y" 
                  />
                </div>

                {/* Teknologi / Tech Stack */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teknologi yang Digunakan</label>
                  <div className="relative">
                    <Code size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Contoh: Next.js, Go, PostgreSQL (pisahkan dengan koma)" 
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm" 
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400">Pisahkan masing-masing teknologi dengan tanda koma.</p>
                </div>

                {/* Tautan Proyek */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tautan Proyek (Opsional)</label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="url" 
                      placeholder="https://github.com/..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm" 
                    />
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-3 pt-4 mt-2">
                  <Button type="button" variant="ghost" onClick={handleCloseAddProject}>
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" className="bg-indigo-600 hover:bg-indigo-700">
                    Simpan Proyek
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ================= MODAL EDIT PROFIL ===================== */}
      {/* ========================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6">
          <div className="w-full max-w-6xl h-[90vh] sm:h-[85vh] bg-gray-50 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col flex-shrink-0 overflow-y-auto">
              <div className="flex flex-col items-center mb-8 pt-4">
                <div className="relative h-28 w-28 mb-4">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-md border-4 border-white outline outline-1 outline-gray-200">
                    {user?.nama?.charAt(0) || "U"}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                    <UserPen size={14} />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center">{user?.nama || "Nama User"}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{user?.role || "Mahasiswa"}</p>
                <button className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">
                  Edit Photo
                </button>
              </div>

              <div className="flex flex-col space-y-1">
                <button onClick={() => setActiveTab("personal")} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === "personal" ? "bg-indigo-700 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                  <User size={18} /> Personal Identity
                </button>
                <button onClick={() => setActiveTab("contact")} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === "contact" ? "bg-indigo-700 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                  <Globe size={18} /> Presence & Contact
                </button>
                <button onClick={() => setActiveTab("expertise")} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === "expertise" ? "bg-indigo-700 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                  <Briefcase size={18} /> Expertise & Skills
                </button>
                <button onClick={() => setActiveTab("security")} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === "security" ? "bg-indigo-700 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                  <Shield size={18} /> Account Security
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden relative">
              <div className="sticky top-0 bg-gray-50/90 backdrop-blur-md z-10 px-8 py-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                  <p className="text-sm text-gray-500">Manage your academic identity and research presence.</p>
                </div>
                <Button onClick={handleSaveProfile} variant="primary" className="bg-indigo-700 hover:bg-indigo-800">
                  Save Profile
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 text-indigo-700 font-semibold">
                    <User size={18} />
                    <h3>Personal Identity</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                      <input type="text" defaultValue={user?.nama} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm"/>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Academic Title</label>
                      <input type="text" defaultValue={user?.role} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Bio & Research Specialization</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm resize-y" defaultValue="Mahasiswa Teknologi Informasi ITS yang berfokus pada inovasi dan pengembangan teknologi informasi."></textarea>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 text-indigo-700 font-semibold">
                    <Globe size={18} />
                    <h3>Presence & Contact</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Location</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" defaultValue="Surabaya, Indonesia" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" defaultValue="email@its.ac.id" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Website</label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="url" defaultValue="https://its.ac.id" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 outline-none text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 text-indigo-700 font-semibold">
                    <Briefcase size={18} />
                    <h3>Expertise</h3>
                  </div>
                  <label className="block text-sm text-gray-600 mb-3">Areas of Specialization</label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {["Frontend", "Next.js", "Tailwind CSS", "React"].map((skill) => (
                      <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                        {skill}
                        <button className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <button className="flex items-center gap-1 px-4 py-1.5 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm font-medium hover:border-gray-400 hover:text-gray-700 transition-colors bg-white">
                      <Plus size={14} /> Add Expertise
                    </button>
                  </div>
                </div>
                <div className="h-6"></div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-5 flex items-center justify-end gap-4 z-10">
                <button onClick={handleCloseEditModal} className="px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Discard Changes
                </button>
                <Button onClick={handleSaveProfile} variant="primary" className="bg-indigo-700 hover:bg-indigo-800 px-8">
                  Save Profile
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
      
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(ProfileContent), {
  ssr: false,
});