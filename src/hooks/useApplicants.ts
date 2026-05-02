import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";

export type Pendaftar = {
  pendaftar_id: string;
  rekrutmen_id: string;
  user_id: string;
  alasan_mendaftar: string;
  cv_url: string;
  portofolio_url: string;
  status: "pending" | "approved" | "rejected";
  nama_pendaftar: string;
  histories?: {
    id: string;
    reviewer_user_id: string;
    reviewer_name: string;
    tim_id: string;
    tipe_tim: string;
    rating: number;
    deskripsi: string;
    created_at: string;
  }[];
};

export type ApplicantsResponse = {
  rekrutmen_id: string;
  pendaftar: Pendaftar[] | null;
};

export function useApplicants(rekrutmenId: string) {
  return useQuery({
    queryKey: ["rekrutmen", rekrutmenId, "applicants"],
    queryFn: async (): Promise<ApplicantsResponse> => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const response = await api.get<ApplicantsResponse>(
        `/api/rekrutmen/applicants/${rekrutmenId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    enabled: Boolean(rekrutmenId && getToken()),
  });
}
