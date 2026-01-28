/**
 * Logger Utility
 * 日志工具
 *
 * Simple logger inspired by the frontend logger pattern
 * 参考 frontend logger 模式的简单日志记录器
 */

import { config } from '../config/index.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Get log level from config
const configLevel = config.logging.level as LogLevel;

const loggerConfig: LoggerConfig = {
  enabled: config.logging.enabled,
  minLevel: configLevel,
};

function shouldLog(level: LogLevel): boolean {
  return (
    loggerConfig.enabled &&
    LOG_LEVELS[level] >= LOG_LEVELS[loggerConfig.minLevel]
  );
}

function formatMessage(level: LogLevel, message: string, ...args: unknown[]): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  return `${prefix} ${message}`;
}

export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (shouldLog('debug')) {
      console.debug(formatMessage('debug', message), ...args);
    }
  },

  info: (message: string, ...args: unknown[]) => {
    if (shouldLog('info')) {
      console.info(formatMessage('info', message), ...args);
    }
  },

  warn: (message: string, ...args: unknown[]) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message), ...args);
    }
  },

  error: (message: string, ...args: unknown[]) => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message), ...args);
    }
  },

  /**
   * Configure logger settings
   * 配置日志记录器设置
   */
  configure: (newConfig: Partial<LoggerConfig>) => {
    Object.assign(loggerConfig, newConfig);
  },

  /**
   * Enable/disable logging
   * 启用/禁用日志记录
   */
  setEnabled: (enabled: boolean) => {
    loggerConfig.enabled = enabled;
  },

  /**
   * Set minimum log level
   * 设置最低日志级别
   */
  setMinLevel: (level: LogLevel) => {
    loggerConfig.minLevel = level;
  },
};

export default logger;
