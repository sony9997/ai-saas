<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Sun, Moon, Menu as MenuIcon, X } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useAuth } from '@/composables/useAuth'
import { useNavigation } from '@/config/navigation'
import { storeToRefs } from 'pinia'

const { isDark, toggleTheme } = useTheme()
const { logout } = useAuth()
const router = useRouter()

// 使用 storeToRefs 来保持响应性
const { user } = storeToRefs(useAuth())

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
            AI-SaaS
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
            {{ item.name }}
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
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
                登录
              </router-link>
              <router-link
                to="/register"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                免费注册
              </router-link>
            </template>

            <template v-else>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                退出登录
              </button>
            </template>
          </div>

          <!-- Mobile menu button -->
          <DisclosureButton class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-800">
            <MenuIcon v-if="!open" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
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
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800"
        >
          {{ item.name }}
        </router-link>

        <!-- Mobile Auth Buttons -->
        <template v-if="!isLoggedIn">
          <router-link
            to="/login"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800"
          >
            登录
          </router-link>
          <router-link
            to="/register"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800"
          >
            注册
          </router-link>
        </template>
        <template v-else>
          <button
            @click="handleLogout"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800"
          >
            退出登录
          </button>
        </template>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
