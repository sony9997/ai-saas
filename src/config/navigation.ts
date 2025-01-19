import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

export const useNavigation = () => {
  const { user } = useAuth()
  
  const navigation = computed(() => {
    const publicRoutes = [
      { name: 'home', href: '/' },
      { name: 'tools', href: '/tools' },
      // { name: 'docs', href: '/docs' },
      // { name: 'pricing', href: '/pricing' },
      // { name: 'news', href: '/news' },
      { name: 'donate', href: '/donate' },
      { name: 'about', href: '/about' },
    ]

    return user.value ? [...publicRoutes] : publicRoutes
  })

  return {
    navigation
  }
}
