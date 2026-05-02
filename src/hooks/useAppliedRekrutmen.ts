import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { Rekrutmen } from "@/hooks/useRekrutmen";

export type AppliedRekrutmenStatus = "pending" | "approved" | "rejected";

export type AppliedRekrutmen = {
  pendaftar_id: string;
  status: AppliedRekrutmenStatus;
  rekrutmen: Rekrutmen;
};

export function useAppliedRekrutmen() {
  const token = getToken();

  const query = useQuery({
    queryKey: ["rekrutmen", "applied"],
    queryFn: async () => {
      const response = await axios.get<AppliedRekrutmen[]>(
        `${baseURL}/api/rekrutmen/applied`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: Boolean(token),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
