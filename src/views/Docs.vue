<template>
  <div class="relative min-h-screen bg-dark-800">
    <ParticlesBackground />
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-8 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            开发文档
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            详细的API文档和使用指南，帮助您快速接入我们的服务。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 左侧导航 -->
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg h-fit">
            <nav>
              <ul class="space-y-3">
                <li v-for="item in menuItems" :key="item.id">
                  <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-150">
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- 右侧内容 -->
          <div class="md:col-span-2 backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-8 shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              快速开始
            </h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                欢迎使用我们的 AI 平台 API。本文档将帮助您快速接入和使用我们的服务。
                通过简单的步骤，您就能将强大的 AI 能力集成到您的应用中。
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const menuItems = [
  { id: 1, title: '快速开始' },
  { id: 2, title: 'API 参考' },
  { id: 3, title: '示例代码' }
]
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 