declare type LlogFunction = (merginObject?: string | Error | unknown, formatMessage?: string, ...interpolationArg: unknown[]) => void;

declare interface logger {
  trace: LlogFunction,
  debug: LlogFunction,
  info: LlogFunction,
  warn: LlogFunction,
  error: LlogFunction,
  fatal: LlogFunction,
}

declare module "llog" {
  export default logger;
}