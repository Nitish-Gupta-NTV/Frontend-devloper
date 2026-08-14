import { create } from "zustand";
import { persist } from "zustand/middleware";

export const STEP_LABELS = ["basic", "education", "skills", "experience", "projects", "certs","SocialmediaLinks ", "review"];

export const usePortfolioWizardStore = create(
  persist(
    (set, get) => ({
      currentStep: 0,
      completedSteps: [],

      goToStep: (index) => set({ currentStep: index }),

      completeStep: (index) => {
        const { completedSteps } = get();
        const next = completedSteps.includes(index) ? completedSteps : [...completedSteps, index];
        set({ completedSteps: next, currentStep: Math.min(index + 1, STEP_LABELS.length - 1) });
      },

      goBack: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

      reset: () => set({ currentStep: 0, completedSteps: [] }),
    }),
    { name: "portfolio-wizard-progress" } // localStorage key — lets the user resume later
  )
);