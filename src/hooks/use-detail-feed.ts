"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export type RecruitmentDetail = {
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

const recruitmentKeys = {
  all: ["rekrutmen"] as const,
  detail: (id: string) => ["rekrutmen", id] as const,
};

async function fetchRecruitmentDetail(
  recruitmentId: string,
): Promise<RecruitmentDetail> {
  if (!recruitmentId) {
    throw new Error("Recruitment ID is required.");
  }

  const response = await api.get<RecruitmentDetail>(
    `/api/rekrutmen/${recruitmentId}`,
  );

  return response.data;
}

export function useRecruitmentDetail(recruitmentId?: string) {
  return useQuery({
    queryKey: recruitmentId
      ? recruitmentKeys.detail(recruitmentId)
      : recruitmentKeys.all,

    queryFn: () => fetchRecruitmentDetail(recruitmentId!),

    enabled: Boolean(recruitmentId),

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
