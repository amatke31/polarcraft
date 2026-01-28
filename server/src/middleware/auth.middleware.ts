/**
 * Authentication Middleware
 * 认证中间件
 *
 * Verifies JWT tokens and attaches user info to request
 * 验证 JWT 令牌并将用户信息附加到请求
 */

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, extractTokenFromHeader } from '../utils/jwt.util.js';
import { TokenPayload } from '../types/auth.types.js';
import { logger } from '../utils/logger.js';
import { sendError } from '../utils/response.util.js';

/**
 * Authentication middleware
 * 认证中间件
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    // Extract token from Authorization header
    // 从 Authorization 头部提取令牌
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      sendError(res, '未登录，请先登录', 'UNAUTHORIZED', 401);
      return;
    }

    // Verify token
    // 验证令牌
    let payload: TokenPayload;
    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      sendError(res, '登录已过期，请重新登录', 'TOKEN_EXPIRED', 401);
      return;
    }

    // Check if it's an access token
    // 检查是否为访问令牌
    if (payload.type !== 'access') {
      sendError(res, '无效的令牌类型', 'INVALID_TOKEN', 401);
      return;
    }

    // Attach user info to request
    // 将用户信息附加到请求
    req.user = payload;

    // Also attach the raw token for logout purposes
    // 同时附加原始令牌用于登出
    (req as any).rawToken = token;

    next();
  } catch (error) {
    logger.error('Authentication middleware error:', error);
    sendError(res, '认证失败', 'INTERNAL_ERROR', 500);
  }
}

/**
 * Optional authentication - doesn't fail if no token provided
 * 可选认证 - 如果未提供令牌则不会失败
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      try {
        const payload = verifyAccessToken(token);
        if (payload.type === 'access') {
          req.user = payload;
          (req as any).rawToken = token;
        }
      } catch (error) {
        // Ignore token errors for optional auth
        // 忽略可选认证的令牌错误
        logger.debug('Optional auth token verification failed:', error);
      }
    }

    next();
  } catch (error) {
    logger.error('Optional authentication middleware error:', error);
    next();
  }
}
