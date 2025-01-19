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
            {{ t('auth.forgotPasswordTitle') }}
          </h1>
          <p class="text-sm text-center text-gray-400 mb-8">
            {{ t('auth.forgotPasswordDescription') }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-medium text-gray-300">
              {{ t('auth.email') }}
            </label>
            <div class="mt-1">
              <input
                type="email"
                v-model="email"
                required
                :placeholder="t('auth.emailPlaceholder')"
                :class="[
                  'appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-blue-500',
                  email ? 'text-gray-900' : 'text-white bg-dark-700/50'
                ]"
              />
            </div>
            <p v-if="authStore.error" class="mt-2 text-sm text-red-500">{{ authStore.error }}</p>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
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
              {{ authStore.loading ? t('auth.sending') : t('auth.sendResetLink') }}
            </button>
          </div>

          <!-- Back to Login -->
          <div class="text-sm text-center">
            <router-link
              to="/login"
              class="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              {{ t('auth.backToLogin') }}
            </router-link>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div class="relative bg-white dark:bg-dark-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6 border border-gray-200 dark:border-gray-700">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                id="modal-title"
              >
                {{ t('auth.resetLinkSent') }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t('auth.checkEmail') }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
              @click="router.push('/login')"
            >
              {{ t('auth.backToLogin') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const email = ref('')
const showSuccessModal = ref(false)

const handleSubmit = async () => {
  const { error } = await authStore.forgotPassword(email.value)
  if (!error) {
    showSuccessModal.value = true
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
