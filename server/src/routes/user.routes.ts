/**
 * User Routes
 * 用户路由
 */

import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  validateUpdateProfile,
  validateChangePassword,
  sessionIdParamValidation,
} from '../middleware/validation.middleware.js';

const router = Router();

// All user routes require authentication
// 所有用户路由都需要认证
router.use(authenticate);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', UserController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', validateUpdateProfile, UserController.updateProfile);

/**
 * @route   POST /api/users/change-password
 * @desc    Change password
 * @access  Private
 */
router.post(
  '/change-password',
  validateChangePassword,
  UserController.changePassword
);

/**
 * @route   GET /api/users/sessions
 * @desc    Get user sessions
 * @access  Private
 */
router.get('/sessions', UserController.getSessions);

/**
 * @route   DELETE /api/users/sessions/:sessionId
 * @desc    Logout from a specific session
 * @access  Private
 */
router.delete(
  '/sessions/:sessionId',
  sessionIdParamValidation,
  UserController.logoutFromSession
);

/**
 * @route   POST /api/users/logout-all
 * @desc    Logout from all sessions
 * @access  Private
 */
router.post('/logout-all', UserController.logoutFromAllSessions);

export default router;
