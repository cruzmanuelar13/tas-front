'use client';

import { create } from 'zustand';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;

  setAuth: (
    token: string,
    user: User,
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    token: null,
    user: null,

    setAuth: (token, user) => {
      localStorage.setItem(
        'token',
        token,
      );

      set({
        token,
        user,
      });
    },

    logout: () => {
      localStorage.removeItem(
        'token',
      );

      set({
        token: null,
        user: null,
      });
    },
  }));