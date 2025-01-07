import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

export const useNavigation = () => {
  const { user } = useAuth()
  
  const navigation = computed(() => {
    const publicRoutes = [
      { name: '首页', href: '/' },
      { name: '功能', href: '/features' },
      { name: '文档', href: '/docs' },
      { name: '定价', href: '/pricing' },
      { name: '新闻', href: '/news' },
      { name: '关于', href: '/about' }
    ]

    const privateRoutes = [
      { name: '仪表盘', href: '/dashboard' }
    ]

    return user.value ? [...publicRoutes, ...privateRoutes] : publicRoutes
  })

  return {
    navigation
  }
}
