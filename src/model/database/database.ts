import { Database } from "./database.types";

export type TABLE_NAME = keyof (Database["public"]["Tables"] & Database["public"]["Views"]);
