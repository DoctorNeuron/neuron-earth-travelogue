import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export type ICurrency =
  "-" | "idr" | "sgd" | "usd" | "sar" | "try" | "eur" | "myr";

export interface IGlobalStore {

  /** True: Navbar dicollapse ke samping */
  navbarCollapse: boolean,

  /** Mata  */
  currency: ICurrency,
  picturePopup: string,
  setNavbarCollapse: (n?: boolean) => void,
  setCurrency: (currency: ICurrency) => void,
  setPicturePopup: (source: string) => void
}

export const useGlobalStore = create<IGlobalStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        navbarCollapse: true,
        currency: "-",
        picturePopup: "",
        setNavbarCollapse: (n?: boolean) => set((state) => ({ navbarCollapse: (typeof n === 'boolean' ? n : !state.navbarCollapse) })),
        setCurrency: (currency: ICurrency) => set(() => ({ currency: currency })),
        setPicturePopup: (source: string = "") => set(() => ({ picturePopup: source })),
      }),
      {
        name: 'global-storage',
        partialize: (state) => ({
          currency: state.currency
        })
      }
    )
  )
)