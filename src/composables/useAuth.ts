import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const store = useAuthStore()
  const { user, loading, error } = storeToRefs(store)
  const { login, logout, initUser } = store

  return {
    user,
    loading,
    error,
    login,
    logout,
    initUser
  }
}
