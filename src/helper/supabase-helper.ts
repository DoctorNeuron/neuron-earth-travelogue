"use server"

import { GetRedis } from '@/constant/redis';
import { SUPABASE } from '@/constant/supabase';
import { TABLE_NAME } from '@/model/database/database';
import { Tables } from "@/model/database/database.types";

export async function GetSupabaseData<T extends TABLE_NAME>(tableName: TABLE_NAME): Promise<Tables<T>[]>{
  const REDIS = GetRedis();
  const value = await REDIS.get(tableName);
  
  if (value === null) {
    const newData = (await SUPABASE.from(tableName)
      .select()
    ).data ?? []
    await REDIS.set(tableName, JSON.stringify(newData), 'EX', 86400);
    return newData as Tables<T>[];
  }

  return JSON.parse(value) as Tables<T>[]
}