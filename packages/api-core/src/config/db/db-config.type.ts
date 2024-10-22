export interface DBConfig {
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;

  // #DB_NAMES
  POSTGRES_USER_DATABASE: string;
}
