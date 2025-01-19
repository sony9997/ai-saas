<template>
  <div class="min-h-screen relative">
    <!-- 背景动画 -->
    <div class="absolute inset-0 -z-10">
      <div class="relative h-full overflow-hidden bg-dark-900">
        <div class="absolute h-full w-full">
          <div class="absolute inset-0 z-10 overflow-hidden">
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容 -->
    <div class="container relative mx-auto px-6 py-12 h-screen flex flex-col items-center justify-center">
      <div class="w-full max-w-md space-y-8 bg-white/10 dark:bg-dark-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <div>
          <h1 class="text-3xl font-bold text-center text-gray-100 mb-2">
            {{ t('auth.resetPasswordTitle') }}
          </h1>
          <p class="text-sm text-center text-gray-400 mb-8">
            {{ t('auth.resetPasswordDescription') }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Password Input -->
          <div>
            <label class="block text-sm font-medium text-gray-300">
              {{ t('auth.newPassword') }}
            </label>
            <div class="mt-1 relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
                :placeholder="t('auth.passwordPlaceholder')"
                :class="[
                  'appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-blue-500',
                  password ? 'text-gray-900' : 'text-white bg-dark-700/50'
                ]"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <p v-if="authStore.error" class="mt-2 text-sm text-red-500">{{ authStore.error }}</p>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label class="block text-sm font-medium text-gray-300">
              {{ t('auth.confirmPassword') }}
            </label>
            <div class="mt-1 relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                required
                :placeholder="t('auth.confirmPasswordPlaceholder')"
                :class="[
                  'appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-blue-500',
                  confirmPassword ? 'text-gray-900' : 'text-white bg-dark-700/50'
                ]"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <p v-if="authStore.error" class="mt-2 text-sm text-red-500">{{ authStore.error }}</p>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="authStore.loading || !passwordsMatch"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02]"
            >
              <svg
                v-if="authStore.loading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ authStore.loading ? t('auth.resetting') : t('auth.resetPassword') }}
            </button>
          </div>
        </form>
        <p v-if="linkExpired" class="text-sm text-red-500">{{ t('auth.linkExpired') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/config/supabase'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const linkExpired = ref(false)

const passwordsMatch = computed(() => {
  return !confirmPassword.value || password.value === confirmPassword.value
})

onMounted(async () => {
  // 检查 URL 中是否包含重置密码所需的参数
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const type = urlParams.get('type')

  if (!token || type !== 'recovery') {
    // 检查 hash 中是否有 access_token（处理重定向后的情况）
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    const errorCode = hashParams.get('error_code')

    if (error || errorCode === 'otp_expired' || (!token && !hashParams.get('access_token'))) {
      linkExpired.value = true
      return
    }
  }

  // 如果有 token，尝试验证 session
  try {
    const { error } = await supabase.auth.getSession()
    if (error) {
      linkExpired.value = true
    }
  } catch (error) {
    linkExpired.value = true
  }
})

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    return
  }

  const { error } = await authStore.resetPassword(password.value)
  if (!error) {
    router.push('/login')
  }
}
</script>

<style scoped>
.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #003298;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 8s ease-in forwards infinite;
}

.cube:nth-child(2n) {
  border-color: #0051f4;
}

.cube:nth-child(2) {
  animation-delay: 1s;
  left: 25vw;
  top: 40vh;
}

.cube:nth-child(3) {
  animation-delay: 3s;
  left: 75vw;
  top: 50vh;
}

.cube:nth-child(4) {
  animation-delay: 5s;
  left: 90vw;
  top: 10vh;
}

.cube:nth-child(5) {
  animation-delay: 7s;
  left: 10vw;
  top: 85vh;
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
