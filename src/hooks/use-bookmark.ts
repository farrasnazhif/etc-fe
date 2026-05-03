"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { AxiosError } from "axios";

type BookmarkResponse = {
  message: string;
};

type BookmarkErrorResponse = {
  error?: string;
  message?: string;
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

export const bookmarkKeys = {
  all: ["bookmarks"] as const,

  detail: (recruitmentId: string) =>
    ["recruitment-detail", recruitmentId] as const,
};

export function useGetAllBookmarks() {
  return useQuery({
    queryKey: bookmarkKeys.all,

    queryFn: async (): Promise<RecruitmentBookmark[]> => {
      try {
        const response =
          await api.get<RecruitmentBookmark[]>("/auth/bookmarks");

        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<BookmarkErrorResponse>;

        throw new Error(
          axiosError.response?.data?.error ||
            axiosError.response?.data?.message ||
            "Gagal mengambil data bookmark.",
        );
      }
    },

    staleTime: 1000 * 60 * 5,

    retry: false,
  });
}

export function useAddBookmarkRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recruitmentId: string): Promise<BookmarkResponse> => {
      try {
        const response = await api.post<BookmarkResponse>(
          `/auth/${recruitmentId}/bookmark`,
        );

        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<BookmarkErrorResponse>;

        throw new Error(
          axiosError.response?.data?.error ||
            axiosError.response?.data?.message ||
            "Gagal menambahkan bookmark.",
        );
      }
    },

    onSuccess: async (_, recruitmentId) => {
      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.detail(recruitmentId),
      });

      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
      });
    },
  });
}

export function useDeleteBookmarkRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recruitmentId: string): Promise<BookmarkResponse> => {
      try {
        const response = await api.delete<BookmarkResponse>(
          `/auth/${recruitmentId}/bookmark`,
        );

        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<BookmarkErrorResponse>;

        throw new Error(
          axiosError.response?.data?.error ||
            axiosError.response?.data?.message ||
            "Gagal menghapus bookmark.",
        );
      }
    },

    onSuccess: async (_, recruitmentId) => {
      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.detail(recruitmentId),
      });

      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
      });
    },
  });
}
