<template>
  <div class="relative bg-dark-800">
    <PageLayout>
      <button 
        class="absolute -top-4 left-6 p-3 text-gray-100 dark:text-gray-200 bg-gray-700/80 dark:bg-dark-600/80 rounded-lg hover:bg-gray-600/90 dark:hover:bg-dark-500/90 transition-all duration-200 shadow-lg backdrop-blur-sm"
        @click="router.back()"
        v-if="$route.path !== '/tools'"
        :title="t('common.back')"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <div class="container mx-auto px-4 py-6">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ t('imageGen.title') }}</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- 表单区域 -->
            <div class="space-y-4">
              <!-- 提示词输入 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{{ t('imageGen.prompt') }}</label>
                <textarea
                  v-model="formData.prompt"
                  rows="4"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('imageGen.prompt')"
                />
              </div>

              <!-- 基础模型选择 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{{ t('imageGen.style') }}</label>
                <select 
                  v-model="formData.baseModel"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option v-for="style in styles" :key="style.value" :value="style.value">
                    {{ style.label }}
                  </option>
                </select>
              </div>

              <!-- 生成按钮 -->
              <button
                @click="generateImage"
                :disabled="loading"
                class="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {{ loading ? t('common.loading') : t('imageGen.generate') }}
              </button>
            </div>

            <!-- 图片预览区域 -->
            <div 
              class="flex items-center justify-center border-2 border-dashed border-dark-500 rounded-lg min-h-[360px] cursor-pointer" 
              @click="generatedImage && showImagePreview(generatedImage)"
              :class="{ 'hover:cursor-pointer': generatedImage }"
            >
              <div v-if="loading" class="text-gray-900 dark:text-gray-100">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
                <p>{{ t('common.loading') }}</p>
              </div>
              <img
                v-else-if="generatedImage"
                :src="generatedImage"
                :alt="t('imageGen.generatedImage')"
                class="max-w-full max-h-[600px] rounded-lg"
              />
              <div v-else class="text-gray-900 dark:text-gray-100">
                {{ t('imageGen.previewArea') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>

  <!-- 图片预览Modal -->
  <div 
    v-if="previewImage"
    class="fixed inset-0 bg-black/80 dark:bg-black/90 z-50 flex items-center justify-center p-4"
    @click="closeImagePreview"
  >
    <div class="relative max-w-full max-h-full">
      <img 
        :src="previewImage" 
        :alt="t('imageGen.generatedImage')"
        class="max-w-full max-h-[90vh] rounded-lg"
      />
      <button 
        @click="closeImagePreview"
        class="absolute -top-4 -right-4 p-2 bg-dark-600 rounded-full hover:bg-dark-500 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()
const { t } = useI18n()

const styles = [
  { value: '墨幽岚', label: '墨幽岚' },
  { value: '美丽的现实主义', label: '美丽的现实主义' },
  { value: '麦橘写实', label: '麦橘写实' },
  { value: '国风', label: '国风' },
  { value: '墨幽二次元', label: '墨幽二次元' },
  { value: '麦橘幻想', label: '麦橘幻想' }
]

// 表单数据
const formData = reactive({
  prompt: '',
  baseModel: '墨幽岚'
})

const loading = ref(false)
const generatedImage = ref('')
const previewImage = ref('')

// 显示图片预览
const showImagePreview = (imageUrl: string) => {
  previewImage.value = imageUrl
}

// 关闭图片预览
const closeImagePreview = () => {
  previewImage.value = ''
}

// 生成图片
const generateImage = async () => {
  if (!formData.prompt) {
    alert(t('errors.required'))
    return
  }

  loading.value = true
  try {
    const response = await fetch(import.meta.env.VITE_DIFY_API_URL+'/workflows/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`
      },
      body: JSON.stringify({
        inputs: {
          action: 'txt2img',
          prompt: formData.prompt,
          baseModel: formData.baseModel,
        },
        response_mode: 'blocking',
        user: 'hed-1'
      })
    })

    const data = await response.json()
    const imageUrl = data?.data?.outputs?.output?.[0]?.url
    if (imageUrl) {
      generatedImage.value = imageUrl
    } else {
      alert(data.message || t('errors.networkError'))
    }
  } catch (error) {
    console.error('Error:', error)
    alert(t('errors.networkError'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>