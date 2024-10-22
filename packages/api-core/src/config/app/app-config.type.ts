export interface AppConfig {
  // #ENV
  NODE_ENV: string;
  // #API
  API_PROTOCOL: string;
  API_HOST: string;
  API_PORT: number;
  API_PREFIX: string;
  JWT_SECRET_KEY: string;
  API_SECRET_KEY: string;
  // #REDIS
  REDIS_HOST: string;
  REDIS_PORT: number;
  // NATS
  NATS_HOST: string;
  NATS_PORT: number;
  // APP
  WORKING_DIRECTORY: string;
  APP_NAME: string;
  FRONTEND_DOMAIN?: string;
  BACKEND_DOMAIN: string;
}
