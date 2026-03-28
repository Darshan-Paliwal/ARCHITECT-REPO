/**
 * Auth Store (Zustand)
 * Manages admin authentication state
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminApi } from "@/lib/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await adminApi.login({ email, password });
          const { token, admin } = res.data;
          localStorage.setItem("arcstudio_token", token);
          set({ admin, token, isLoading: false });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.response?.data?.error || "Login failed" };
        }
      },

      logout: () => {
        localStorage.removeItem("arcstudio_token");
        set({ admin: null, token: null });
      },

      fetchMe: async () => {
        try {
          const res = await adminApi.getMe();
          set({ admin: res.data });
        } catch {
          get().logout();
        }
      },

      isAuthenticated: () => !!get().token && !!get().admin,
    }),
    {
      name: "arcstudio-auth",
      partialize: (state) => ({ admin: state.admin, token: state.token }),
    }
  )
);

export default useAuthStore;
