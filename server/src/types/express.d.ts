/**
 * Express Type Extensions
 * Express 类型扩展
 */

import { TokenPayload, UserRole } from './auth.types.js';

declare global {
  namespace Express {
    interface Request {
      /** Authenticated user info / 已认证用户信息 */
      user?: TokenPayload;
      /** Session ID / 会话 ID */
      sessionId?: string;
      /** IP address / IP 地址 */
      ip?: string;
    }

    interface Response {
      /** Success response helper / 成功响应辅助函数 */
      success: <T = any>(data: T, message?: string, statusCode?: number) => void;
      /** Error response helper / 错误响应辅助函数 */
      error: (message: string, code?: string, statusCode?: number, details?: any) => void;
    }
  }
}

export {};
