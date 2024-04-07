declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;

    REDIS_HOST: string
    REDIS_USERNAME: string
    REDIS_PASSWORD: string
    REDIS_PORT: number
    REDIS_URI: string
  }
}