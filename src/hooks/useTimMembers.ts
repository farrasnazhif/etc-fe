import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";

export type TimMember = {
  user_id: string;
  nama: string;
  jurusan: string;
  member_ke: number;
  no_pengenal: string;
  no_telp: string;
  spesialisasi: string[];
};

export function useTimMembers(timId?: string) {
  return useQuery({
    queryKey: ["tim", timId, "members"],
    queryFn: async (): Promise<TimMember[]> => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const response = await api.get<TimMember[]>(`/api/tim/${timId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: Boolean(timId && getToken()),
  });
}
