"use server"

import { SUPABASE } from "@/constant/supabase";
import { Tables } from "@/model/database/database.types";
import { log } from "console";
import 'server-only';

export async function GetAllCastaway() : Promise<Tables<'the_sims_castaway_product'>[]>
{
  return (await SUPABASE.from('the_sims_castaway_product')
    .select())
    .data ?? [];
}
export async function GetAllPets() : Promise<Tables<'the_sims_two_pets_product'>[]>
{
  return (await SUPABASE.from('the_sims_two_pets_product')
    .select())
    .data ?? [];
}
export async function GetAllJobs() : Promise<Tables<'the_sims_bustin_out_job'>[]>
{
  return (await SUPABASE.from('the_sims_bustin_out_job')
    .select())
    .data ?? [];
}