<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthHeader from '@/components/auth/AuthHeader.vue'
import AuthInput from '@/components/auth/AuthInput.vue'
import AuthButton from '@/components/auth/AuthButton.vue'

const router = useRouter()
const { register, loading, error } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  if (password.value !== confirmPassword.value) {
    validationError.value = '两次输入的密码不一致'
    return
  }
  
  validationError.value = ''
  await register(email.value, password.value)
  if (!error.value) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <AuthLayout>
    <AuthHeader
      title="创建账户"
      subtitle="开始您的 AI 之旅"
    />
    
    <form @submit="handleSubmit" class="mt-8 space-y-6">
      <div class="space-y-4">
        <AuthInput
          v-model="email"
          type="email"
          label="邮箱地址"
          autocomplete="email"
          required
        />
        
        <AuthInput
          v-model="password"
          type="password"
          label="密码"
          autocomplete="new-password"
          required
        />
        
        <AuthInput
          v-model="confirmPassword"
          type="password"
          label="确认密码"
          autocomplete="new-password"
          required
        />
      </div>

      <div v-if="validationError" class="text-red-400 text-sm text-center">
        {{ validationError }}
      </div>

      <div v-if="error" class="text-red-400 text-sm text-center">
        {{ error }}
      </div>

      <AuthButton type="submit" :loading="loading">
        {{ loading ? '注册中...' : '注册' }}
      </AuthButton>

      <div class="text-center">
        <router-link
          to="/login"
          class="text-sm text-gray-300 hover:text-white"
        >
          已有账户？立即登录
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>
