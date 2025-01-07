<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">仪表盘</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="rounded-lg border-4 border-dashed border-gray-200 p-4">
            <p class="text-gray-600">欢迎, {{ user?.email }}</p>
            <!-- Add dashboard content here -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
