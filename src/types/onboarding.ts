export type OnboardingFormData = {
  nama: string;
  password: string;
  confirmPassword: string;
  role: "mahasiswa" | "dosen" | null;
  jurusan: string;
  nomor_pengenal: string;
  no_hp: string;
};
