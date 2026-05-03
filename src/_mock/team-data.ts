export type MemberRole = "ADMIN" | "EDITOR" | "VIEWER";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: MemberRole;
  avatarUrl: string;
  isOnline: boolean;
}

export interface Applicant {
  id: string;
  name: string;
  title: string;
  field: string;
  skills: string[];
  avatarUrl: string;
}

export interface ProjectProgress {
  id: string;
  name: string;
  progress: number;
  colorClass: string;
}

export interface OnlineUser {
  id: string;
  name: string;
  avatarUrl: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Dr. Aris Thorne",
    position: "Lead Principal Investigator",
    role: "ADMIN",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    isOnline: false,
  },
  {
    id: "m2",
    name: "Elena Rodriguez",
    position: "Senior Data Architect",
    role: "EDITOR",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    isOnline: true,
  },
  {
    id: "m3",
    name: "Marcus Chen",
    position: "Quantum Computing Fellow",
    role: "VIEWER",
    avatarUrl: "https://i.pravatar.cc/150?img=51",
    isOnline: false,
  },
];

export const applicants: Applicant[] = [
  {
    id: "a1",
    name: "Tobias Meyer",
    title: "PhD Candidate",
    field: "Fisika & Teori Informasi",
    skills: ["TEORI INFORMASI", "PYTHON"],
    avatarUrl: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: "a2",
    name: "Dr. Sarah Jenkins",
    title: "Associate Professor",
    field: "Pemodelan Matematika",
    skills: ["MATEMATIKA", "ANALISIS"],
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
];

export const projectItems: ProjectProgress[] = [
  {
    id: "p1",
    name: "Pengembangan Algoritma",
    progress: 75,
    colorClass: "bg-primary",
  },
  {
    id: "p2",
    name: "Kalibrasi Perangkat Keras",
    progress: 40,
    colorClass: "bg-primary",
  },
  {
    id: "p3",
    name: "Dokumentasi",
    progress: 90,
    colorClass: "bg-chart-2",
  },
];

export const onlineUsers: OnlineUser[] = [
  { id: "u1", name: "User 1", avatarUrl: "https://i.pravatar.cc/150?img=11" },
  { id: "u2", name: "User 2", avatarUrl: "https://i.pravatar.cc/150?img=24" },
  { id: "u3", name: "User 3", avatarUrl: "https://i.pravatar.cc/150?img=36" },
  { id: "u4", name: "User 4", avatarUrl: "https://i.pravatar.cc/150?img=41" },
];

export const additionalOnlineCount = 12;

export const teamStats = {
  velocity: "94%",
  engagement: "8.2",
  description: "Tim Anda saat ini 15% lebih aktif dari rata-rata departemen.",
};

export const typewriterTexts = [
  "Kelola anggota dan peran tim risetmu.",
  "Pantau progres kolaborasi secara real-time.",
  "Terima kolaborator terbaik untuk proyekmu.",
];
