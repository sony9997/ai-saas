<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import StarryLayout from '@/components/layout/StarryLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const { user } = useAuth()
</script>

<template>
  <StarryLayout>
    <PageLayout>
      <div class="space-y-6">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">仪表盘</h1>
        <div class="rounded-lg border-4 border-dashed border-gray-200 dark:border-gray-700 p-4">
          <p class="text-gray-600 dark:text-gray-300">欢迎, {{ user?.email }}</p>
        </div>
      </div>
    </PageLayout>
  </StarryLayout>
</template>
