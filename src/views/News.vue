<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-8 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            新闻动态
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            了解我们的最新动态和产品更新。
          </p>
        </div>

        <div class="space-y-6">
          <article v-for="news in newsList" :key="news.id" 
                   class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ news.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ news.summary }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ news.date }}
              </span>
              <a href="#" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition duration-150">
                阅读更多
              </a>
            </div>
          </article>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const newsList = [
  {
    id: 1,
    title: '平台更新公告',
    summary: '我们最新发布了更强大的 AI 模型，提供更准确的对话和图像生成能力。',
    date: '2024-03-20'
  },
  {
    id: 2,
    title: '新功能发布',
    summary: '现在支持更多的 AI 应用场景，包括文本分析、图像识别等。',
    date: '2024-03-15'
  }
]
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 