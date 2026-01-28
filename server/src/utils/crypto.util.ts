/**
 * Cryptography Utility
 * 加密工具
 *
 * Handles encryption, hashing, and random generation
 * 处理加密、哈希和随机生成
 */

import crypto from 'crypto';
import { config } from '../config/index.js';

/**
 * Generate a random UUID v4
 * 生成随机 UUID v4
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Generate a random token
 * 生成随机令牌
 */
export function generateToken(bytes: number = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}

/**
 * Hash a string using SHA-256
 * 使用 SHA-256 哈希字符串
 */
export function sha256(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Create a hash for storing tokens securely
 * 创建安全存储令牌的哈希
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate a random numeric code
 * 生成随机数字代码
 */
export function generateNumericCode(length: number = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}

/**
 * Create a time-based hash (for cache busting, etc)
 * 创建基于时间的哈希（用于缓存失效等）
 */
export function createTimestampHash(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return sha256(`${timestamp}-${random}`);
}

/**
 * Verify HMAC signature
 * 验证 HMAC 签名
 */
export function verifyHMAC(
  data: string,
  signature: string,
  secret: string = config.security.csrfSecret
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);
  const expected = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

/**
 * Create HMAC signature
 * 创建 HMAC 签名
 */
export function createHMAC(
  data: string,
  secret: string = config.security.csrfSecret
): string {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);
  return hmac.digest('hex');
}

/**
 * Encrypt data using AES-256-GCM
 * 使用 AES-256-GCM 加密数据
 */
export function encrypt(data: string, key?: string): {
  encrypted: string;
  iv: string;
  authTag: string;
} {
  const encryptionKey = key || config.security.csrfSecret;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(encryptionKey.slice(0, 32)),
    iv
  );

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
  };
}

/**
 * Decrypt data using AES-256-GCM
 * 使用 AES-256-GCM 解密数据
 */
export function decrypt(
  encrypted: string,
  iv: string,
  authTag: string,
  key?: string
): string {
  const encryptionKey = key || config.security.csrfSecret;
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(encryptionKey.slice(0, 32)),
    Buffer.from(iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
