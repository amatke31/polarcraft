/**
 * Password Utility
 * 密码工具
 *
 * Handles password hashing, validation, and strength checking
 * 处理密码哈希、验证和强度检查
 */

import bcrypt from 'bcrypt';
import { config } from '../config/index.js';
import {
  PasswordValidationResult,
  PasswordPolicy,
} from '../types/auth.types.js';

/**
 * Hash a password using bcrypt
 * 使用 bcrypt 对密码进行哈希
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, config.password.bcryptRounds);
}

/**
 * Compare a plain text password with a hashed password
 * 比较明文密码和哈希密码
 */
export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}

/**
 * Validate password strength
 * 验证密码强度
 */
export function validatePassword(
  password: string,
  policy: PasswordPolicy = config.password
): PasswordValidationResult {
  const errors: string[] = [];

  // Check minimum length / 检查最小长度
  if (password.length < policy.minLength) {
    errors.push(`密码至少需要 ${policy.minLength} 个字符`);
  }

  // Check uppercase / 检查大写字母
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('密码需要包含至少 1 个大写字母');
  }

  // Check lowercase / 检查小写字母
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('密码需要包含至少 1 个小写字母');
  }

  // Check number / 检查数字
  if (policy.requireNumber && !/\d/.test(password)) {
    errors.push('密码需要包含至少 1 个数字');
  }

  // Check special character / 检查特殊字符
  if (policy.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('密码需要包含至少 1 个特殊字符 (!@#$%^&*(),.?":{}|<>)');
  }

  // Calculate strength / 计算强度
  const strength = calculateStrength(password, policy);

  return {
    valid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Calculate password strength
 * 计算密码强度
 */
function calculateStrength(
  password: string,
  policy: PasswordPolicy
): 'weak' | 'medium' | 'strong' {
  let score = 0;

  // Length score / 长度评分
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety / 字符多样性
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 3) return 'weak';
  if (score <= 5) return 'medium';
  return 'strong';
}

/**
 * Generate a random password
 * 生成随机密码（可用于密码重置）
 */
export function generateRandomPassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()';
  const all = uppercase + lowercase + numbers + special;

  let password = '';

  // Ensure at least one of each required character type
  // 确保至少包含每种必需的字符类型
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest with random characters
  // 其余部分用随机字符填充
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle the password / 打乱密码
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
