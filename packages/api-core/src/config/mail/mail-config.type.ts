export type MailConfig = {
  MAIL_PORT: number;
  MAIL_HOST?: string;
  MAIL_USER?: string;
  MAIL_PASSWORD?: string;
  MAIL_DEFAULT_EMAIL?: string;
  MAIL_DEFAULT_NAME?: string;
  MAIL_IGNORE_TLS: boolean;
  MAIL_SECURE: boolean;
  MAIL_REQUIRE_TLS: boolean;
};
