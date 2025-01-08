<template>
  <div class="relative min-h-screen bg-dark-800">
    <ParticlesBackground />
    <PageLayout>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6 text-white">新闻动态</h1>
        <div class="space-y-6">
          <article v-for="news in newsList" :key="news.id" class="dark:bg-dark-700 rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-2 text-white">{{ news.title }}</h2>
            <p class="text-gray-300 mb-4">{{ news.summary }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">{{ news.date }}</span>
              <a href="#" class="text-indigo-400 hover:text-indigo-300">阅读更多</a>
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