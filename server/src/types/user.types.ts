/**
 * User API Type Definitions
 * 用户 API 类型定义
 */

import { UserRole } from './auth.types.js';

// =====================================================
// User Update Types / 用户更新类型
// =====================================================

/** Update profile input / 更新个人信息输入 */
export interface UpdateProfileInput {
  username?: string;
  email?: string;
  avatar_url?: string;
}

/** User profile response / 用户信息响应 */
export interface UserProfileResponse {
  id: string;
  username: string;
  role: UserRole;
  avatar_url: string | null;
  email: string | null;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

// =====================================================
// Session Management Types / 会话管理类型
// =====================================================

/** Session list response / 会话列表响应 */
export interface SessionsResponse {
  sessions: Array<{
    id: string;
    device_info: string | null;
    ip_address: string | null;
    created_at: string;
    expires_at: string;
    is_current: boolean;
  }>;
  total: number;
}
