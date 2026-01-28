/**
 * Refresh Token Model
 * 刷新令牌模型
 */

import { query, queryOne, query as executeQuery } from '../database/connection.js';
import { hashToken, generateId } from '../utils/crypto.util.js';
import { RefreshToken, SessionInfo } from '../types/auth.types.js';
import { logger } from '../utils/logger.js';

/**
 * Refresh Token Model Class
 * 刷新令牌模型类
 */
export class RefreshTokenModel {
  /**
   * Create a new refresh token
 * 创建新的刷新令牌
   */
  static async create(params: {
    userId: string;
    token: string;
    ipAddress?: string;
    deviceInfo?: string;
    expiresAt: Date;
  }): Promise<RefreshToken> {
    const id = generateId();
    const tokenHash = hashToken(params.token);

    const sql = `
      INSERT INTO refresh_tokens (id, user_id, token, ip_address, device_info, expires_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const sqlParams = [
      id,
      params.userId,
      tokenHash,
      params.ipAddress || null,
      params.deviceInfo || null,
      params.expiresAt,
    ];

    await executeQuery(sql, sqlParams);

    logger.debug(`Refresh token created for user: ${params.userId}`);
    return {
      id,
      user_id: params.userId,
      token: tokenHash,
      ip_address: params.ipAddress || null,
      device_info: params.deviceInfo || null,
      expires_at: params.expiresAt,
      created_at: new Date(),
      revoked_at: null,
    };
  }

  /**
   * Find refresh token by token hash
 * 根据令牌哈希查找刷新令牌
   */
  static async findByToken(token: string): Promise<RefreshToken | null> {
    const tokenHash = hashToken(token);

    const sql = `
      SELECT *
      FROM refresh_tokens
      WHERE token = ? AND revoked_at IS NULL
    `;

    return await queryOne<RefreshToken>(sql, [tokenHash]);
  }

  /**
   * Find all active refresh tokens for a user
 * 查找用户的所有活跃刷新令牌
   */
  static async findByUserId(userId: string): Promise<RefreshToken[]> {
    const sql = `
      SELECT *
      FROM refresh_tokens
      WHERE user_id = ? AND revoked_at IS NULL AND expires_at > NOW()
      ORDER BY created_at DESC
    `;

    return await query<RefreshToken>(sql, [userId]);
  }

  /**
   * Revoke a refresh token
 * 撤销刷新令牌
   */
  static async revoke(id: string): Promise<boolean> {
    const sql = `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(sql, [id]);
    logger.debug(`Refresh token revoked: ${id}`);
    return true;
  }

  /**
   * Revoke all refresh tokens for a user
 * 撤销用户的所有刷新令牌
   */
  static async revokeAllForUser(userId: string): Promise<number> {
    const sql = `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE user_id = ? AND revoked_at IS NULL
    `;

    await executeQuery(sql, [userId]);
    const result = await query<any>(
      'SELECT ROW_COUNT() as count',
      []
    );
    const count = result[0]?.count || 0;

    logger.info(`Revoked ${count} refresh tokens for user: ${userId}`);
    return count;
  }

  /**
   * Revoke all refresh tokens except the current one
 * 撤销除当前令牌外的所有刷新令牌
   */
  static async revokeAllExcept(currentTokenId: string, userId: string): Promise<number> {
    const sql = `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE user_id = ? AND id != ? AND revoked_at IS NULL
    `;

    await executeQuery(sql, [userId, currentTokenId]);
    const result = await query<any>(
      'SELECT ROW_COUNT() as count',
      []
    );
    const count = result[0]?.count || 0;

    logger.info(`Revoked ${count} other refresh tokens for user: ${userId}`);
    return count;
  }

  /**
   * Get session info for a user
 * 获取用户的会话信息
   */
  static async getSessions(userId: string, currentTokenId?: string): Promise<SessionInfo[]> {
    const tokens = await this.findByUserId(userId);

    return tokens.map((token) => ({
      id: token.id,
      device_info: token.device_info,
      ip_address: token.ip_address,
      created_at: token.created_at,
      expires_at: token.expires_at,
      is_current: currentTokenId ? token.id === currentTokenId : false,
    }));
  }

  /**
   * Delete a refresh token (for session management)
 * 删除刷新令牌（用于会话管理）
   */
  static async delete(id: string, userId: string): Promise<boolean> {
    const sql = `
      DELETE FROM refresh_tokens
      WHERE id = ? AND user_id = ?
    `;

    await executeQuery(sql, [id, userId]);
    logger.debug(`Refresh token deleted: ${id}`);
    return true;
  }

  /**
   * Clean up expired tokens (should be run periodically)
 * 清理过期令牌（应定期运行）
   */
  static async cleanupExpired(): Promise<number> {
    const sql = `
      DELETE FROM refresh_tokens
      WHERE expires_at < NOW() OR revoked_at IS NOT NULL
    `;

    await executeQuery(sql, []);
    const result = await query<any>(
      'SELECT ROW_COUNT() as count',
      []
    );
    const count = result[0]?.count || 0;

    logger.info(`Cleaned up ${count} expired refresh tokens`);
    return count;
  }
}
