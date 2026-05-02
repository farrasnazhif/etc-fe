import { useQuery } from "@tanstack/react-query";
import { baseURL } from "@/lib/api";
import axios from "axios";

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

export const useRekrutmen = (page: number = 1, limit: number = 10, kegiatan?: KegiatanType, role?: string) => {
  return useQuery({
    queryKey: ["rekrutmen", { page, limit, role, kegiatan }],
    queryFn: async (): Promise<RekrutmenResponse> => {
      const endpoint =
        role     ? `/api/rekrutmen/sort/role/${role}` :
        kegiatan ? `/api/rekrutmen/sort/type/${kegiatan}` :
                   `/api/rekrutmen`;

      const { data } = await axios.get<RekrutmenResponse>(`${baseURL}${endpoint}`, {
        params: { page, limit },
      });
      return data;
    },
  });
};
