import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next/types";
import Cookies from "universal-cookie";

import { getToken, removeToken } from "@/lib/cookies";
import { UninterceptedApiError } from "@/types/api";

let context: GetServerSidePropsContext | undefined;

export function setApiContext(newContext: GetServerSidePropsContext) {
  context = newContext;
}

export const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NEXT_PUBLIC_RUN_MODE === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV);

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.defaults.withCredentials = false;

const isBrowser = typeof window !== "undefined";

// prevent multiple expired-session events firing at once
let hasDispatchedSessionExpired = false;

api.interceptors.request.use((config) => {
  if (config.headers) {
    let token: string | undefined;

    if (!isBrowser) {
      if (!context) {
        throw new Error(
          "Api Context not found. You must call `setApiContext(context)` before calling api on server-side.",
        );
      }

      const cookies = new Cookies(context.req?.headers.cookie);

      token = cookies.get("@next-starter/token");
    } else {
      token = getToken();
    }

    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<UninterceptedApiError>) => {
    const status = error.response?.status;

    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    if (status === 401 && isBrowser) {
      removeToken();

      if (!hasDispatchedSessionExpired) {
        hasDispatchedSessionExpired = true;

        window.dispatchEvent(
          new CustomEvent("auth:expired", {
            detail: {
              message: "Sesi kamu telah berakhir. Silakan login kembali.",
            },
          }),
        );

        // reset after short delay to avoid spam
        setTimeout(() => {
          hasDispatchedSessionExpired = false;
        }, 1500);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
