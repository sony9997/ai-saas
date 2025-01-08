<template>
  <div class="relative min-h-screen bg-dark-800">
    <ParticlesBackground />
    <PageLayout>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6 text-white">仪表盘</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 统计卡片 -->
          <div v-for="stat in stats" :key="stat.name" class="dark:bg-dark-700 p-6 rounded-lg shadow-md">
            <h3 class="text-sm font-medium text-gray-400">{{ stat.name }}</h3>
            <p class="mt-2 text-3xl font-semibold text-white">{{ stat.value }}</p>
            <div class="mt-4 flex items-center text-sm">
              <span :class="stat.change.type === 'increase' ? 'text-green-400' : 'text-red-400'">
                {{ stat.change.value }}
              </span>
              <span class="ml-2 text-gray-300">vs 上月</span>
            </div>
          </div>
        </div>

        <!-- 图表区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div class="dark:bg-dark-700 p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4 text-white">API 调用趋势</h3>
            <div class="h-80">
              <!-- 图表组件 -->
            </div>
          </div>
          <div class="dark:bg-dark-700 p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4 text-white">资源使用情况</h3>
            <div class="h-80">
              <!-- 图表组件 -->
            </div>
          </div>
        </div>

        <!-- 最近活动 -->
        <div class="mt-6 dark:bg-dark-700 rounded-lg shadow-md">
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4 text-white">最近活动</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th class="text-left text-sm font-medium text-gray-400 pb-4">时间</th>
                    <th class="text-left text-sm font-medium text-gray-400 pb-4">事件</th>
                    <th class="text-left text-sm font-medium text-gray-400 pb-4">状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="activity in activities" :key="activity.id" class="border-t border-gray-700">
                    <td class="py-4 text-sm text-gray-300">{{ activity.time }}</td>
                    <td class="py-4 text-sm text-gray-300">{{ activity.event }}</td>
                    <td class="py-4">
                      <span :class="`text-sm ${activity.status === '成功' ? 'text-green-400' : 'text-red-400'}`">
                        {{ activity.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
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

const stats = [
  {
    name: 'API 调用次数',
    value: '13,456',
    change: { type: 'increase', value: '+12.5%' }
  },
  {
    name: '成功率',
    value: '98.5%',
    change: { type: 'increase', value: '+0.5%' }
  },
  {
    name: '平均响应时间',
    value: '125ms',
    change: { type: 'decrease', value: '-15%' }
  },
  {
    name: '活跃用户',
    value: '1,893',
    change: { type: 'increase', value: '+8.2%' }
  }
]

const activities = [
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
