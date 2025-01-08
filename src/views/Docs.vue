<template>
  <div class="relative min-h-screen bg-dark-800">
    <ParticlesBackground />
    <PageLayout>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6 text-white">开发文档</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 左侧导航 -->
          <div class="col-span-1">
            <nav class="dark:bg-dark-700 p-4 rounded-lg shadow">
              <ul class="space-y-2">
                <li v-for="item in menuItems" :key="item.id">
                  <a href="#" class="text-gray-300 hover:text-indigo-400">{{ item.title }}</a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- 右侧内容 -->
          <div class="col-span-2 dark:bg-dark-700 p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4 text-white">快速开始</h2>
            <div class="prose dark:prose-invert">
              <p class="text-gray-300">欢迎使用我们的 AI 平台 API。本文档将帮助您快速接入和使用我们的服务。</p>
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