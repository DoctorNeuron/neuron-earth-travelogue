"use server"

import { GetSupabaseData } from "@/helper/supabase-helper";
import 'server-only';

export const GetAllCastaway = async() => await GetSupabaseData<'the_sims_castaway_product'>('the_sims_castaway_product');
export const GetAllPets = async() => await GetSupabaseData<'the_sims_two_pets_product'>('the_sims_two_pets_product');
export const GetAllJobs = async() => await GetSupabaseData<'the_sims_bustin_out_job'>('the_sims_bustin_out_job');