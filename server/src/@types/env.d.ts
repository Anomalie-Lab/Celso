declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_SECRET: string;
      NEXT_PUBLIC_SESSION_COOKIE: string;
      NEXT_PUBLIC_IS_IN_SESSION: string;
      NEXT_PUBLIC_NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_DATABASE_URL: string;
      NEXT_PUBLIC_PORT: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_API_URL: string;
      }
  }