<template>
  <StarryLayout>
    <PageLayout>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">开发文档</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 左侧导航 -->
          <div class="col-span-1">
            <nav class="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
              <ul class="space-y-2">
                <li v-for="item in menuItems" :key="item.id">
                  <a href="#" class="text-gray-700 hover:text-blue-600 dark:text-gray-300">{{ item.title }}</a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- 右侧内容 -->
          <div class="col-span-2 bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">快速开始</h2>
            <div class="prose dark:prose-invert">
              <p>欢迎使用我们的 AI 平台 API。本文档将帮助您快速接入和使用我们的服务。</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </StarryLayout>
</template>

<script setup lang="ts">
import StarryLayout from '@/components/layout/StarryLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const menuItems = [
  { id: 1, title: '快速开始' },
  { id: 2, title: 'API 参考' },
  { id: 3, title: '示例代码' }
]
</script> 