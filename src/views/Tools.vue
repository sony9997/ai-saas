<template>
  <div class="relative min-h-screen bg-dark-800">
    <ParticlesBackground />
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-12 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            AI 工具
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            探索我们提供的丰富 AI 工具，为您的应用赋能。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="feature in features" :key="feature.title"
               class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ feature.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ feature.description }}
            </p>
            <ul class="space-y-2">
              <li v-for="item in feature.items" :key="item"
                  class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const features = [
  {
    title: '自然语言处理',
    description: '基于最新的深度学习技术，提供全面的自然语言处理能力。',
    items: [
      '智能对话生成',
      '文本分类与摘要',
      '情感分析',
      '命名实体识别'
    ]
  },
  {
    title: '计算机视觉',
    description: '强大的视觉AI能力，支持多种图像和视频处理场景。',
    items: [
      '物体检测与识别',
      '人脸识别与分析',
      '图像分割',
      '场景理解'
    ]
  }
]
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 