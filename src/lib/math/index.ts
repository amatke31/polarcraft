/**
 * Core Math Library for the Unified Physics Engine
 *
 * 核心的数学库，用于统一物理引擎
 * 
 * 提供高精度的数学原语用于光学计算：
 * - 复数及其高级运算（指数、平方根、幂运算）
 * - 2×2复矩阵用于琼斯计算
 * - 3D向量用于光线追踪和基矢计算
 * 
 * Provides high-precision mathematical primitives for optical calculations:
 * - Complex numbers with advanced operations (exp, sqrt, pow)
 * - 2×2 complex matrices for Jones calculus
 * - 3D vectors for ray tracing and basis computations
 */

export { Complex, complexMul, complexAdd, complexMagSq } from './Complex';
export {
  Matrix2x2,
  jonesLinearPolarizer,
  jonesWavePlate,
  jonesRotator
} from './Matrix2x2';

export {
  Vector3,
  buildOrthonormalBasis,
  rotateAroundAxis,
  signedAngle
} from './Vector3';
