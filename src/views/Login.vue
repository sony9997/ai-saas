<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    // 登录 API 调用...
    await login(form)
    
    // 添加调试日志
    console.log('登录成功')
    
    userStore.login()
    console.log('登录状态:', userStore.isLoggedIn)
    console.log('localStorage:', localStorage.getItem('isLoggedIn'))
    
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script> 

<template>
  <form @submit.prevent="handleLogin">
    <!-- 用户名/邮箱输入框 -->
    <input 
      type="text" 
      required
      autocomplete="username"
      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
    >
    
    <!-- 密码输入框 -->
    <input 
      type="password" 
      required
      autocomplete="current-password"
      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
    >
  </form>
</template> 