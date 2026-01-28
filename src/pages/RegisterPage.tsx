/**
 * Registration Page
 * 注册页面
 */

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

// Password strength checker
function checkPasswordStrength(password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { strength } = checkPasswordStrength(password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 8) {
      setError('密码长度至少需要 8 个字符');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, password, email || undefined);
      // Redirect to home page after successful registration
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">PolarCraft</h1>
          <p className="text-slate-400">{t('auth.registerSubtitle', '创建您的账号')}</p>
        </div>

        {/* Register Form */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                {t('auth.username', '用户名')} *
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder={t('auth.usernamePlaceholder', '请输入用户名')}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                {t('auth.email', '邮箱')} ({t('auth.optional', '可选')})
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder={t('auth.emailPlaceholder', '请输入邮箱')}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                {t('auth.password', '密码')} *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder={t('auth.passwordPlaceholder', '请输入密码')}
              />

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    <div className={`h-1 flex-1 rounded ${strength.score >= 2 ? getStrengthColor() : 'bg-slate-600'}`} />
                    <div className={`h-1 flex-1 rounded ${strength.score >= 3 ? getStrengthColor() : 'bg-slate-600'}`} />
                    <div className={`h-1 flex-1 rounded ${strength.score >= 5 ? getStrengthColor() : 'bg-slate-600'}`} />
                  </div>
                  <p className="text-xs text-slate-400">
                    密码强度: <span className={`font-medium ${
                      strength === 'weak' ? 'text-red-400' :
                      strength === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {strength === 'weak' ? '弱' : strength === 'medium' ? '中' : '强'}
                    </span>
                  </p>
                </div>
              )}

              {/* Password Requirements */}
              <div className="mt-2 text-xs text-slate-400 space-y-1">
                <p>密码需包含:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-1">
                  <li className={password.length >= 8 ? 'text-green-400' : ''}>至少 8 个字符</li>
                  <li className={/[a-z]/.test(password) ? 'text-green-400' : ''}>小写字母</li>
                  <li className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>大写字母</li>
                  <li className={/\d/.test(password) ? 'text-green-400' : ''}>数字</li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-400' : ''}>特殊字符</li>
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                {t('auth.confirmPassword', '确认密码')} *
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder={t('auth.confirmPasswordPlaceholder', '请再次输入密码')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('auth.registering', '注册中...') : t('auth.register', '注册')}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-slate-400 text-sm">{t('auth.hasAccount', '已有账号？')}</span>
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium ml-1">
              {t('auth.login', '登录')}
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 hover:text-slate-300 text-sm">
            ← {t('auth.backToHome', '返回首页')}
          </Link>
        </div>
      </div>
    </div>
  );
}
