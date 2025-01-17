<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="py-16 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 lg:px-8">
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-12 shadow-lg text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              选择适合您的方案
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              我们提供灵活的定价方案，满足不同规模企业的需求。
            </p>
          </div>

          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div v-for="tier in tiers" :key="tier.name" 
                 class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {{ tier.name }}
              </h3>
              <p class="flex items-baseline gap-x-2 mb-6">
                <span v-if="tier.price !== '联系我们'" class="text-4xl font-bold text-gray-900 dark:text-white">
                  ¥{{ tier.price }}
                </span>
                <span v-else class="text-4xl font-bold text-gray-900 dark:text-white">
                  {{ tier.price }}
                </span>
                <span v-if="tier.price !== '联系我们'" class="text-gray-600 dark:text-gray-300">
                  /月
                </span>
              </p>
              <ul class="space-y-4 mb-8">
                <li v-for="feature in tier.features" :key="feature" 
                    class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <a href="#" 
                 class="block w-full text-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-150">
                开始使用
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'

const tiers = [
  {
    name: '基础版',
    price: '99',
    features: [
      '基础AI对话功能',
      '每月1000次API调用',
      '标准客户支持',
      '基础数据分析'
    ]
  },
  {
    name: '专业版',
    price: '299',
    features: [
      '高级AI对话功能',
      '每月10000次API调用',
      '优先客户支持',
      '高级数据分析',
      '自定义模型训练'
    ]
  },
  {
    name: '企业版',
    price: '联系我们',
    features: [
      '全部高级功能',
      '无限API调用',
      '24/7专属支持',
      '企业级API集成',
      '专属模型定制',
      '部署咨询服务'
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
