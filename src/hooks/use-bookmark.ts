"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

type BookmarkResponse = {
  message: string;
};

export type RecruitmentBookmark = {
  id: string;
  rekrutmen_id: string;
  rekrutmen: {
    rekrutmen_id: string;
    user_id: string;
    kegiatan: string;
    Kriteria: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    fee: number;
    role: string;
    contact_person: string;
  };
};

export function useGetAllBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const response = await api.get<RecruitmentBookmark[]>("/auth/bookmarks");

      return response.data;
    },
  });
}

export function useAddBookmarkRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recruitmentId: string) => {
      const response = await api.post<BookmarkResponse>(
        `/auth/${recruitmentId}/bookmark`,
      );

      return response.data;
    },

    onSuccess: async (_, recruitmentId) => {
      // cache refresh
      await queryClient.invalidateQueries({
        queryKey: ["recruitment-detail", recruitmentId],
      });

      // cache refresh
      await queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
}

export function useDeleteBookmarkRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recruitmentId: string) => {
      const response = await api.delete<BookmarkResponse>(
        `/auth/${recruitmentId}/bookmark`,
      );

      return response.data;
    },

    onSuccess: async (_, recruitmentId) => {
      // cache refresh
      await queryClient.invalidateQueries({
        queryKey: ["recruitment-detail", recruitmentId],
      });

      // cache refresh
      await queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
}
