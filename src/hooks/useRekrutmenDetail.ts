import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";
import { Rekrutmen } from "@/hooks/useRekrutmen";

export function useRekrutmenDetail(rekrutmenId: string) {
  return useQuery({
    queryKey: ["rekrutmen", rekrutmenId],
    queryFn: async (): Promise<Rekrutmen & { tim_id?: string }> => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const response = await api.get<Rekrutmen & { tim_id?: string }>(`/api/rekrutmen/${rekrutmenId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: Boolean(rekrutmenId && getToken()),
  });
}
