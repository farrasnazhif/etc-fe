import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export type UpdateRekrutmenInput = {
  kegiatan: "projek" | "lomba" | "riset";
  Kriteria: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  fee: number;
  role: string;
  contact_person: string;
};

export function useUpdateDeleteRekrutmen(rekrutmenId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: async (input: UpdateRekrutmenInput) => {
      const token = getToken();
      if (!token) throw new Error("No token");
      await api.put(`/api/rekrutmen/${rekrutmenId}`, input, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rekrutmen", rekrutmenId] });
      queryClient.invalidateQueries({ queryKey: ["rekrutmen", "mine"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (!token) throw new Error("No token");
      await api.delete(`/api/rekrutmen/${rekrutmenId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rekrutmen", "mine"] });
      router.push("/tim-saya");
    },
  });

  return {
    update: updateMutation.mutate,
    deletee: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
