export type Recruitment = {
  id: string;
  researcher: {
    name: string;
    department: string;
    avatar: string;
  };
  title: string;
  description: string;
  skills: string[];
  teamMembers: {
    avatar: string;
    name: string;
  }[];
  totalMembers: number;
  status: "AKTIF" | "DITUTUP" | "SEGERA";
  actionType: "apply" | "detail";
};

export type FeaturedRecruitment = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
};

export type Category = {
  id: string;
  label: string;
  checked: boolean;
};

export type PopularSkill = {
  id: string;
  label: string;
  active: boolean;
};

export const mockCategories: Category[] = [
  { id: "cat-1", label: "Ilmu Alam", checked: true },
  { id: "cat-2", label: "Ilmu Sosial", checked: false },
  { id: "cat-3", label: "Teknik & Teknologi", checked: false },
  { id: "cat-4", label: "Humaniora", checked: false },
];

export const mockPopularSkills: PopularSkill[] = [
  { id: "skill-1", label: "Python", active: true },
  { id: "skill-2", label: "Analisis Data", active: false },
  { id: "skill-3", label: "Penulisan Akademik", active: false },
  { id: "skill-4", label: "LaTeX", active: false },
  { id: "skill-5", label: "SPSS", active: false },
  { id: "skill-6", label: "Deep Learning", active: true },
];

export const mockRecruitments: Recruitment[] = [
  {
    id: "rec-1",
    researcher: {
      name: "Dr. Elena Rodriguez",
      department: "Departemen Fisika",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Elena",
    },
    title: "Pemodelan Entanglement Kuantum dalam Sistem Biologis",
    description:
      "Mencari fisikawan komputasi berpengalaman dalam simulasi Monte Carlo untuk menyelidiki efek kuantum pada fotosintesis dan navigasi burung.",
    skills: ["Fisika", "Python", "Pemodelan"],
    teamMembers: [
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Andi",
        name: "Andi",
      },
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Budi",
        name: "Budi",
      },
    ],
    totalMembers: 6,
    status: "AKTIF",
    actionType: "apply",
  },
  {
    id: "rec-2",
    researcher: {
      name: "Prof. Sarah Jenkins",
      department: "Pusat Ekonomi",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
    },
    title: "Pola Pemulihan Ekonomi Perkotaan Pasca-Pandemi",
    description:
      "Dibutuhkan data scientist untuk analisis geospasial skala besar pada mobilitas ritel di kota-kota besar Indonesia.",
    skills: ["Ekonomi", "GIS", "R Statistics"],
    teamMembers: [
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Citra",
        name: "Citra",
      },
    ],
    totalMembers: 3,
    status: "AKTIF",
    actionType: "detail",
  },
  {
    id: "rec-3",
    researcher: {
      name: "Dr. Ahmad Fauzi",
      department: "Departemen Informatika",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ahmad",
    },
    title: "Deteksi Hoaks Berbasis NLP untuk Media Sosial Indonesia",
    description:
      "Proyek riset untuk membangun model NLP multibahasa yang mampu mendeteksi misinformasi di platform media sosial berbahasa Indonesia.",
    skills: ["NLP", "Deep Learning", "Python"],
    teamMembers: [
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dewi",
        name: "Dewi",
      },
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Eko",
        name: "Eko",
      },
    ],
    totalMembers: 5,
    status: "AKTIF",
    actionType: "apply",
  },
  {
    id: "rec-4",
    researcher: {
      name: "Prof. Maya Kartika",
      department: "Departemen Biologi",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maya",
    },
    title: "Konservasi Biodiversitas Terumbu Karang Nusantara",
    description:
      "Penelitian lapangan untuk memetakan dan menganalisis kesehatan terumbu karang di perairan timur Indonesia menggunakan teknologi drone bawah air.",
    skills: ["Biologi Laut", "Analisis Data", "GIS"],
    teamMembers: [
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Farah",
        name: "Farah",
      },
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Gilang",
        name: "Gilang",
      },
      {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Hana",
        name: "Hana",
      },
    ],
    totalMembers: 8,
    status: "AKTIF",
    actionType: "detail",
  },
];

export const mockFeaturedRecruitment: FeaturedRecruitment = {
  id: "feat-1",
  badge: "REKRUTMEN UNGGULAN",
  title: "Unit Respons Perubahan Iklim Interdisipliner",
  description:
    "Kami membentuk gugus tugas tingkat tinggi yang terdiri dari meteorolog, sosiolog, dan pakar kebijakan untuk menyusun kerangka ketahanan 2025 bagi kota-kota pesisir Indonesia.",
  image: "/images/featured-recruitment.webp",
};

export const mockStats = {
  activeRecruitments: 12,
  pendingApplications: 43,
};

export const typewriterTexts = [
  "Temukan kolaborator riset terbaik.",
  "Bangun tim penelitian impianmu.",
  "Eksplorasi peluang riset bersama.",
];
