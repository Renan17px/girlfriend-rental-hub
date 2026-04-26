import { create } from "zustand";
import type { ProfileDetails } from "@/lib/profile-mock";

export type AuthModalView = "login" | "signup" | null;

export type CheckoutItem = {
  type: "plan" | "booking" | "profile-subscription";
  name: string;
  reference?: string;
  amountCents: number;
  currency?: string;
  bookingId?: string;
};

type OverlaysState = {
  authView: AuthModalView;
  authPendingAction: (() => void) | null;
  openAuth: (view: Exclude<AuthModalView, null>, onSuccess?: () => void) => void;
  closeAuth: () => void;

  profileDrawer: ProfileDetails | null;
  openProfileDrawer: (profile: ProfileDetails) => void;
  closeProfileDrawer: () => void;

  checkout: CheckoutItem | null;
  openCheckout: (item: CheckoutItem) => void;
  closeCheckout: () => void;
};

export const useOverlays = create<OverlaysState>((set, get) => ({
  authView: null,
  authPendingAction: null,
  openAuth: (view, onSuccess) =>
    set({ authView: view, authPendingAction: onSuccess ?? null }),
  closeAuth: () => set({ authView: null, authPendingAction: null }),

  profileDrawer: null,
  openProfileDrawer: (profile) => set({ profileDrawer: profile }),
  closeProfileDrawer: () => set({ profileDrawer: null }),

  checkout: null,
  openCheckout: (item) => set({ checkout: item }),
  closeCheckout: () => set({ checkout: null }),
}));

/** Helper: run `action` if logged in, otherwise open login modal first. */
export function requireAuth(isLoggedIn: boolean, action: () => void) {
  if (isLoggedIn) {
    action();
  } else {
    useOverlays.getState().openAuth("login", action);
  }
}
