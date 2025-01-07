<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthHeader from '@/components/auth/AuthHeader.vue'
import AuthInput from '@/components/auth/AuthInput.vue'
import AuthButton from '@/components/auth/AuthButton.vue'

const router = useRouter()
const { login, loading, error } = useAuth()

const email = ref('')
const password = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  await login(email.value, password.value)
  if (!error.value) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <AuthLayout>
    <AuthHeader
      title="欢迎回来"
      subtitle="登录您的账户"
    />
    <form @submit="handleSubmit" class="mt-8 space-y-6">
      <div class="space-y-4">
        <AuthInput
          v-model="email"
          type="email"
          label="邮箱地址"
          required
        />
        <AuthInput
          v-model="password"
          type="password"
          label="密码"
          required
        />
      </div>

      <div v-if="error" class="text-red-400 text-sm text-center">
        {{ error }}
      </div>

      <AuthButton type="submit" :loading="loading">
        {{ loading ? '登录中...' : '登录' }}
      </AuthButton>

      <div class="text-center">
        <router-link
          to="/register"
          class="text-sm text-gray-300 hover:text-white"
        >
          还没有账户？立即注册
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>
