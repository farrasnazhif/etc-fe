import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "@/lib/api";
import { getToken } from "@/lib/cookies";

type ApplyInput = {
  fileCV: File;
  filePortfolio?: File | null;
  alasan: string;
};

export function useApplyRekrutmen(rekrutmenId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ fileCV, filePortfolio, alasan }: ApplyInput) => {
      const token = getToken();

      try {
        // Step 1: Upload CV
        const cvFormData = new FormData();
        cvFormData.append("cv", fileCV);

        const cvResponse = await axios.post<{ url: string }>(
          `${baseURL}/api/rekrutmen/${rekrutmenId}/apply/cv`,
          cvFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cv_url = cvResponse.data.url;

        // Step 2: Upload Portfolio (optional)
        let portofolio_url = "";
        if (filePortfolio) {
          const portfolioFormData = new FormData();
          portfolioFormData.append("portfolio", filePortfolio);

          const portfolioResponse = await axios.post<{ url: string }>(
            `${baseURL}/api/rekrutmen/${rekrutmenId}/apply/portfolio`,
            portfolioFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          portofolio_url = portfolioResponse.data.url;
        }

        // Step 3: Submit apply
        const applyResponse = await axios.post(
          `${baseURL}/api/rekrutmen/${rekrutmenId}/apply`,
          {
            alasan_mendaftar: alasan,
            cv_url: cv_url,
            portofolio_url: portofolio_url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return applyResponse.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.error === "sudah mendaftar ke rekrutmen ini") {
          throw new Error("Anda sudah mendaftar ke rekrutmen ini.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rekrutmen"] });
    },
  });

  return {
    apply: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
