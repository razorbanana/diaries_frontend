/** Signature of a logging function */
export interface LogFn {
    (message?: any, ...optionalParams: any[]): void;
  }
  
  /** Basic logger interface */
  export interface Logger {
    info: LogFn;
    warn: LogFn;
    error: LogFn;
  }
  
  /** Logger which outputs to the browser console */
  export class ConsoleLogger implements Logger {
    readonly info: LogFn;
    readonly warn: LogFn;
    readonly error: LogFn;

  constructor() {
    this.info = console.log.bind(console);
    this.warn = console.warn.bind(console);
    this.error = console.error.bind(console);
  }
  }

export default ConsoleLogger;


