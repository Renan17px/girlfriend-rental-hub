import { create } from "zustand";

type ThemeMode = "light" | "dark";

type UiStore = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));
