import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";
import { Rekrutmen } from "@/hooks/useRekrutmen";
import { useAuth } from "@/hooks/use-auth";

export function useMyRekrutmen() {
  const { isAuthenticated } = useAuth();

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
    enabled: isAuthenticated,
  });
}