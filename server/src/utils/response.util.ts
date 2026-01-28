/**
 * Response Utility
 * 响应工具
 *
 * Standardized API response helpers
 * 标准化 API 响应辅助函数
 */

import { Response } from 'express';

/**
 * Success response format
 * 成功响应格式
 */
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Error response format
 * 错误响应格式
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Send a success response
 * 发送成功响应
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): void {
  const response: SuccessResponse<T> = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  res.status(statusCode).json(response);
}

/**
 * Send an error response
 * 发送错误响应
 */
export function sendError(
  res: Response,
  message: string,
  code: string = 'INTERNAL_ERROR',
  statusCode: number = 400,
  details?: unknown
): void {
  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (details !== undefined) {
    response.error.details = details;
  }

  res.status(statusCode).json(response);
}

/**
 * Setup response helpers on Express response object
 * 在 Express 响应对象上设置响应辅助函数
 */
export function setupResponseHelpers(res: Response): void {
  res.success = <T>(data: T, message?: string, statusCode: number = 200) => {
    sendSuccess(res, data, message, statusCode);
  };

  res.error = (message: string, code?: string, statusCode?: number, details?: unknown) => {
    sendError(res, message, code, statusCode, details);
  };
}
