import type { AuthError } from '@supabase/supabase-js'

export const handleAuthError = (error: AuthError): string => {
  switch (error.message) {
    case 'Invalid login credentials':
      return '邮箱或密码错误'
    case 'Email not confirmed':
      return '请先验证您的邮箱'
    case 'User already registered':
      return '该邮箱已被注册'
    default:
      return error.message
  }
}
