<template>
  <div class="relative bg-dark-800">
    <PageLayout>
      <!-- 调整返回按钮位置 -->
      <div class="absolute top-0 left-4">
        <button 
          class="p-3 text-gray-100 dark:text-gray-200 bg-gray-700/80 dark:bg-dark-600/80 rounded-lg hover:bg-gray-600/90 dark:hover:bg-dark-500/90 transition-all duration-200 shadow-lg backdrop-blur-sm"
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
      </div>

      <div class="container mx-auto px-4 py-6">
        <div class=" bg-white/10 dark:bg-dark-700/70 rounded-2xl p-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ t('imageToImage.title') }}</h1>
          
          <div class="space-y-4">
            <!-- 图片上传和预览 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 参考图片上传区域 -->
              <div 
                class="relative w-full h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden cursor-pointer"
                :class="{ 'bg-blue-50 dark:bg-blue-900/20': isDragging }"
                @click="handlePreviewAreaClick"
                @dragenter.prevent="handleDragEnter"
                @dragleave.prevent="handleDragLeave"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <!-- 无图片时的提示 -->
                <div v-if="!inputImagePreview" class="absolute inset-0 flex flex-col items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ t('imageToImage.dragDrop') }}</p>
                </div>

                <!-- 预览图片 -->
                <div v-else class="relative w-full h-full">
                  <img 
                    :src="inputImagePreview" 
                    class="w-full h-full object-contain"
                    :alt="t('imageToImage.previewImage')"
                  />
                  
                  <!-- 上传loading动画 -->
                  <div 
                    v-if="isUploading"
                    class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  >
                    <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>

                  <!-- 删除按钮 -->
                  <button
                    v-if="!isUploading"
                    @click.stop="clearImage"
                    class="absolute top-2 right-2 p-1 bg-gray-800/70 hover:bg-gray-700/80 text-white rounded-full transition-colors"
                    :title="t('common.delete')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- 生成图片预览 -->
              <div 
                class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[400px]"
                @click="generatedImage && showImagePreview(generatedImage)"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <div v-if="loading" class="text-gray-900 dark:text-gray-100">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
                    <p>{{ t('common.loading') }}</p>
                  </div>
                  <img
                    v-else-if="generatedImage"
                    :src="generatedImage"
                    :alt="t('imageToImage.generatedImage')"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-center text-gray-900 dark:text-gray-100">
                    {{ t('imageToImage.previewArea') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 第二排:输入图片和风格选择 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 风格选择 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{{ t('imageToImage.style') }}</label>
                <select 
                  v-model="formData.baseModel"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="墨幽岚">墨幽岚</option>
                  <option value="美丽的现实主义">美丽的现实主义</option>
                  <option value="麦橘写实">麦橘写实</option>
                  <option value="国风">国风</option>
                  <option value="墨幽二次元">墨幽二次元</option>
                  <option value="麦橘幻想">麦橘幻想</option>
                </select>
              </div>

              <!-- 效果强度 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{{ t('imageToImage.strength') }}</label>
                <input
                  type="range"
                  v-model="formData.strength"
                  min="0"
                  max="1"
                  step="0.1"
                  class="w-full"
                />
                <div class="text-sm text-gray-500 mt-1">{{ formData.strength }}</div>
              </div>
            </div>

            <!-- 第三排:提示词 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 正向提示词 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{{ t('imageToImage.prompt') }}</label>
                <textarea
                  v-model="formData.prompt"
                  rows="4"
                  class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('imageToImage.promptPlaceholder')"
                />
              </div>

              <!-- 反向提示词 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{{ t('imageToImage.negativePrompt') }}</label>
                <textarea
                  v-model="formData.negative_prompt"
                  rows="4"
                  class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('imageToImage.negativePromptPlaceholder')"
                />
              </div>
            </div>

            <!-- 第四排:生成按钮 -->
            <div>
              <button
                @click="generateImage"
                :disabled="loading || !inputImagePreview"
                class="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {{ loading ? t('common.loading') : t('imageToImage.convert') }}
              </button>
            </div>
          </div>
        </div>
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
            :alt="t('imageToImage.generatedImage')"
            class="max-w-full max-h-[90vh] object-contain"
            @click.stop
          />
          <button 
            class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            @click="closeImagePreview"
            :title="t('common.close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 图片上传对话框 -->
      <div v-if="showUploadDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-96" @click.stop>
          <h3 class="text-lg font-semibold mb-4">{{ t('imageToImage.uploadImage') }}</h3>
          
          <!-- 本地上传选项 -->
          <div 
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 cursor-pointer hover:border-blue-500"
            @click="triggerFileInput"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <p class="mt-2">{{ t('imageToImage.uploadFromLocal') }}</p>
            </div>
          </div>

          <!-- URL输入选项 -->
          <div class="mb-4">
            <input 
              type="text" 
              v-model="imageUrl"
              :placeholder="t('common.imageUrlPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <!-- 按钮组 -->
          <div class="flex justify-end space-x-2">
            <button 
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              @click="closeUploadDialog"
              :title="t('common.cancel')"
            >
              {{ t('common.cancel') }}
            </button>
            <button 
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              @click="confirmImageUpload"
              :disabled="!imageUrl"
              :title="t('common.confirm')"
            >
              {{ t('common.confirm') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 隐藏的文件输入 -->
      <input 
        type="file"
        ref="fileInput"
        class="hidden"
        accept="image/*"
        @change="handleFileUpload"
      >
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()
const { t } = useI18n()

interface FormData {
  prompt: string
  baseModel: string
  negative_prompt: string
  strength: number
  image: {
    transfer_method: string
    type: string
    upload_file_id: string
    url: string
  }
}

const formData = ref<FormData>({
  prompt: '1girl',
  baseModel: '麦橘写实',
  negative_prompt: '',
  strength: 0.75,
  image:{
    transfer_method: 'local_file',
    type: 'image',
    upload_file_id: '',
    url: ''
  }
})

// 状态管理
const loading = ref(false)
const isDragging = ref(false)
const inputImagePreview = ref('')
const generatedImage = ref('')
const user = 'hed-1'
const showUploadDialog = ref(false)
const imageUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref('')
const isUploading = ref(false)

// 处理预览区域点击
const handlePreviewAreaClick = () => {
  if (inputImagePreview.value) {
    showImagePreview(inputImagePreview.value)
  } else {
    showUploadDialog.value = true
  }
}

// 处理拖放事件
const handleDragEnter = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    await handleImageFile(file)
  }
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件上传
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    closeUploadDialog() // 立即关闭上传对话框
    await handleImageFile(input.files[0])
  }
  input.value = '' // 重置input
}

// 处理图片文件
const handleImageFile = async (file: File) => {
  // 验证文件类型和大小
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    alert(t('errors.invalidImageType'))
    return
  }

  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    alert(t('errors.imageTooLarge'))
    return
  }

  // 先显示预览
  inputImagePreview.value = URL.createObjectURL(file)
  formData.value.image.url = '' // 清空URL输入
  
  // 开始上传,显示loading动画
  isUploading.value = true
  
  try {
    const bodyData = new FormData()
    bodyData.append('file', file)
    bodyData.append('user', user)

    const response = await fetch(import.meta.env.VITE_DIFY_API_URL+'/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`
      },
      body: bodyData
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || '上传失败')
    }

    formData.value.image.upload_file_id = data.id
    formData.value.image.transfer_method = 'local_file'
  } catch (error) {
    console.error('上传图片失败:', error)
    alert('上传图片失败,请重试')
    inputImagePreview.value = '' // 清除预览
  } finally {
    isUploading.value = false
  }
}

