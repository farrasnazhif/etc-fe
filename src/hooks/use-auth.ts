"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/api";
import { getToken, removeToken, setToken } from "@/lib/cookies";

export type UserRole = "mahasiswa" | "dosen" | "admin";

export type AuthUser = {
  user_id: string;
  nama: string;
  jurusan?: string;
  no_pengenal: string;
  no_telp: string;
  role: UserRole;
  profile_picture?: string | null;
  spesialisasi?: string[];
};

type AuthPayload = {
  token?: string;
  role?: UserRole;
  user?: AuthUser;
  data?: AuthPayload | AuthUser;
  [key: string]: unknown;
};

export type RegisterInput = {
  nama: string;
  jurusan?: string;
  no_pengenal: string;
  no_telp: string;
  role: "mahasiswa" | "dosen";
  password: string;
  spesialisasi?: string[];
};

export type LoginInput = {
  no_pengenal: string;
  password: string;
};

const authKeys = {
  me: ["auth", "me"] as const,
};

function extractToken(payload: AuthPayload): string | undefined {
  if (payload.token) return payload.token;

  if (payload.data && typeof payload.data === "object") {
    return extractToken(payload.data as AuthPayload);
  }

  return undefined;
}

function extractUser(payload: AuthPayload): AuthUser | undefined {
  if (payload.user) return payload.user;

  if ("personal_info" in payload) {
    return payload.personal_info as AuthUser;
  }

  if (payload.data) {
    if (typeof payload.data === "object") {
      if ("user" in payload.data) {
        return extractUser(payload.data as AuthPayload);
      }

      if ("personal_info" in payload.data) {
        return (payload.data as { personal_info: AuthUser }).personal_info;
      }
    }

    return payload.data as AuthUser;
  }

  return undefined;
}

async function fetchMe(): Promise<AuthUser> {
  const response = await api.get<AuthPayload>("/auth/me");
  const user = extractUser(response.data);

  if (!user) {
    throw new Error("Data profil tidak ditemukan.");
  }

  return user;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [token, setAuthToken] = useState(() => getToken());

  const me = useQuery({
    queryKey: authKeys.me,
    queryFn: fetchMe,
    enabled: Boolean(token),
  });

  const login = useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await api.post<AuthPayload>("/auth/login", input);

      const token = extractToken(response.data);

      if (!token) {
        throw new Error("Login berhasil, tapi token tidak ditemukan.");
      }

      setToken(token);
      setAuthToken(token);

      return {
        token,
        role: response.data.role,
      };
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authKeys.me,
      });
    },
  });

  const register = useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await api.post<AuthPayload>("/auth/register", input);

      const token = extractToken(response.data);

      if (token) {
        setToken(token);
        setAuthToken(token);
      }

      return extractUser(response.data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authKeys.me,
      });
    },
  });

  function logout() {
    removeToken();
    setAuthToken(undefined);

    queryClient.removeQueries({
      queryKey: authKeys.me,
    });
  }

  return {
    user: me.data,
    isAuthenticated: Boolean(token),
    isLoadingUser: me.isLoading,
    userError: me.error,
    refetchUser: me.refetch,

    login,
    register,
    logout,
  };
}
