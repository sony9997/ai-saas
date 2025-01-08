<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">文本生成图像</h1>
          <!-- 后续添加文生图功能 -->
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 