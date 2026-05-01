import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export type Rekrutmen = {
  rekrutmen_id: string;
  user_id: string;
  kegiatan: string;
  Kriteria: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  fee: number;
  role: string;
  contact_person: string;
};

export type RekrutmenResponse = {
  data: Rekrutmen[];
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
};

export const useRekrutmen = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["rekrutmen", { page, limit }],
    queryFn: async (): Promise<RekrutmenResponse> => {
      const { data } = await api.get<RekrutmenResponse>("/api/rekrutmen", {
        params: { page, limit },
      });
      return data;
    },
  });
};
