<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-12 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            AI 工具
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            探索我们提供的丰富 AI 工具，为您的应用赋能。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 对话 -->
          <router-link to="/tools/chat" 
            class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 mb-4 text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI 对话</h2>
              <p class="text-gray-600 dark:text-gray-300 text-center">与 AI 进行自然语言对话交互</p>
            </div>
          </router-link>

          <!-- 文生图 -->
          <router-link to="/tools/text2image"
            class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 mb-4 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">文本生成图像</h2>
              <p class="text-gray-600 dark:text-gray-300 text-center">通过文字描述生成相应的图像</p>
            </div>
          </router-link>

          <!-- 图生图 -->
          <router-link to="/tools/image2image"
            class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 mb-4 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">图像生成图像</h2>
              <p class="text-gray-600 dark:text-gray-300 text-center">基于输入图像生成新的图像</p>
            </div>
          </router-link>

          <!-- 翻唱 -->
          <router-link to="/tools/sing"
            class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 mb-4 text-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI 翻唱</h2>
              <p class="text-gray-600 dark:text-gray-300 text-center">使用 AI 技术进行歌曲翻唱</p>
            </div>
          </router-link>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 