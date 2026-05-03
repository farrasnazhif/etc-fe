// hooks/useApplicantDetail.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { AxiosError } from "axios";

export type ApplicantHistory = {
  id: string;
  reviewer_user_id: string;
  reviewer_name: string;
  tim_id: string;
  tipe_tim: string;
  rating: number;
  deskripsi: string;
  created_at: string;
};

export type ApplicantDetail = {
  pendaftar_id: string;
  rekrutmen_id: string;
  user_id: string;
  alasan_mendaftar: string;
  cv_url: string;
  portofolio_url: string;
  status: "pending" | "approved" | "rejected";
  nama_pendaftar: string;
  histories: ApplicantHistory[];
};

type ApplicantDetailErrorResponse = {
  error?: string;
  message?: string;
};

const applicantDetailKeys = {
  all: ["applicant-detail"] as const,

  detail: (rekrutmenId: string, pendaftarId: string) =>
    ["applicant-detail", rekrutmenId, pendaftarId] as const,
};

async function fetchApplicantDetail(
  rekrutmenId: string,
  pendaftarId: string,
): Promise<ApplicantDetail> {
  try {
    const response = await api.get<ApplicantDetail>(
      `/api/rekrutmen/${rekrutmenId}/applicants/${pendaftarId}`,
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApplicantDetailErrorResponse>;

    throw new Error(
      axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        "Gagal mengambil detail pelamar.",
    );
  }
}

export function useApplicantDetail(rekrutmenId?: string, pendaftarId?: string) {
  return useQuery({
    queryKey:
      rekrutmenId && pendaftarId
        ? applicantDetailKeys.detail(rekrutmenId, pendaftarId)
        : applicantDetailKeys.all,

    queryFn: () => {
      if (!rekrutmenId || !pendaftarId) {
        throw new Error("rekrutmenId atau pendaftarId tidak valid.");
      }

      return fetchApplicantDetail(rekrutmenId, pendaftarId);
    },

    enabled: Boolean(rekrutmenId && pendaftarId),
  });
}
