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
    onSuccess: async () => {
      // Step 1 — refresh applicants
      await queryClient.refetchQueries({
        queryKey: ["rekrutmen", rekrutmenId, "applicants"],
      });

      // Step 2 — refresh rekrutmen detail to get fresh tim_id
      await queryClient.refetchQueries({
        queryKey: ["rekrutmen", rekrutmenId],
      });

      // Step 3 — read fresh tim_id from cache after refetch
      const freshDetail = queryClient.getQueryData<{ tim_id?: string }>(
        ["rekrutmen", rekrutmenId]
      );
      const freshTimId = freshDetail?.tim_id ?? timId;

      // Step 4 — refetch members using fresh tim_id
      if (freshTimId) {
        await queryClient.refetchQueries({
          queryKey: ["tim", freshTimId, "members"],
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
    onSuccess: async () => {
      // Step 1 — refresh applicants
      await queryClient.refetchQueries({
        queryKey: ["rekrutmen", rekrutmenId, "applicants"],
      });

      // Step 2 — refresh rekrutmen detail to get fresh tim_id
      await queryClient.refetchQueries({
        queryKey: ["rekrutmen", rekrutmenId],
      });

      // Step 3 — read fresh tim_id from cache after refetch
      const freshDetail = queryClient.getQueryData<{ tim_id?: string }>(
        ["rekrutmen", rekrutmenId]
      );
      const freshTimId = freshDetail?.tim_id ?? timId;

      // Step 4 — refetch members using fresh tim_id
      if (freshTimId) {
        await queryClient.refetchQueries({
          queryKey: ["tim", freshTimId, "members"],
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
