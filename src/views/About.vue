<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-12">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {{ t('about.title') }}
          </h1>
          
          <div class="space-y-8">
            <div>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {{ t('about.introduction') }}
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {{ t('about.whatImDoing.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ t('about.whatImDoing.content') }}
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {{ t('about.expectation.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ t('about.expectation.content') }}
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {{ t('about.philosophy.title') }}
              </h2>
              <ul class="space-y-3 text-gray-600 dark:text-gray-300 list-disc list-inside pl-4">
                <li v-for="(item, index) in philosophyItems" :key="index">{{ item }}</li>
              </ul>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {{ t('about.contact.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ t('about.contact.content') }}
                <br>
                {{ t('about.contact.email') }} hedonghncs@gmail.com
                <br>
                {{ t('about.contact.website') }} <a href="https://qimuinfo.top/" 
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
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, tm } = useI18n()

const philosophyItems = computed(() => tm('about.philosophy.items') as string[])
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>