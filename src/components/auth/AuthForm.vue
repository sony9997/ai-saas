<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  mode: 'login' | 'register'
  loading?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  submit: [credentials: { email: string; password: string }]
}>()

const email = ref('')
const password = ref('')

const router = useRouter()

const handleSubmit = (e: Event) => {
  e.preventDefault()
  emit('submit', { email: email.value, password: password.value })
}

const navigateToAlternate = () => {
  router.push(props.mode === 'login' ? '/register' : '/login')
}
</script>

<template>
  <form class="space-y-6" @submit="handleSubmit">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-200">
        Email address
      </label>
      <div class="mt-1">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-200">
        Password
      </label>
      <div class="mt-1">
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
      </div>
    </div>

    <div v-if="error" class="text-red-400 text-sm">
      {{ error }}
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Loading...' : mode === 'login' ? 'Sign in' : 'Sign up' }}
      </button>
    </div>

    <div class="text-center">
      <button
        type="button"
        @click="navigateToAlternate"
        class="text-sm text-gray-200 hover:text-white"
      >
        {{ mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in' }}
      </button>
    </div>
  </form>
</template>
