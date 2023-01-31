/* eslint-disable @typescript-eslint/no-empty-function */
const isServer = process.env.SERVER;
const bgColorStyle = (color) =>
  `color: white; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`;
const bgColorStyleBlack = (color) =>
  `color: black; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`;
const appName = process.env.WEB_NAME;

/** VS message logger. By default works only on dev mode */
class Logger {
  /**
   * Logger verbosity level
   */
  verbosityLevel;

  /**
   * Is production environment
   */
  isProduction;

  /**
   * Force to show error on production
   */
  showErrorOnProduction;

  /**
   * Logger constructor
   *
   * @param verbosityLevel display-everything, only-errors, no-console
   * @param showErrorOnProduction
   */
  constructor(
    verbosityLevel = 'display-everything',
    showErrorOnProduction = false
  ) {
    this.verbosityLevel = verbosityLevel;
    this.showErrorOnProduction = showErrorOnProduction;
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  /**
   * Check if method can print into console
   *
   * @para method
   */
  canPrint(method) {
    let allowedMethods = [];

    if (
      this.verbosityLevel === 'display-everything' &&
      this.isProduction === false
    ) {
      allowedMethods = ['info', 'warn', 'error', 'debug'];
    } else if (
      this.verbosityLevel === 'only-errors' &&
      (this.isProduction === false || this.showErrorOnProduction === true)
    ) {
      allowedMethods = ['error'];
    } else if (
      this.verbosityLevel === 'no-console' ||
      (this.isProduction === true && this.showErrorOnProduction === false)
    ) {
      allowedMethods = [];
    }

    if (allowedMethods.indexOf(method) === -1) {
      return false;
    }

    return true;
  }

  /**
   * Inform about debug events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.debug(...args)()`
   * @param message
   * @param context meaningful data related to this message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   */
  debug(message, context = null, tag = '') {
    if (!isServer && this.canPrint('debug')) {
      if (tag) {
        return console.debug.bind(
          window.console,
          '%c' + appName + '%c %c' + tag + '%c ' + message,
          bgColorStyleBlack('white'),
          'color: inherit',
          bgColorStyleBlack('gray'),
          'font-weight: normal',
          context
        );
      } else {
        return console.debug.bind(
          window.console,
          '%c' + appName + '%c ' + message,
          bgColorStyleBlack('white'),
          'font-weight: normal',
          context
        );
      }
    } else {
      return function () {};
    }
  }

  /**
   * Inform about log events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.log(...args)()`
   * @param message
   * @param context meaningful data related to this message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   */
  log(message, context = null, tag = '') {
    return this.info(message, tag, context);
  }

  /**
   * Inform about succesful events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.info(...args)()`
   * @param message
   * @param context meaningful data related to this message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   */
  info(message, context = null, tag = '') {
    if (!isServer && this.canPrint('info')) {
      if (tag) {
        return console.log.bind(
          window.console,
          '%c' + appName + '%c %c' + tag + '%c ' + message,
          bgColorStyle('green'),
          'color: inherit',
          bgColorStyle('gray'),
          'font-weight: bold',
          context
        );
      } else {
        return console.log.bind(
          window.console,
          '%c' + appName + '%c ' + message,
          bgColorStyle('green'),
          'font-weight: bold',
          context
        );
      }
    } else {
      return function () {};
    }
  }

  /**
   * Inform about potential problems that may be a cause of app break
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.warn(...args)()`
   * @param message
   * @param context meaningful data related to this message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   */
  warn(message, context = null, tag = '') {
    if (!isServer && this.canPrint('warn')) {
      if (tag) {
        return console.warn.bind(
          window.console,
          '%c' + appName + '%c %c' + tag + '%c ' + message,
          bgColorStyle('orange'),
          'color: inherit',
          bgColorStyle('gray'),
          'font-weight: bold',
          context
        );
      } else {
        return console.warn.bind(
          window.console,
          '%c' + appName + '%c ' + message,
          bgColorStyle('orange'),
          'font-weight: bold',
          context
        );
      }
    } else {
      return function () {};
    }
  }

  /**
   * Inform about errors that will break the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.error(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  error(message, context = null, tag = '') {
    if (!isServer && this.canPrint('error')) {
      if (tag) {
        return console.error.bind(
          window.console,
          '%c' + appName + '%c %c' + tag + '%c ' + message,
          bgColorStyle('red'),
          'color: inherit',
          bgColorStyle('gray'),
          'font-weight: bold',
          context
        );
      } else {
        return console.error.bind(
          window.console,
          '%c' + appName + '%c ' + message,
          bgColorStyle('red'),
          'font-weight: bold',
          context
        );
      }
    } else {
      return function () {};
    }
  }
}

const logger = new Logger(process.env.VERBOSITY_LEVEL);
export { logger as Logger };
