import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import type { User } from '@/types'

export function useProfile() {
  const profile = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProfile = async (userId: string) => {
    try {
      loading.value = true
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (err) throw err
      profile.value = data as User
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (userId: string, updates: Partial<User>) => {
    try {
      loading.value = true
      const { data, error: err } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (err) throw err
      profile.value = data as User
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  }
}
