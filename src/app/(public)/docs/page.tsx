"use client";

import Layout from "@/layouts/Layout";
import { useEffect, useState } from "react";

const navigationSections = [
  { id: "tentang-etc", label: "Tentang ETC" },
  { id: "visi-dan-misi", label: "Visi dan Misi" },
  { id: "core-features", label: "Core Features" },
  { id: "user-journey", label: "User Journey" },
  { id: "competitive-categories", label: "Competitive Categories" },
  { id: "reputasi-dan-kredibilitas", label: "Reputasi" },
  { id: "recruitment-architecture", label: "Recruitment" },
  { id: "etc-philosophy", label: "ETC Philosophy" },
  { id: "future-expansion", label: "Future Expansion" },
  { id: "closing-statement", label: "Closing" },
];

export default function DokumentasiPage() {
  const [activeSection, setActiveSection] = useState("tentang-etc");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },

      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    const elements = navigationSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((element) => observer.observe(element));

    // fallback for initial load
    if (elements.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(elements[0].id);
    }

    return () => {
      elements.forEach((element) => observer.unobserve(element));

      observer.disconnect();
    };
  }, []);

  return (
    <Layout withNavbar withFooter withBanner>
      <main className="bg-background">
        <div className="mx-auto flex max-w-7xl gap-16 px-6 py-20">
          {/* aside navigation */}
          <aside className="sticky top-24 hidden h-fit w-72 shrink-0 lg:block">
            <div className="space-y-5 py-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                On This Page
              </p>

              <nav className="space-y-1">
                {navigationSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block  px-3 py-2 text-sm transition-all ${
                      activeSection === section.id
                        ? "border-l-4 border-primary font-semibold text-primary"
                        : "text-slate-600  hover:text-slate-900"
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* main content */}
          <div className="min-w-0 flex-1">
            <div className="mx-auto max-w-4xl">
              {/* header */}
              <header className="mb-20 space-y-8">
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    Official Documentation
                  </p>

                  <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900">
                    Elite TC Champions
                  </h1>
                </div>

                <div className="space-y-5 text-[16px] leading-8 text-slate-600">
                  <p>
                    ETC (Elite TC Champions) adalah platform kolaborasi
                    kompetitif yang dirancang untuk membangun ekosistem
                    mahasiswa, akademisi, dan talenta berpotensi tinggi dalam
                    menemukan peluang, membentuk tim unggul, serta mengeksekusi
                    projek, lomba, maupun riset secara lebih strategis.
                  </p>

                  <p>
                    ETC tidak hanya berfungsi sebagai platform pencarian
                    anggota. ETC dibangun sebagai competitive collaboration
                    ecosystem, mempertemukan individu dengan visi, kemampuan,
                    dan ambisi besar ke dalam satu ruang terstruktur untuk
                    menciptakan tim yang lebih kredibel, terarah, dan
                    berorientasi hasil.
                  </p>

                  <p>
                    Filosofi utama ETC adalah sederhana: tim hebat tidak
                    tercipta secara acak, tetapi dibangun melalui koneksi yang
                    tepat, evaluasi yang jelas, dan eksekusi yang konsisten.
                  </p>
                </div>

                <p className="text-sm text-slate-500">
                  Platform Version: ETC v1.0
                </p>
              </header>

              {/* content */}
              {/* content */}
              <div className="space-y-16 text-[16px] leading-8 text-slate-700">
                <Section id="tentang-etc" title="1. Tentang Elite TC Champions">
                  <p>
                    Elite TC Champions hadir untuk menjawab permasalahan klasik
                    dalam dunia kolaborasi: sulit menemukan partner berkualitas,
                    terbatasnya akses terhadap peluang strategis, dan minimnya
                    sistem evaluasi yang mampu mencerminkan performa nyata
                    anggota.
                  </p>

                  <p>
                    ETC dirancang sebagai jembatan antara opportunity dan
                    talent. Melalui platform ini, pengguna dapat membangun tim,
                    membuka rekrutmen, menilai kandidat, mengevaluasi anggota,
                    dan menciptakan histori kolaborasi yang memiliki nilai
                    reputasi.
                  </p>
                </Section>

                <Section id="visi-dan-misi" title="2. Visi dan Misi">
                  <p>
                    ETC memiliki visi untuk menjadi pusat kolaborasi kompetitif
                    bagi generasi berprestasi, dengan fokus pada kualitas
                    koneksi, efektivitas tim, dan keberhasilan eksekusi.
                  </p>

                  <ul className="list-disc space-y-3 pl-6">
                    <li>
                      Menghubungkan individu berbakat dengan peluang bernilai
                      tinggi
                    </li>
                    <li>
                      Mendorong pembentukan tim yang lebih selektif dan
                      strategis
                    </li>
                    <li>
                      Menyediakan sistem evaluasi berbasis kontribusi nyata
                    </li>
                    <li>
                      Menjadi ekosistem pertumbuhan untuk projek, lomba, dan
                      riset
                    </li>
                    <li>
                      Membangun standar baru dalam collaborative excellence
                    </li>
                  </ul>
                </Section>

                <Section id="core-features" title="3. Core Features">
                  <p>
                    ETC dibangun dengan fitur-fitur utama yang mendukung
                    keseluruhan lifecycle kolaborasi:
                  </p>

                  <ul className="list-disc space-y-3 pl-6">
                    <li>
                      <strong>Discovery Dashboard:</strong> Menjelajahi peluang
                      berdasarkan kategori, kebutuhan, dan role spesifik
                    </li>

                    <li>
                      <strong>Smart Recruitment:</strong> Membuat postingan
                      rekrutmen terstruktur dengan detail kebutuhan tim
                    </li>

                    <li>
                      <strong>Applicant Evaluation:</strong> Review CV,
                      portofolio, motivasi, dan histori kontribusi
                    </li>

                    <li>
                      <strong>Team Management:</strong> Mengelola anggota aktif,
                      pelamar, dan status rekrutmen
                    </li>

                    <li>
                      <strong>Member Rating System:</strong> Menilai performa
                      anggota untuk membangun trust dan accountability
                    </li>

                    <li>
                      <strong>Bookmark & Opportunity Tracking:</strong>{" "}
                      Menyimpan peluang strategis untuk keputusan lebih matang
                    </li>
                  </ul>
                </Section>

                <Section id="user-journey" title="4. User Journey">
                  <ol className="list-decimal space-y-3 pl-6">
                    <li>Membuat akun dan membangun identitas profesional</li>
                    <li>
                      Menambahkan spesialisasi, pengalaman, dan positioning diri
                    </li>
                    <li>Mencari peluang sesuai tujuan personal atau tim</li>
                    <li>Melamar atau membangun tim sendiri</li>
                    <li>Menyeleksi kandidat secara lebih objektif</li>
                    <li>
                      Menjalankan kolaborasi dengan sistem evaluasi
                      berkelanjutan
                    </li>
                  </ol>
                </Section>

                <Section
                  id="competitive-categories"
                  title="5. Competitive Categories"
                >
                  <p>
                    Elite TC Champions berfokus pada tiga jalur utama
                    pengembangan:
                  </p>

                  <ul className="list-disc space-y-3 pl-6">
                    <li>
                      <strong>Project:</strong> Startup, product development,
                      innovation building
                    </li>

                    <li>
                      <strong>Competition:</strong> Hackathon, lomba akademik,
                      challenge nasional maupun internasional
                    </li>

                    <li>
                      <strong>Research:</strong> Publikasi, riset ilmiah, dan
                      pengembangan akademik
                    </li>
                  </ul>
                </Section>

                <Section
                  id="reputasi-dan-kredibilitas"
                  title="6. Reputasi dan Kredibilitas"
                >
                  <p>
                    Dalam ETC, profil bukan sekadar identitas, tetapi
                    representasi reputasi. Jurusan, spesialisasi, histori
                    kontribusi, hingga rating anggota berfungsi sebagai social
                    proof dalam proses kolaborasi.
                  </p>

                  <p>
                    Dengan pendekatan ini, pengguna dapat mengambil keputusan
                    berdasarkan evidence, bukan asumsi.
                  </p>
                </Section>

                <Section
                  id="recruitment-architecture"
                  title="7. Recruitment Architecture"
                >
                  <p>
                    Setiap sistem rekrutmen ETC dibangun dengan transparansi
                    penuh:
                  </p>

                  <ul className="list-disc space-y-3 pl-6">
                    <li>Role dan kebutuhan spesifik</li>
                    <li>Kriteria kandidat</li>
                    <li>Kompensasi atau fee</li>
                    <li>Durasi kerja sama</li>
                    <li>Timeline mulai hingga deadline</li>
                    <li>Contact point terverifikasi</li>
                  </ul>

                  <p>
                    Tujuannya adalah menciptakan proses seleksi yang lebih
                    jelas, profesional, dan efisien.
                  </p>
                </Section>

                <Section id="etc-philosophy" title="8. ETC Philosophy">
                  <p>
                    Elite TC Champions berdiri di atas prinsip bahwa keunggulan
                    lahir dari tim yang terkurasi, bukan sekadar terkumpul.
                  </p>

                  <p>
                    ETC percaya bahwa masa depan kolaborasi bukan hanya tentang
                    “siapa yang tersedia,” tetapi “siapa yang paling relevan dan
                    mampu bertumbuh bersama.”
                  </p>
                </Section>

                <Section id="future-expansion" title="9. Future Expansion">
                  <ul className="list-disc space-y-3 pl-6">
                    <li>AI-powered elite team matchmaking</li>
                    <li>Performance intelligence dashboard</li>
                    <li>Verified achievement system</li>
                    <li>Cross-campus elite collaboration network</li>
                    <li>Integrated execution workspace</li>
                  </ul>
                </Section>

                <Section id="closing-statement" title="10. Closing Statement">
                  <p>
                    Elite TC Champions bukan hanya platform teknologi. ETC
                    adalah fondasi untuk generasi builder, competitor, dan
                    researcher yang ingin berkembang melalui kolaborasi yang
                    lebih cerdas.
                  </p>

                  <p>
                    Dengan ETC, proses membangun tim tidak lagi sekadar mencari
                    anggota, tetapi membentuk champions.
                  </p>
                </Section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-5">
      <h2 className="text-2xl font-semibold leading-snug tracking-tight text-slate-900">
        {title}
      </h2>

      <div className="space-y-5">{children}</div>
    </section>
  );
}
