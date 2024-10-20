import type { Config } from "drizzle-kit";

export const createDbConfig = (dbName: string): Config => {
  const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } =
    process.env;
  return {
    schema: `./src/${dbName}/**/*.ts`,
    out: `./src/supabase/migrations/${dbName}`,
    dialect: "postgresql",
    dbCredentials: {
      host: POSTGRES_HOST || "localhost",
      port: Number(POSTGRES_PORT) || 5432,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: dbName,
      ssl: false,
    },
  };
};
