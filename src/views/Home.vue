<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRouter } from 'vue-router'
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  PhotoIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()

interface Feature {
  title: string
  description: string
  icon: any
  route?: string
  link?: string
}

const features: Feature[] = [
  {
    title: '智能对话',
    description: '基于大语言模型的个性化对话助手，支持上下文理解、知识问答、情感交互等功能。',
    icon: ChatBubbleBottomCenterTextIcon,
    route: '/tools/chat'
  },
  {
    title: '内容创作',
    description: '智能文本生成与处理，支持文章写作、内容润色、多语言翻译等创作需求。',
    icon: DocumentTextIcon,
    route: '/tools'
  },
  {
    title: 'AI绘画',
    description: '先进的图像生成与编辑能力，支持文生图、图生图、风格迁移等多种创作模式。',
    icon: PhotoIcon,
    route: '/tools/unified-image'
  },
  {
    title: '开放API',
    description: '提供标准化的API接口，轻松将AI能力集成到您的应用中。更多API服务请访问琦木科技。',
    icon: ChartBarIcon,
    link: 'https://qimuinfo.top/products/api/'
  }
]

const handleNavigation = (feature: Feature) => {
  if (feature.link) {
    window.open(feature.link, '_blank')
  } else if (feature.route) {
    router.push(feature.route)
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-16">
        <!-- Hero Section -->
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-16 shadow-lg">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            个人AI助手与创作平台
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl">
            为个人用户打造的一站式AI服务平台。无论是日常对话、内容创作还是图像生成，
            都能以简单直观的方式使用先进的AI技术，释放您的创造力。
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link 
              to="/tools"
              class="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              开始体验
            </router-link>
            <a 
              href="https://qimuinfo.top/products/api/" 
              target="_blank"
              class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              API服务
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title" 
               :class="['backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 group cursor-pointer']"
               @click="handleNavigation(feature)">
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
