import { useTranslation } from 'react-i18next'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/classNames'
import { Sun, Moon, User, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface AuthThemeSwitcherProps {
  className?: string
  compact?: boolean
}

export function AuthThemeSwitcher({ className, compact = false }: AuthThemeSwitcherProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    navigate('/')
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {/* Auth buttons or user menu (compact) */}
        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
              title={user?.username || 'User'}
            >
              <User className="w-4 h-4" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-700">
                  <p className="text-sm font-medium text-white">{user?.username}</p>
                  <p className="text-xs text-slate-400">{user?.email || 'user@polarcraft'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t('auth.logout', '登出')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] text-sm"
            >
              {t('auth.login', '登录')}
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-lg bg-[var(--accent-cyan)] text-black text-sm font-medium hover:bg-cyan-400 transition-colors"
            >
              {t('auth.register', '注册')}
            </Link>
          </>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
          title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Auth buttons or user menu (full) */}
      {isAuthenticated ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)]',
              'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]',
              'transition-all'
            )}
          >
            <User className="w-4 h-4" />
            <span className="text-sm">{user?.username || 'User'}</span>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-slate-400">{user?.email || 'user@polarcraft'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t('auth.logout', '登出')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className={cn(
              'px-4 py-1.5 rounded-lg border border-[var(--border-color)]',
              'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]',
              'transition-all text-sm font-medium'
            )}
          >
            {t('auth.login', '登录')}
          </Link>
          <Link
            to="/register"
            className={cn(
              'px-4 py-1.5 rounded-lg bg-[var(--accent-cyan)] text-black',
              'hover:bg-cyan-400 transition-colors text-sm font-medium'
            )}
          >
            {t('auth.register', '注册')}
          </Link>
        </div>
      )}

      {/* Theme Switcher */}
      <button
        onClick={toggleTheme}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)]',
          'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]',
          'transition-all'
        )}
        title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-4 h-4" />
            <span className="text-xs">{t('common.lightMode')}</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4" />
            <span className="text-xs">{t('common.darkMode')}</span>
          </>
        )}
      </button>
    </div>
  )
}

/**
 * Theme Switcher Only
 * 仅主题切换器
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg border border-[var(--border-color)]',
        'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]',
        'transition-all',
        className
      )}
      title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
