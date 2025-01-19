<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Sun, Moon, Menu as MenuIcon, X, Github } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useAuth } from '@/composables/useAuth'
import { useNavigation } from '@/config/navigation'
import { useI18n } from 'vue-i18n'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()
const router = useRouter()
const { user, logout } = useAuth()

const { navigation } = useNavigation()

const isScrolled = ref(false)

// Monitor scroll event
window.addEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 0
})

const navbarClass = computed(() => ({
  'bg-opacity-90 backdrop-blur-lg shadow-lg': isScrolled.value,
  'bg-transparent': !isScrolled.value
}))

const isLoggedIn = computed(() => {
  return !!user.value
})

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <Disclosure as="nav" :class="['fixed w-full z-50 transition-all duration-300', navbarClass]" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {{ t('home.title') }}
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:space-x-8">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
          >
            {{ t(`nav.${item.name}`) }}
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Language Switch -->
          <LanguageSwitch />
          
          <!-- Github Link -->
          <a
            href="https://github.com/sony9997/ai-saas"
            target="_blank"
            class="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <Github class="h-5 w-5 text-gray-300" />
          </a>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <Sun v-if="isDark" class="h-5 w-5 text-gray-300" />
            <Moon v-else class="h-5 w-5 text-gray-300" />
          </button>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <template v-if="!isLoggedIn">
              <router-link
                to="/login"
                class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                {{ t('common.login') }}
              </router-link>
              <router-link
                to="/register"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                {{ t('common.signup') }}
              </router-link>
            </template>

            <template v-else>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                {{ t('common.logout') }}
              </button>
            </template>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <DisclosureButton class="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <X v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            {{ t(`nav.${item.name}`) }}
          </router-link>
        </div>
      </DisclosurePanel>
    </div>
  </Disclosure>
</template>
