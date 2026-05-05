"use client";

import { Star, Edit3, Quote } from "lucide-react";
import Button from "@/components/ui/button";
import Layout from "@/layouts/Layout";

export default function CeritaPenggunaPage() {
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Mahasiswa Teknik Informatika",
      story:
        "ETC membantu saya menemukan partner riset yang relevan untuk skripsi. Proses seleksi tim terasa lebih jelas karena saya bisa melihat histori dan kredibilitas anggota sebelum bergabung.",
      initial: "BS",
      bgColor: "bg-primary/10 text-primary",
    },
    {
      id: 2,
      name: "Siti Aminah",
      role: "Peneliti Sistem Informasi",
      story:
        "Saya lebih mudah membangun tim riset lintas kampus melalui ETC. Platform ini membuat proses kolaborasi terasa lebih terstruktur dibanding mencari anggota secara manual.",
      initial: "SA",
      bgColor: "bg-primary/10 text-primary",
    },
    {
      id: 3,
      name: "Reza Rahadian",
      role: "Founder Startup Kampus",
      story:
        "Untuk projek berbasis kampus, ETC memberi akses ke talenta yang lebih tepat sasaran. Bukan sekadar mencari orang, tapi membangun tim yang memang siap eksekusi.",
      initial: "RR",
      bgColor: "bg-primary/10 text-primary",
    },
  ];

  return (
    <Layout withNavbar withFooter withBanner>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          {/* hero */}
          <section className="mb-20 text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Cerita Pengguna ETC
              </p>

              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                Dibangun untuk kolaborasi,
                <span className="block text-primary">
                  dipercaya oleh para builders.
                </span>
              </h1>

              <p className="text-base leading-8 text-slate-600 md:text-lg">
                ETC membantu mahasiswa, peneliti, dan builder menemukan tim yang
                lebih relevan, membangun koneksi yang lebih kredibel, serta
                mengeksekusi peluang dengan proses yang lebih terarah.
              </p>
            </div>
          </section>

          {/* testimonial cards */}
          <section className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <Quote className="size-5 text-slate-300" />
                </div>

                <p className="flex-grow text-[15px] leading-8 text-slate-600">
                  “{item.story}”
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${item.bgColor}`}
                  >
                    {item.initial}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* cta */}
          <section className="rounded-3xl border border-slate-200 bg-white p-10 md:p-16">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Bergabung dengan ETC
                </p>

                <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
                  Bangun tim yang lebih dari sekadar lengkap.
                </h2>

                <p className="leading-8 text-slate-600">
                  ETC dirancang untuk membantu Anda menemukan collaborator,
                  competitor, dan researcher yang benar-benar sesuai dengan
                  tujuan besar Anda.
                </p>

                <div data-theme="light">
                  <Button variant="primary">Mulai Sekarang</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-3xl font-semibold text-slate-900">500+</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Pengguna aktif membangun kolaborasi
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-3xl font-semibold text-slate-900">3+</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Jalur utama: Project, Competition, Research
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* share story */}
          <section className="py-24 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Edit3 className="size-7" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Punya cerita kolaborasi bersama ETC?
              </h2>

              <p className="leading-8 text-slate-600">
                Bagikan pengalaman Anda membangun tim, menemukan peluang, atau
                mengeksekusi ide melalui ETC untuk menginspirasi generasi
                champions berikutnya.
              </p>

              <div data-theme="light">
                <Button variant="outline" leftIcon={Edit3}>
                  Tulis Ceritamu
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
