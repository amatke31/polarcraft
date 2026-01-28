/**
 * Routes Index
 * 路由索引
 *
 * Aggregates all routes and sets up middleware
 * 聚合所有路由并设置中间件
 */

import { Router, Request, Response, NextFunction } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import researchRoutes from './research.routes.js';
import { setupResponseHelpers } from '../utils/response.util.js';
import { csrfToken } from '../middleware/csrf.middleware.js';

const router = Router();

// Setup response helpers for all routes
// 为所有路由设置响应辅助函数
router.use((req: Request, res: Response, next: NextFunction) => {
  setupResponseHelpers(res);
  next();
});

// CSRF token for all routes (generate new token for each request)
// 为所有路由设置 CSRF token（为每个请求生成新 token）
router.use(csrfToken);

// Health check endpoint
// 健康检查端点
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

// API routes
// API 路由
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/research', researchRoutes);

export default router;
