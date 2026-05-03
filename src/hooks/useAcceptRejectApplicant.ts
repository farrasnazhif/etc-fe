import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/lib/cookies";
import api from "@/lib/api";

export function useAcceptRejectApplicant(rekrutmenId: string, timId?: string) {
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
      queryClient.refetchQueries({
        queryKey: ["rekrutmen", rekrutmenId, "applicants"],
      });
      if (timId) {
        queryClient.refetchQueries({
          queryKey: ["tim", timId, "members"],
        });
      }
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
      queryClient.refetchQueries({
        queryKey: ["rekrutmen", rekrutmenId, "applicants"],
      });
      if (timId) {
        queryClient.refetchQueries({
          queryKey: ["tim", timId, "members"],
        });
      }
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
