import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";

export interface Rekrutmen {
  rekrutmen_id: string; // Updated to match the url usage /tim-saya/[rekrutmen_id]
  role: string;
  kegiatan: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  fee: number;
}

export function useMyRekrutmen() {
  return useQuery({
    queryKey: ["rekrutmen", "mine"],
    queryFn: async (): Promise<Rekrutmen[]> => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const response = await api.get<Rekrutmen[]>("/api/rekrutmen/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: Boolean(getToken()),
  });
}
