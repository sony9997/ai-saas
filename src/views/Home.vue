<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  PhotoIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const features = [
  {
    title: '智能对话',
    description: '基于大语言模型的智能对话系统，支持多轮对话、上下文理解、个性化回复。',
    icon: ChatBubbleBottomCenterTextIcon
  },
  {
    title: '文本生成',
    description: '智能文本创作和处理，支持多语言翻译、文章生成、摘要提取等功能。',
    icon: DocumentTextIcon
  },
  {
    title: '图像处理',
    description: '强大的计算机视觉能力，支持图像识别、目标检测、图像生成等场景。',
    icon: PhotoIcon
  },
  {
    title: '数据分析',
    description: '智能数据分析和可视化，助力企业深入理解数据，提供决策支持。',
    icon: ChartBarIcon
  }
]
</script>

<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-16">
        <!-- Hero Section -->
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-16 shadow-lg">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            下一代 AI 开放平台
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl">
            提供简单易用的 API 接口，助力开发者快速将 AI 能力集成到应用中。
            无论是自然语言处理、计算机视觉还是语音识别，我们都能满足您的需求。
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#" class="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-0.5">
              开始使用
            </a>
            <a href="#" class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-0.5">
              了解更多
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title" 
               class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 group">
            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 mb-6 text-indigo-500 group-hover:text-indigo-400 transition-colors duration-300">
                <component :is="feature.icon" class="w-full h-full animate-float"/>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* 添加渐变边框效果 */
.group:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(99,102,241,0.1));
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
