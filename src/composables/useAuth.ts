import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import { handleAuthError } from '@/utils/auth'
import type { User } from '@/types'
import { useToast } from 'vue-toastification'

export function useAuth() {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (err) throw err

      user.value = data.user as User
      toast.success('登录成功！')
    } catch (err: any) {
      error.value = handleAuthError(err)
      toast.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            subscription_tier: 'free'
          }
        }
      })

      console.log('Registration response:', data, error)

      if (err) {
        console.error('Supabase registration error:', err)
        throw err
      }

      // Ensure user data is present
      if (!data.user) {
        console.error('User data not found in response:', data)
        throw new Error('User data not found in response')
      }

      user.value = data.user as User
      toast.success('注册成功！')
      return data
    } catch (err: any) {
      error.value = handleAuthError(err)
      toast.error(error.value)
      console.error('Registration error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      error.value = null
      
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err

      user.value = null
      toast.success('已成功退出登录！')
    } catch (err: any) {
      error.value = handleAuthError(err)
      toast.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    try {
      const { data: { session }, error: err } = await supabase.auth.getSession()
      if (err) throw err
      
      if (session) {
        user.value = session.user as User
      }
    } catch (err: any) {
      error.value = handleAuthError(err)
    }
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth
  }
}
