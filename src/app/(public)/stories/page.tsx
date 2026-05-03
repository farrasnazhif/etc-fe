"use client";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { Star, Edit3 } from "lucide-react";
import Button from "@/components/ui/button";

export default function CeritaPenggunaPage() {
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Mahasiswa Teknik Informatika",
      story: "Platform ini sangat membantu saya dalam menemukan mitra penelitian untuk skripsi saya. Proses kolaborasinya transparan dan sangat efisien.",
      initial: "BS",
      bgColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      name: "Siti Aminah",
      role: "Peneliti Sistem Informasi",
      story: "Manajemen data penelitian menjadi jauh lebih mudah dengan alat yang disediakan di ETC. Kami bisa berbagi publikasi secara instan.",
      initial: "SA",
      bgColor: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 3,
      name: "Reza Rahadian",
      role: "Founder Startup Kampus",
      story: "Sebagai startup yang berakar di kampus, akses ke jaringan peneliti di sini sangat krusial bagi pengembangan produk R&D kami.",
      initial: "RR",
      bgColor: "bg-indigo-100 text-indigo-700",
    }
  ];

  return (
    <DashboardLayout withNavbar>
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-move 4s ease infinite;
        }
        
        @keyframes float-soft {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float-soft 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-[#F8F9FE] p-4 sm:p-8 font-sans pb-24">
        <div className="max-w-[1200px] mx-auto space-y-20">
          
          <div className="text-center space-y-6 pt-10 animate-float">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/50 text-indigo-700 font-extrabold text-[11px] tracking-widest uppercase border border-indigo-200/50 shadow-sm backdrop-blur-sm">
              ✨ Kisah Sukses Kami
            </span>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-gradient-text pb-2">
              Inspirasi dari Komunitas
            </h1>
            
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-[17px] leading-relaxed font-medium">
              Pelajari bagaimana para peneliti, mahasiswa, dan inovator memanfaatkan kolaborasi digital untuk mempercepat terobosan ilmiah dan akademis di seluruh Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow italic font-medium">
                  {`"${item.story}"`}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${item.bgColor}`}>
                    {item.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-[12px] text-slate-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-[32px] bg-slate-900 overflow-hidden shadow-xl mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 z-0"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Bergabunglah dengan 500+ Mahasiswa Kreatif
                </h2>
                <p className="text-indigo-100/90 text-base md:text-lg leading-relaxed max-w-md font-medium">
                  Jadilah bagian dari revolusi riset digital dan mulailah membangun masa depan akademismu hari ini.
                </p>
                <div className="pt-4">
                  <button className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                    Daftar Sekarang
                  </button>
                </div>
              </div>
              
              <div className="hidden md:grid grid-cols-2 gap-4 opacity-80 animate-float" style={{animationDelay: '1s'}}>
                <div className="w-24 h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 translate-y-8"></div>
                <div className="w-24 h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-6 pt-16">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2 shadow-inner">
              <Edit3 size={28} strokeWidth={2.5} />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-900">
                Punya Pengalaman Menarik?
              </h2>
              <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed font-medium">
                Kami ingin mendengar bagaimana platform ini telah membantu perjalanan penelitian Anda. Bagikan cerita Anda dan beri inspirasi kepada ribuan peneliti lainnya di seluruh dunia.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                variant="primary" 
                leftIcon={Edit3} 
                className="px-8 h-12 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:scale-105 transition-transform"
              >
                Tulis Ceritamu
              </Button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}