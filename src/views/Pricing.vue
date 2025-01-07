<template>
  <PageLayout>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl sm:text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">选择适合您的方案</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            我们提供灵活的定价方案，满足不同规模企业的需求。
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div v-for="tier in tiers" :key="tier.name" class="p-8 sm:p-10">
              <h3 class="text-2xl font-bold tracking-tight text-gray-900">{{ tier.name }}</h3>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span v-if="tier.price !== '联系我们'" class="text-4xl font-bold tracking-tight text-gray-900">¥{{ tier.price }}</span>
                <span v-else class="text-4xl font-bold tracking-tight text-gray-900">{{ tier.price }}</span>
                <span v-if="tier.price !== '联系我们'" class="text-sm font-semibold leading-6 text-gray-600">/月</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
                  <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <a
                href="#"
                class="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                开始使用
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
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
