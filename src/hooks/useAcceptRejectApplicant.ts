import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";

export function useAcceptRejectApplicant(rekrutmenId: string) {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: async (pendaftarId: string) => {
      const token = getToken();
      if (!token) throw new Error("No token");
      await api.patch(
        `/api/rekrutmen/${rekrutmenId}/apply/${pendaftarId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rekrutmen", rekrutmenId, "applicants"],
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (pendaftarId: string) => {
      const token = getToken();
      if (!token) throw new Error("No token");
      await api.patch(
        `/api/rekrutmen/${rekrutmenId}/apply/${pendaftarId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rekrutmen", rekrutmenId, "applicants"],
      });
    },
  });

  return {
    accept: acceptMutation.mutate,
    reject: rejectMutation.mutate,
    isAccepting: acceptMutation.isPending,
    isRejecting: rejectMutation.isPending,
    activePendaftarId: acceptMutation.isPending
      ? acceptMutation.variables
      : rejectMutation.isPending
      ? rejectMutation.variables
      : null,
  };
}
