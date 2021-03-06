const hashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

const intToRGB = (i: number): string => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}

const stringToHexColor = (str: string): string => {
  return `#${intToRGB(hashCode(str))}`
}

/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import { Logger } from 'app/core/logger.service';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */

/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug
}

/**
 * Log output handler function.
 */
export type LogOutput = (
  source: string,
  level: LogLevel,
  ...objects: any[]
) => void

export class Logger {
  /**
   * Current logging level.
   * Set it to LogLevel.Off to disable logs completely.
   */
  static level = LogLevel.Debug

  /**
   * Additional log outputs.
   */
  static outputs: LogOutput[] = []

  /**
   * Enables production mode.
   * Sets logging level to LogLevel.Warning.
   */
  static enableProductionMode() {
    Logger.level = LogLevel.Off
  }

  constructor(private source: string, private sourceLevel?: LogLevel) {}

  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.log().
   */
  debug(...objects: any[]) {
    this.log(console.log, LogLevel.Debug, objects)
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.info().
   */
  info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects)
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.warn().
   */
  warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warning, objects)
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.error().
   */
  error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects)
  }

  private log(func: Function, level: LogLevel, objects: any[]) {
    const currentLevel =
      typeof this.sourceLevel === 'number' ? this.sourceLevel : Logger.level

    if (level <= currentLevel) {
      const log = this.source
        ? [
            `%c[${this.source}]`,
            `color:${stringToHexColor(this.source)};font-weight:bold;`
          ].concat(objects)
        : objects
      func.apply(console, log)
      Logger.outputs.forEach((output) =>
        output.apply(output, [this.source, level, ...objects])
      )
    }
  }
}
