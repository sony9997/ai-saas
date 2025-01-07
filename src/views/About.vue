<template>
  <StarryLayout>
    <PageLayout>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">关于我们</h1>
        <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
          <div class="prose max-w-none dark:prose-invert">
            <p class="mb-4">
              我们是一家致力于让 AI 技术更易用、更普及的科技公司。通过提供简单易用的 API 和完整的解决方案，
              帮助开发者和企业快速将 AI 能力集成到自己的应用中。
            </p>
            <h2 class="text-xl font-semibold mb-4">我们的使命</h2>
            <p class="mb-4">
              让每个应用都能轻松获得 AI 能力，推动技术创新和产业升级。
            </p>
            <h2 class="text-xl font-semibold mb-4">我们的愿景</h2>
            <p class="mb-4">
              成为全球领先的 AI 服务提供商，为各行各业提供可靠、高效的 AI 解决方案。
            </p>
            <h2 class="text-xl font-semibold mb-4">核心价值观</h2>
            <ul class="list-disc pl-6 mb-4">
              <li>创新驱动发展</li>
              <li>用户体验至上</li>
              <li>技术赋能未来</li>
              <li>开放共赢合作</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  </StarryLayout>
</template>

<script setup lang="ts">
import StarryLayout from '@/components/layout/StarryLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
</script> 