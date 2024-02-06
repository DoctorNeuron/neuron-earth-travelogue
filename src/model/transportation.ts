import { ICurrency } from "@/utilities/store"

export interface TransportationRoute {
  name: string,
  price: number,
  route: string[]
}

export interface TransportationMode {
  type: "bus" | "mrt" | "train" | "lrt",
  price: number,
  currency: Omit<ICurrency, "-">,
  routes: TransportationRoute[]
}

export interface TransportationList {

  /** Date of visit */
  [key: string]: {

    /** ID */
    [key: string]: TransportationMode
  }
}