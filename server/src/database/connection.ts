/**
 * MySQL Database Connection Pool
 * MySQL 数据库连接池
 */

import mysql from 'mysql2/promise';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

// Connection pool / 连接池
let pool: mysql.Pool | null = null;

/**
 * Create database connection pool
 * 创建数据库连接池
 */
export function createPool(): mysql.Pool {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    connectionLimit: config.database.connectionLimit,
    charset: 'utf8mb4',
    timezone: '+00:00',
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  logger.info('Database connection pool created');

  return pool;
}

/**
 * Get database connection pool
 * 获取数据库连接池
 */
export function getPool(): mysql.Pool {
  if (!pool) {
    return createPool();
  }
  return pool;
}

/**
 * Execute a SQL query
 * 执行 SQL 查询
 */
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  } catch (error) {
    logger.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a single row from the database
 * 从数据库获取单行数据
 */
export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Close database connection pool
 * 关闭数据库连接池
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    logger.info('Database connection pool closed');
  }
}

/**
 * Test database connection
 * 测试数据库连接
 */
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    logger.info('Database connection test successful');
    return true;
  } catch (error) {
    logger.error('Database connection test failed:', error);
    return false;
  }
}
