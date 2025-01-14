import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 初始化用户状态
  const initUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user ?? null
  }

  // 监听认证状态变化
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })

  // 登录
  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (err) throw err
      user.value = data.user
    } catch (err: any) {
      error.value = err.message
      user.value = null
    } finally {
      loading.value = false
    }
  }

  // 登出
  const logout = async () => {
    try {
      loading.value = true
      error.value = null
      await supabase.auth.signOut()
      user.value = null
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    initUser,
    login,
    logout
  }
}) 