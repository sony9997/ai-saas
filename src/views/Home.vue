<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const features = [
  {
    title: '智能对话',
    description: '基于先进的AI模型，提供自然、流畅的对话体验',
    icon: '💬'
  },
  {
    title: '文本生成',
    description: '快速生成高质量的文章、报告和创意内容',
    icon: '📝'
  },
  {
    title: '图像处理',
    description: '智能图像编辑、生成和优化',
    icon: '🎨'
  },
  {
    title: '数据分析',
    description: '深度学习驱动的数据分析和可视化',
    icon: '📊'
  }
]
</script>

<template>
  <div class="relative min-h-screen dark:bg-dark-900">
    <!-- 粒子背景 -->
    <ParticlesBackground />
    
    <!-- 页面内容 -->
    <PageLayout>
      <!-- Hero Section -->
      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              下一代AI助手，助力业务增长
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              利用最先进的人工智能技术，为您的业务提供智能化解决方案。从自然语言处理到计算机视觉，我们为您提供全方位的AI能力。
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                免费试用
              </a>
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
                了解更多 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:text-center">
            <h2 class="text-base font-semibold leading-7 text-indigo-600">强大功能</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              一站式AI解决方案
            </p>
          </div>
          <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div v-for="feature in features" :key="feature.title" class="flex flex-col">
                <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span class="text-3xl">{{ feature.icon }}</span>
                  {{ feature.title }}
                </dt>
                <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p class="flex-auto">{{ feature.description }}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>
