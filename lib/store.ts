import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppState {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  contactFormData: {
    name: string
    email: string
    subject: string
    message: string
  }
  setContactFormData: (data: Partial<AppState["contactFormData"]>) => void
  resetContactForm: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      contactFormData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      setContactFormData: (data) =>
        set((state) => ({
          contactFormData: { ...state.contactFormData, ...data },
        })),
      resetContactForm: () =>
        set({
          contactFormData: {
            name: "",
            email: "",
            subject: "",
            message: "",
          },
        }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ theme: state.theme, contactFormData: state.contactFormData }),
    },
  ),
)
