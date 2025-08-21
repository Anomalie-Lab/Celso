declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_SECRET: string;
      NEXT_SESSION_COOKIE: string;
      NEXT_IS_IN_SESSION: string;
      NEXT_NODE_ENV: "development" | "production" | "test";
      NEXT_DATABASE_URL: string;
      NEXT_PORT: string;
      NEXT_APP_URL: string;
      NEXT_API_URL: string;
      }
  }