<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            关于我
          </h1>
          
          <div class="space-y-8">
            <div>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                你好！我是一名热爱技术的独立开发者。我喜欢探索新技术，开发有趣的项目，并与志同道合的朋友分享交流。
                这个网站就是我的一个尝试，希望能为大家带来一些有用且有趣的东西。
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                我在做什么
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                我致力于开发简单易用的工具和应用，让AI技术能更好地服务于日常生活和工作。
                同时也在这里分享我的学习心得和技术积累，希望能与大家一起进步。
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                我的期待
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                希望通过这个平台，能认识更多对技术有热情的朋友。无论你是开发者还是普通用户，
                都欢迎和我交流，分享你的想法和建议。让我们一起探索技术的无限可能！
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                我的理念
              </h2>
              <ul class="space-y-3 text-gray-600 dark:text-gray-300 list-disc list-inside pl-4">
                <li>保持好奇心，不断学习</li>
                <li>简单实用优于花哨复杂</li>
                <li>乐于分享，共同成长</li>
                <li>用技术服务生活</li>
              </ul>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                联系我
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                如果你有任何问题、建议或者合作想法，欢迎通过以下方式联系我：
                <br>
                Email: hedonghncs@gmail.com
                <br>
                官网: <a href="https://qimuinfo.top/" 
                      target="_blank" 
                      class="text-blue-500 hover:text-blue-600 hover:underline transition-colors">
                      https://qimuinfo.top/
                    </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 