import pino from "pino";
import pinoPretty from "pino-pretty";

const prettyStream = pinoPretty({
  colorize: true,
  singleLine: true,
});

export const logger = pino(prettyStream);
