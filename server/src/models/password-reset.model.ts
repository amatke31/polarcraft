/**
 * Password Reset Token Model
 * 密码重置令牌模型
 */

import { query, queryOne, query as executeQuery } from '../database/connection.js';
import { generateToken, generateId } from '../utils/crypto.util.js';
import { PasswordResetToken } from '../types/auth.types.js';
import { logger } from '../utils/logger.js';

/**
 * Password Reset Token Model Class
 * 密码重置令牌模型类
 */
export class PasswordResetModel {
  /**
   * Default token expiry: 15 minutes
 * 默认令牌过期时间：15 分钟
   */
  static readonly DEFAULT_EXPIRY_MINUTES = 15;

  /**
   * Create a new password reset token
 * 创建新的密码重置令牌
   */
  static async create(userId: string): Promise<PasswordResetToken> {
    const id = generateId();
    const token = generateToken(32);
    const expiresAt = new Date(Date.now() + this.DEFAULT_EXPIRY_MINUTES * 60 * 1000);

    const sql = `
      INSERT INTO password_reset_tokens (id, user_id, token, expires_at)
      VALUES (?, ?, ?, ?)
    `;

    await executeQuery(sql, [id, userId, token, expiresAt]);

    logger.info(`Password reset token created for user: ${userId}`);
    return {
      id,
      user_id: userId,
      token,
      expires_at: expiresAt,
      used_at: null,
      created_at: new Date(),
    };
  }

  /**
   * Find password reset token by token value
 * 根据令牌值查找密码重置令牌
   */
  static async findByToken(token: string): Promise<PasswordResetToken | null> {
    const sql = `
      SELECT *
      FROM password_reset_tokens
      WHERE token = ? AND used_at IS NULL
    `;

    return await queryOne<PasswordResetToken>(sql, [token]);
  }

  /**
   * Find valid (not expired and not used) password reset token
 * 查找有效（未过期且未使用）的密码重置令牌
   */
  static async findValidToken(token: string): Promise<PasswordResetToken | null> {
    const sql = `
      SELECT *
      FROM password_reset_tokens
      WHERE token = ? AND used_at IS NULL AND expires_at > NOW()
    `;

    return await queryOne<PasswordResetToken>(sql, [token]);
  }

  /**
   * Mark token as used
 * 将令牌标记为已使用
   */
  static async markAsUsed(token: string): Promise<boolean> {
    const sql = `
      UPDATE password_reset_tokens
      SET used_at = NOW()
      WHERE token = ?
    `;

    await executeQuery(sql, [token]);
    logger.info(`Password reset token marked as used: ${token}`);
    return true;
  }

  /**
   * Invalidate all unused tokens for a user
 * 使用户的所有未使用令牌失效
   */
  static async invalidateAllForUser(userId: string): Promise<number> {
    const sql = `
      UPDATE password_reset_tokens
      SET used_at = NOW()
      WHERE user_id = ? AND used_at IS NULL
    `;

    await executeQuery(sql, [userId]);
    const result = await query<any>(
      'SELECT ROW_COUNT() as count',
      []
    );
    const count = result[0]?.count || 0;

    logger.info(`Invalidated ${count} password reset tokens for user: ${userId}`);
    return count;
  }

  /**
   * Clean up expired and used tokens
 * 清理过期和已使用的令牌
   */
  static async cleanup(): Promise<number> {
    const sql = `
      DELETE FROM password_reset_tokens
      WHERE used_at IS NOT NULL OR expires_at < NOW()
    `;

    await executeQuery(sql, []);
    const result = await query<any>(
      'SELECT ROW_COUNT() as count',
      []
    );
    const count = result[0]?.count || 0;

    logger.info(`Cleaned up ${count} password reset tokens`);
    return count;
  }

  /**
   * Check if a token is valid
 * 检查令牌是否有效
   */
  static async isValid(token: string): Promise<boolean> {
    const resetToken = await this.findValidToken(token);
    return resetToken !== null;
  }
}
