"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export type GiveMemberRatingPayload = {
  rating: number;
  deskripsi: string;
};

export type GiveMemberRatingResponse = {
  message: string;
};

async function giveMemberRating(
  timId: string,
  userId: string,
  payload: GiveMemberRatingPayload,
): Promise<GiveMemberRatingResponse> {
  if (!timId) {
    throw new Error("Tim ID is required.");
  }

  if (!userId) {
    throw new Error("User ID is required.");
  }

  if (!payload.rating || payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  if (!payload.deskripsi.trim()) {
    throw new Error("Deskripsi is required.");
  }

  const response = await api.post<GiveMemberRatingResponse>(
    `/api/tim/${timId}/members/${userId}/rating`,
    payload,
  );

  return response.data;
}

export function useGiveMemberRating(timId?: string, userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GiveMemberRatingPayload) => {
      if (!timId || !userId) {
        throw new Error("Tim ID and User ID are required.");
      }

      return giveMemberRating(timId, userId, payload);
    },

    onSuccess: () => {
      // refresh member detail / applicant detail / related histories
      queryClient.invalidateQueries({
        queryKey: ["applicant-detail"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tim-members"],
      });

      queryClient.invalidateQueries({
        queryKey: ["rekrutmen"],
      });
    },
  });
}
