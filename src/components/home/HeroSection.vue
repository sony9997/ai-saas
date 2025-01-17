<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'

const stats = [
  { label: 'Students', value: '1.2M+', icon: '👨‍🎓' },
  { label: 'Success Rate', value: '99.9%', icon: '📈' },
  { label: 'AI Models', value: '12+', icon: '🤖' }
]
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-purple-900">
    <ParticlesBackground />

    <!-- Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
        <span class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Ryue is your Study Buddy
        </span>
      </h1>
      
      <p class="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
        释放AI的力量，让学习更轻松、更高效。我们的AI助手将帮助你突破学习瓶颈，实现知识的快速积累与运用。
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <router-link
          to="/register"
          class="px-8 py-3 text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
        >
          Get Started Free →
        </router-link>
        <a
          href="#"
          class="px-8 py-3 text-base font-medium rounded-lg text-gray-300 border border-gray-600 hover:border-gray-500 hover:text-white transition-colors duration-200"
        >
          View Demo
        </a>
      </div>

      <!-- Stats -->
      <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-lg"
        >
          <span class="text-2xl mb-2">{{ stat.icon }}</span>
          <dt class="text-2xl font-bold text-white">{{ stat.value }}</dt>
          <dd class="text-purple-300">{{ stat.label }}</dd>
        </div>
      </div>
    </div>
  </div>
</template>
