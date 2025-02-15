<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <div class="container mx-auto px-4 py-16">
        <!-- 标题区域 -->
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-12 shadow-lg">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('donate.title') }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            {{ t('donate.description') }}
          </p>
        </div>

        <!-- 支付方式区域 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 微信支付 -->
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <div class="flex flex-col items-center">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('donate.wechatPay') }}</h2>
              <div class="w-96 h-96 bg-white p-2 rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform"
                   @click="showImage('weixin')">
                <img src="@/assets/pay-weixin.jpg" :alt="t('donate.wechatPay')" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <!-- 支付宝 -->
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <div class="flex flex-col items-center">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('donate.alipay') }}</h2>
              <div class="w-96 h-96 bg-white p-2 rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform"
                   @click="showImage('zhifubao')">
                <img src="@/assets/pay-zhifubao.jpg" :alt="t('donate.alipay')" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <!-- Ko-fi -->
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <div class="flex flex-col items-center justify-center h-full">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('donate.kofi') }}</h2>
              <a href="https://ko-fi.com/sony9997" target="_blank" class="w-96 h-96">
                <img src="@/assets/pay-kofi.webp" :alt="t('donate.kofi')" class="w-full h-full object-contain" />
              </a>
            </div>
          </div>
        </div>

        <!-- 图片预览模态框 -->
        <div v-if="showModal" 
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
             @click="showModal = false">
          <img :src="currentImage" 
               class="max-w-[90vw] max-h-[90vh] object-contain"
               :alt="t('donate.qrCode')" />
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showModal = ref(false)
const currentImage = ref('')

const showImage = (type: 'weixin' | 'zhifubao') => {
  currentImage.value = type === 'weixin' 
    ? new URL('@/assets/pay-weixin.jpg', import.meta.url).href
    : new URL('@/assets/pay-zhifubao.jpg', import.meta.url).href
  showModal.value = true
}
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>