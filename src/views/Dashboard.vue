<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <!-- 页面标题 -->
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-8 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">仪表盘</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            查看您的 AI 服务使用情况和关键指标
          </p>
        </div>

        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.name" 
               class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ stat.name }}</h3>
            <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{{ stat.value }}</p>
            <div class="mt-4 flex items-center text-sm">
              <span :class="stat.change.type === 'increase' ? 'text-green-500' : 'text-red-500'">
                {{ stat.change.value }}
              </span>
              <span class="ml-2 text-gray-600 dark:text-gray-300">vs 上月</span>
            </div>
          </div>
        </div>

        <!-- 图表区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">API 调用趋势</h2>
            <div class="h-80">
              <!-- 图表组件 -->
            </div>
          </div>
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">服务使用分布</h2>
            <div class="h-80">
              <!-- 图表组件 -->
            </div>
          </div>
        </div>

        <!-- 最近活动 -->
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">最近活动</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">时间</th>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">事件</th>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="activity in recentActivities" :key="activity.id" 
                    class="hover:bg-white/5 transition duration-150">
                  <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{{ activity.time }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{{ activity.event }}</td>
                  <td class="px-6 py-4 text-sm">
                    <span :class="{
                      'text-green-500': activity.status === '成功',
                      'text-yellow-500': activity.status === '进行中',
                      'text-red-500': activity.status === '失败'
                    }">
                      {{ activity.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
import PageLayout from '@/components/layout/PageLayout.vue'

const stats = [
  {
    name: 'API 调用次数',
    value: '128,897',
    change: { type: 'increase', value: '+12.5%' }
  },
  {
    name: '活跃用户',
    value: '3,127',
    change: { type: 'increase', value: '+5.2%' }
  },
  {
    name: '平均响应时间',
    value: '238ms',
    change: { type: 'decrease', value: '-18.3%' }
  },
  {
    name: '成功率',
    value: '99.9%',
    change: { type: 'increase', value: '+0.2%' }
  }
]

const recentActivities = [
  {
    id: 1,
    time: '2024-03-20 15:30',
    event: 'API 调用',
    status: '成功'
  },
  {
    id: 2,
    time: '2024-03-20 15:25',
    event: '模型训练',
    status: '进行中'
  },
  {
    id: 3,
    time: '2024-03-20 15:20',
    event: '数据同步',
    status: '成功'
  }
]
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
