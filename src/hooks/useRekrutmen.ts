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

export type KegiatanType = 'projek' | 'lomba' | 'riset';

export const useRekrutmen = (page: number = 1, limit: number = 10, kegiatan?: KegiatanType) => {
  return useQuery({
    queryKey: ["rekrutmen", { page, limit, kegiatan }],
    queryFn: async (): Promise<RekrutmenResponse> => {
      const url = kegiatan ? `/api/rekrutmen/sort/type/${kegiatan}` : "/api/rekrutmen";
      const { data } = await api.get<RekrutmenResponse>(url, {
        params: { page, limit },
      });
      return data;
    },
  });
};
