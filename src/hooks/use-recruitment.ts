"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { AxiosError } from "axios";

export type Recruitment = {
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

export type AppliedRecruitment = {
  pendaftar_id: string;
  status: "pending" | "accepted" | "rejected";
  rekrutmen: Recruitment;
};

export type ApplyRecruitmentInput = {
  recruitmentId: string;
  alasan_mendaftar: string;
  cv_url: string;
  portofolio_url: string;
};

export type ApplyRecruitmentResponse = {
  pendaftar_id: string;
  rekrutmen_id: string;
  user_id: string;
  alasan_mendaftar: string;
  cv_url: string;
  portofolio_url: string;
  status: "pending" | "accepted" | "rejected";
  nama_pendaftar: string;
};

export type ApplyCvInput = {
  recruitmentId: string;
  url: string;
};

export type ApplyPortfolioInput = {
  recruitmentId: string;
  url: string;
};

export type ApplyFileResponse = {
  url: string;
};

type ApplyRecruitmentErrorResponse = {
  error?: string;
  message?: string;
};

const recruitmentApplyKeys = {
  all: ["recruitment", "apply"] as const,
  applied: ["recruitment", "applied"] as const,
  detail: (recruitmentId: string) =>
    ["recruitment", "detail", recruitmentId] as const,
};

async function fetchAppliedRecruitments(): Promise<AppliedRecruitment[]> {
  const response = await api.get<AppliedRecruitment[]>(
    "/api/rekrutmen/applied",
  );

  return response.data;
}

export function useGetAppliedRecruitments() {
  return useQuery({
    queryKey: recruitmentApplyKeys.applied,
    queryFn: fetchAppliedRecruitments,
  });
}

async function applyRecruitment({
  recruitmentId,
  alasan_mendaftar,
  cv_url,
  portofolio_url,
}: ApplyRecruitmentInput): Promise<ApplyRecruitmentResponse> {
  try {
    const response = await api.post<ApplyRecruitmentResponse>(
      `/api/rekrutmen/${recruitmentId}/apply`,
      {
        alasan_mendaftar,
        cv_url,
        portofolio_url,
      },
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApplyRecruitmentErrorResponse>;

    throw new Error(
      axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        "Gagal mengajukan pendaftaran rekrutmen.",
    );
  }
}

async function applyRecruitmentCv({
  recruitmentId,
  url,
}: ApplyCvInput): Promise<ApplyFileResponse> {
  try {
    const response = await api.post<ApplyFileResponse>(
      `/api/rekrutmen/${recruitmentId}/apply/cv`,
      {
        url,
      },
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApplyRecruitmentErrorResponse>;

    throw new Error(
      axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        "Gagal mengirim CV rekrutmen.",
    );
  }
}

async function applyRecruitmentPortfolio({
  recruitmentId,
  url,
}: ApplyPortfolioInput): Promise<ApplyFileResponse> {
  try {
    const response = await api.post<ApplyFileResponse>(
      `/api/rekrutmen/${recruitmentId}/apply/portfolio`,
      {
        url,
      },
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApplyRecruitmentErrorResponse>;

    throw new Error(
      axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        "Gagal mengirim portofolio rekrutmen.",
    );
  }
}

// hooks

export function useApplyRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyRecruitment,

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.detail(variables.recruitmentId),
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.applied,
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.all,
      });
    },
  });
}

export function useApplyRecruitmentCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyRecruitmentCv,

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.detail(variables.recruitmentId),
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.applied,
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.all,
      });
    },
  });
}

export function useApplyRecruitmentPortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyRecruitmentPortfolio,

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.detail(variables.recruitmentId),
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.applied,
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentApplyKeys.all,
      });
    },
  });
}
