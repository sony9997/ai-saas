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
const { register, loading, error } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  if (password.value !== confirmPassword.value) {
    validationError.value = t('errors.passwordMismatch')
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
      :title="t('auth.registerTitle')"
      :subtitle="t('auth.registerSubtitle')"
    />
    
    <form @submit="handleSubmit" class="mt-8 space-y-6">
      <div class="space-y-4">
        <AuthInput
          v-model="email"
          type="email"
          :label="t('auth.emailLabel')"
          autocomplete="email"
          required
        />
        
        <AuthInput
          v-model="password"
          type="password"
          :label="t('auth.passwordLabel')"
          autocomplete="new-password"
          required
        />
        
        <AuthInput
          v-model="confirmPassword"
          type="password"
          :label="t('auth.confirmPassword')"
          autocomplete="new-password"
          required
        />
      </div>

      <div v-if="validationError" class="text-red-400 text-sm text-center">
        {{ validationError }}
      </div>

      <div v-if="error" class="text-red-400 text-sm text-center">
        {{ t('errors.registerFailed') }}
      </div>

      <AuthButton type="submit" :loading="loading">
        {{ t('common.signup') }}
      </AuthButton>

      <div class="text-center mt-4">
        <router-link to="/login" class="text-indigo-500 hover:text-indigo-600 text-sm">
          {{ t('auth.hasAccount') }} {{ t('auth.loginNow') }}
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>
