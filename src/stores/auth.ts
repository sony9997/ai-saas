import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import type { User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    // 初始化用户状态
    async initUser() {
      const { data: { session } } = await supabase.auth.getSession()
      this.user = session?.user ?? null
    },

    // 监听认证状态变化
    async onAuthStateChange(_event: any, session: Session | null) {
      this.user = session?.user ?? null
    },

    // 注册
    async register(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password
        })
        if (err) throw err
        this.user = data.user
      } catch (err: any) {
        this.error = err.message
        this.user = null
      } finally {
        this.loading = false
      }
    },

    // 登录
    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (err) throw err
        this.user = data.user
      } catch (err: any) {
        this.error = err.message
        this.user = null
      } finally {
        this.loading = false
      }
    },

    // 登出
    async logout() {
      try {
        this.loading = true
        this.error = null
        await supabase.auth.signOut()
        this.user = null
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // 忘记密码
    async forgotPassword(email: string) {
      this.loading = true
      this.error = null
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`
        })
        if (error) throw error
        return { error: null }
      } catch (error: any) {
        this.error = error.message
        return { error }
      } finally {
        this.loading = false
      }
    },

    // 重置密码
    async resetPassword(password: string) {
      this.loading = true
      this.error = null
      try {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
        return { error: null }
      } catch (error: any) {
        this.error = error.message
        return { error }
      } finally {
        this.loading = false
      }
    },
  }
})