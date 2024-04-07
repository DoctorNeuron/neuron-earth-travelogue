"use server"

import { Redis } from 'ioredis';

export const GetRedis = () => new Redis(process.env.REDIS_URI)