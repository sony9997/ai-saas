<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthHeader from '@/components/auth/AuthHeader.vue'
import AuthInput from '@/components/auth/AuthInput.vue'
import AuthButton from '@/components/auth/AuthButton.vue'

const router = useRouter()
const { t } = useI18n()
const { login, loading, error } = useAuth()

const email = ref('')
const password = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  await login(email.value, password.value)
  if (!error.value) {
    router.push('/tools')
  }
}
</script>

<template>
  <AuthLayout>
    <AuthHeader
      :title="t('auth.loginTitle')"
      :subtitle="t('auth.loginSubtitle')"
    />
    <form @submit="handleSubmit" class="mt-8 space-y-6">
      <div class="space-y-4">
        <AuthInput
          v-model="email"
          type="email"
          :label="t('auth.emailLabel')"
          required
        />
        <AuthInput
          v-model="password"
          type="password"
          :label="t('auth.passwordLabel')"
          required
        />
      </div>

      <div v-if="error" class="text-red-400 text-sm text-center">
        {{ t('errors.loginFailed') }}
      </div>

      <AuthButton type="submit" :loading="loading">
        {{ t('common.login') }}
      </AuthButton>

      <div class="flex items-center justify-between mt-4">
        <div class="text-sm">
          <router-link
            to="/forgot-password"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            {{ t('auth.forgotPassword') }}
          </router-link>
        </div>
      </div>

      <div class="text-center mt-4">
        <router-link to="/register" class="text-indigo-500 hover:text-indigo-600 text-sm">
          {{ t('auth.noAccount') }} {{ t('auth.registerNow') }}
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>
