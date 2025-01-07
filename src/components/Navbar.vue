<script setup lang="ts">
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const navigation = [
  { name: '首页', href: '/' },
  { name: '功能', href: '/features' },
  { name: '定价', href: '/pricing' },
]

const userStore = useUserStore()
const router = useRouter()

console.log('userStore.isLoggedIn:', userStore.isLoggedIn)

// 监听登录状态变化
watch(() => userStore.isLoggedIn, (newValue) => {
  console.log('登录状态变化:', newValue)
})

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <h1 class="text-xl font-bold text-indigo-600">AI SaaS</h1>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div class="nav-buttons">
            <!-- 添加调试信息 -->
            <!-- <div>当前登录状态: {{ userStore.isLoggedIn }}</div> -->
            
            <template v-if="!userStore.isLoggedIn">
              <button @click="$router.push('/login')">登录</button>
              <button @click="$router.push('/register')">免费注册</button>
            </template>
            
            <button v-else @click="handleLogout">登出</button>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          {{ item.name }}
        </router-link>
        
        <!-- 添加移动端的登录/登出按钮 -->
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="space-y-1">
            <template v-if="!userStore.isLoggedIn">
              <button
                @click="$router.push('/login')"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
              >
                登录
              </button>
              <button  
                @click="$router.push('/register')"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
              >
                免费注册
              </button>
            </template>
            <button
              v-else
              @click="handleLogout"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
