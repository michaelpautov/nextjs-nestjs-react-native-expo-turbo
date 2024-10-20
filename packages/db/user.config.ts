import type { Config } from "drizzle-kit";

const createDbConfig = (dbName: string): Config => {
  const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } =
    process.env;
  return {
    schema: `./src/${dbName}/**/*.ts`,
    out: `./supabase/migrations/${dbName}`,
    dialect: "postgresql",
    dbCredentials: {
      host: POSTGRES_HOST || "localhost",
      port: Number(POSTGRES_PORT) || 5432,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: dbName,
    },
  };
};

if (
  !process.env.POSTGRES_USER_DATABASE ||
  !process.env.POSTGRES_TASK_DATABASE
) {
  throw new Error("Missing POSTGRES_USER_DATABASE or POSTGRES_TASK_DATABASE");
}

export const usersDbConfig: Config = createDbConfig(
  process.env.POSTGRES_USER_DATABASE,
);

export const tasksDbConfig: Config = createDbConfig(
  process.env.POSTGRES_TASK_DATABASE,
);
