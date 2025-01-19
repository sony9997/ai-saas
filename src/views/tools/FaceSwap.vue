<template>
  <div class="relative min-h-screen bg-dark-800">
    <PageLayout>
      <!-- 返回按钮 -->
      <button 
        class="absolute -top-4 left-6 p-3 text-gray-100 dark:text-gray-200 bg-gray-700/80 dark:bg-dark-600/80 rounded-lg hover:bg-gray-600/90 dark:hover:bg-dark-500/90 transition-all duration-200 shadow-lg backdrop-blur-sm"
        @click="router.back()"
        v-if="$route.path !== '/tools'"
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
      <div class="container mx-auto px-4 py-12">
        <!-- 页面标题 -->
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-8 mb-8 shadow-lg">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ t('faceSwap.title') }}</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ t('faceSwap.description') }}
          </p>
        </div>

        <!-- 图片上传区域 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <!-- 源图片上传 -->
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('faceSwap.sourceImage') }}</h2>
            <div class="relative">
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleSourceImageUpload"
                ref="sourceImageInput"
              >
              <div 
                class="aspect-video rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-200"
                @click="$refs.sourceImageInput.click()"
              >
                <div v-if="!formData.sourceImage.url" class="text-center p-6">
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ t('faceSwap.dragDrop') }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {{ t('faceSwap.fileSupport') }}
                  </p>
                </div>
                <img 
                  v-else 
                  :src="formData.sourceImage.url" 
                  class="w-full h-full object-contain rounded-lg"
                  @click.stop="sourceImagePreview = true"
                >
              </div>
            </div>
          </div>

          <!-- 目标图片上传 -->
          <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-xl p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('faceSwap.targetImage') }}</h2>
            <div class="relative">
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleTargetImageUpload"
                ref="targetImageInput"
              >
              <div 
                class="aspect-video rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-200"
                @click="$refs.targetImageInput.click()"
              >
                <div v-if="!formData.targetImage.url" class="text-center p-6">
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ t('faceSwap.dragDrop') }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {{ t('faceSwap.fileSupport') }}
                  </p>
                </div>
                <img 
                  v-else 
                  :src="formData.targetImage.url" 
                  class="w-full h-full object-contain rounded-lg"
                  @click.stop="targetImagePreview = true"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 生成按钮 -->
        <div class="flex justify-center">
          <button
            @click="handleSubmit"
            :disabled="!canGenerate"
            class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {{ t('faceSwap.startGenerate') }}
          </button>
        </div>

        <!-- 源图片预览弹窗 -->
        <div v-if="sourceImagePreview" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div class="relative max-w-4xl w-full">
            <img :src="formData.sourceImage.url" class="w-full h-auto rounded-lg">
            <button
              @click="sourceImagePreview = false"
              class="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 目标图片预览弹窗 -->
        <div v-if="targetImagePreview" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div class="relative max-w-4xl w-full">
            <img :src="formData.targetImage.url" class="w-full h-auto rounded-lg">
            <button
              @click="targetImagePreview = false"
              class="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface ImageData {
  file: File | null
  url: string
}

interface FormData {
  sourceImage: ImageData
  targetImage: ImageData
}

const { t } = useI18n()

const router = useRouter()

const loading = ref(false)
const sourceImagePreview = ref(false)
const targetImagePreview = ref(false)

const formData = ref<FormData>({
  sourceImage: {
    file: null,
    url: ''
  },
  targetImage: {
    file: null,
    url: ''
  }
})

const handleSourceImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    formData.value.sourceImage = {
      file,
      url: URL.createObjectURL(file)
    }
  }
}

const handleTargetImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    formData.value.targetImage = {
      file,
      url: URL.createObjectURL(file)
    }
  }
}

const canGenerate = computed(() => {
  return formData.value.sourceImage.file && formData.value.targetImage.file
})

const handleSubmit = async () => {
  if (!canGenerate.value) return
  
  loading.value = true
  try {
    // TODO: 实现换脸逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
  } catch (error) {
    console.error('换脸失败:', error)
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