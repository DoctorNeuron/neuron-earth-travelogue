import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type ICurrency = "-" | "idr" | "sgd" | "usd";

export interface IGlobalStore {
  navbarCollapse: boolean,
  currency: ICurrency,
  setNavbarCollapse: () => void,
  setCurrency: (currency: ICurrency) => void
}

export const useGlobalStore = create<IGlobalStore>()(
  persist(
    (set) => ({
      navbarCollapse: false,
      currency: "-",
      setNavbarCollapse: () => set((state) => ({ navbarCollapse: !state.navbarCollapse })),
      setCurrency: (currency: ICurrency) => set(() => ({ currency: currency })) 
    }),
    {
      name: 'global-storage'
    }
  )
)