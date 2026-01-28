/**
 * Authentication Service
 * 认证服务
 */

import { api } from './api';

// =====================================================
// Types / 类型定义
// =====================================================

export interface UserProfile {
  id: string;
  username: string;
  role: 'user' | 'admin';
  avatar_url: string | null;
  email: string | null;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: UserProfile;
  tokens: TokenPair;
}

export interface LoginInput {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterInput {
  username: string;
  password: string;
  email?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// =====================================================
// Auth API Methods / 认证 API 方法
// =====================================================

export const authApi = {
  /**
   * Register a new user
   * 注册新用户
   */
  register: async (input: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/register', input);
    if (response.success && response.data) {
      // Store tokens
      localStorage.setItem('access_token', response.data.tokens.accessToken);
      if (input.rememberMe) {
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
      }
      return response.data;
    }
    throw new Error(response.error?.message || 'Registration failed');
  },

  /**
   * Login user
   * 用户登录
   */
  login: async (input: LoginInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', input);
    if (response.success && response.data) {
      // Store tokens
      localStorage.setItem('access_token', response.data.tokens.accessToken);
      if (input.rememberMe) {
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
      }
      return response.data;
    }
    throw new Error(response.error?.message || 'Login failed');
  },

  /**
   * Logout user
   * 用户登出
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout', {});
    } finally {
      api.removeToken();
    }
  },

  /**
   * Refresh access token
   * 刷新访问令牌
   */
  refreshToken: async (): Promise<TokenPair> => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<{ accessToken: string; refreshToken: string; expiresIn: number }>(
      '/api/auth/refresh',
      { refreshToken }
    );

    if (response.success && response.data) {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      return response.data;
    }
    throw new Error(response.error?.message || 'Token refresh failed');
  },

  /**
   * Get current user
   * 获取当前用户
   */
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/api/auth/me');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get user');
  },

  /**
   * Update profile
   * 更新资料
   */
  updateProfile: async (input: Partial<RegisterInput>): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/api/users/profile', input);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to update profile');
  },

  /**
   * Change password
   * 修改密码
   */
  changePassword: async (input: ChangePasswordInput): Promise<void> => {
    const response = await api.post('/api/users/change-password', input);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to change password');
    }
  },

  /**
   * Forgot password
   * 忘记密码
   */
  forgotPassword: async (username: string): Promise<void> => {
    const response = await api.post('/api/auth/forgot-password', { username });
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to request password reset');
    }
  },

  /**
   * Reset password
   * 重置密码
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    const response = await api.post('/api/auth/reset-password', { token, newPassword });
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to reset password');
    }
  },

  /**
   * Get CAPTCHA
   * 获取验证码
   */
  getCaptcha: async (): Promise<{ id: string; dataUrl: string }> => {
    const response = await api.get<{ id: string; dataUrl: string }>('/api/auth/captcha');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error('Failed to get captcha');
  },
};
