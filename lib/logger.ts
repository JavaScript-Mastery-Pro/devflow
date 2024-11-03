import "server-only";
import pino, { Logger, LoggerOptions } from "pino";

interface SerializedError {
  type?: string;
  message: string;
  stack?: string;
  code?: string | number;
  name: string;
}

interface ExtendedError extends Error {
  type?: string;
  code?: string | number;
}

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";
const logLevel: string =
  process.env.LOG_LEVEL || (isProduction ? "warn" : "debug");

const errorSerializer = (err: ExtendedError): SerializedError => {
  return {
    type: err.type,
    message: err.message,
    stack: err.stack,
    code: err.code,
    name: err.name,
  };
};

const loggerOptions: LoggerOptions = {
  level: logLevel,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
    log: (obj) => {
      if (obj.err instanceof Error) {
        return { ...obj, err: errorSerializer(obj.err) };
      }
      return obj;
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    !isEdge && !isProduction
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
            messageFormat: "[{level}] {msg}",
          },
        }
      : undefined,
};

const logger: Logger = pino(loggerOptions);

export default logger;