// 确认图片上传
const confirmImageUpload = () => {
  if (imageUrl.value) {
    inputImagePreview.value = imageUrl.value
    formData.value.image.url = imageUrl.value
    formData.value.image.transfer_method = 'remote_url'
    closeUploadDialog()
  }
}

// 关闭上传对话框
const closeUploadDialog = () => {
  showUploadDialog.value = false
  imageUrl.value = ''
}

// 清除图片
const clearImage = () => {
  inputImagePreview.value = ''
  formData.value.image.url = ''
  formData.value.image.upload_file_id = ''
  formData.value.image.transfer_method = ''
}

// 显示图片预览
const showImagePreview = (imageUrl: string) => {
  if (imageUrl) {
    previewImage.value = imageUrl
  }
}

// 关闭图片预览
const closeImagePreview = () => {
  previewImage.value = ''
}

// 监听URL输入变化
watch(() => formData.value.image.url, (newUrl) => {
  if (newUrl) {
    inputImagePreview.value = newUrl
    formData.value.image.url = newUrl
    formData.value.image.transfer_method = 'remote_url'
  }
})

// 生成图片
const generateImage = async () => {
  if (!inputImagePreview.value) {
    alert(t('errors.noImage'))
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
          action: 'img2img',
          baseModel: formData.value.baseModel,
          prompt: formData.value.prompt,
          negative_prompt: formData.value.negative_prompt,
          strength: formData.value.strength,
          images: [formData.value.image]
        },
        response_mode: 'blocking',
        user: user
      })
    })

    const data = await response.json()
    console.log("data", data)
    const imageUrl = data?.data?.outputs?.output?.[0]?.url
    if (!imageUrl) {
      throw new Error('生成的图片URL无效')
    }
    generatedImage.value = imageUrl
  } catch (error) {
    console.error('生成图片失败:', error)
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

.border-dashed {
  transition: all 0.3s ease;
}

.border-dashed:hover {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.05);
}

/* 删除按钮的过渡动画 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>