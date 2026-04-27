export type OnboardingFormData = {
  role: "mahasiswa" | "dosen" | null;
  name: string;
  jurusan?: string;
  nomor_pengenal: number | null;
  no_hp: number | null;
};
