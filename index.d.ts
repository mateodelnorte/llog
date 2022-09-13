declare type BunyanLogFunction = (formatMessage?: string, ...interpolationArg?: unknown[]) => void;
declare type DebugLogFunction = (formatMessage?: string, ...interpolationArg?: unknown[]) => void;
declare type PinoLogFunction = (merginObject?: unknown, formatMessage?: string, ...interpolationArg?: unknown[]) => void;
declare type LlogFunction = BunyanLogFunction | DebugLogFunction | PinoLogFunction;

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