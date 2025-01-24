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
          <div>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                {{ t('faceSwap.sourceImage') }}
            </p>
          <div 
            class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[400px] relative"
            :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': isDraggingSource }"
            @click="handleImageClick('source')"
            @dragenter.prevent="() => handleDragEnter('source')"
            @dragleave.prevent="() => handleDragLeave('source')"
            @dragover.prevent
            @drop.prevent="(e) => handleDrop(e, 'source')"
          >
            <div class="w-full h-full flex items-center justify-center">
              <template v-if="formData.sourceImage.url">
                <img
                  :src="formData.sourceImage.url"
                  :alt="t('faceSwap.sourceImage')"
                  class="w-full h-full object-contain"
                />
                <!-- 添加 loading 动画 -->
                <div v-if="isUploading.source" class="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <!-- 删除按钮 -->
                <button 
                  class="absolute top-2 right-2 p-1.5 bg-gray-800/70 dark:bg-dark-600/70 hover:bg-gray-900/70 dark:hover:bg-dark-500/70 rounded-full text-white transition-all duration-200"
                  @click.stop="clearImage('source')"
                  :title="t('common.delete')"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
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
              </template>
              <div v-else class="text-center text-gray-900 dark:text-gray-100">
                <p>{{ t('faceSwap.dragDrop') }}</p>
              </div>
            </div>
          </div>
          </div>

          <!-- 目标图片上传 -->
          <div>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                {{ t('faceSwap.targetImage') }}
            </p>
            <div 
              class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[400px] relative"
              :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': isDraggingTarget }"
              @click="handleImageClick('target')"
              @dragenter.prevent="() => handleDragEnter('target')"
              @dragleave.prevent="() => handleDragLeave('target')"
              @dragover.prevent
              @drop.prevent="(e) => handleDrop(e, 'target')"
            >
              
              <div class="w-full h-full flex items-center justify-center">
                <template v-if="formData.targetImage.url">
                  <img
                    :src="formData.targetImage.url"
                    :alt="t('faceSwap.targetImage')"
                    class="w-full h-full object-contain"
                  />
                  <!-- 添加 loading 动画 -->
                  <div v-if="isUploading.target" class="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <!-- 删除按钮 -->
                  <button 
                    class="absolute top-2 right-2 p-1.5 bg-gray-800/70 dark:bg-dark-600/70 hover:bg-gray-900/70 dark:hover:bg-dark-500/70 rounded-full text-white transition-all duration-200"
                    @click.stop="clearImage('target')"
                    :title="t('common.delete')"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
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
                </template>
                <div v-else class="text-center text-gray-900 dark:text-gray-100">
                  <p>{{ t('faceSwap.dragDrop') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 生成按钮 -->
        <div class="flex justify-center">
          <button
            @click="handleSubmit"
            :disabled="!canGenerate"
            class="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {{ t('faceSwap.startGenerate') }}
          </button>
        </div>

        <!-- 生成结果区域 -->
        <div v-if="loading || generatedImage" class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            {{ t('faceSwap.generatedResult') }}
          </h3>
          
          <div 
            class="relative w-full h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
          >
            <!-- 加载状态 -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            
            <!-- 生成的图片 -->
            <div 
              v-else-if="generatedImage" 
              class="relative w-full h-full cursor-pointer"
              @click="showImagePreview(generatedImage)"
            >
              <img 
                :src="generatedImage" 
                class="w-full h-full object-contain"
                alt="Generated Image"
              />
            </div>
          </div>
        </div>

        <!-- 源图片预览弹窗 -->
        <div v-if="previewImage" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div class="relative max-w-[90vw] max-h-[90vh] w-full flex items-center justify-center">
            <img :src="previewImage" class="max-w-full max-h-[85vh] object-contain rounded-lg">
            <button
              @click="closeImagePreview"
              class="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none z-50"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 添加图片上传对话框 -->
        <div v-if="showUploadDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-96" @click.stop>
            <h3 class="text-lg font-semibold mb-4">{{ t('faceSwap.uploadImage') }}</h3>
            
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

            <div class="mb-4">
              <input 
                type="text" 
                v-model="imageUrl"
                :placeholder="t('common.imageUrlPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div class="flex justify-end space-x-2">
              <button 
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                @click="closeUploadDialog"
              >
                {{ t('common.cancel') }}
              </button>
              <button 
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                @click="confirmImageUpload"
                :disabled="!imageUrl"
              >
                {{ t('common.confirm') }}
              </button>
            </div>
          </div>
        </div>

        <!-- 添加隐藏的文件input -->
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/*"
          @change="handleFileChange"
        />
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface ImageData {
  transfer_method: 'local_file' | 'remote_url',
  type: 'image',
  file: File | null
  url: string
  upload_file_id: string
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
const showUploadDialog = ref(false)
const imageUrl = ref('')
const currentUploadType = ref<'source' | 'target'>('source')
const isDraggingSource = ref(false)
const isDraggingTarget = ref(false)

const formData = ref<FormData>({
  sourceImage: {
    transfer_method: 'local_file',
    type: 'image',
    file: null,
    url: '',
    upload_file_id: ''
  },
  targetImage: {
    transfer_method: 'local_file',
    type: 'image',
    file: null,
    url: '',
    upload_file_id: ''
  }
})

const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref('')

// 添加 isUploading 状态
const isUploading = ref({
  source: false,
  target: false
})

// 添加 generatedImage ref
const generatedImage = ref('')

const handlePreviewAreaClick = (type: 'source' | 'target') => {
  currentUploadType.value = type
  showUploadDialog.value = true
}

const handleDragEnter = (type: 'source' | 'target') => {
  if (type === 'source') isDraggingSource.value = true
  else isDraggingTarget.value = true
}

const handleDragLeave = (type: 'source' | 'target') => {
  if (type === 'source') isDraggingSource.value = false
  else isDraggingTarget.value = false
}

const handleDrop = async (event: DragEvent, type: 'source' | 'target') => {
  if (type === 'source') isDraggingSource.value = false
  else isDraggingTarget.value = false
  
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    await handleImageFile(file, type)
  }
}

const handleImageFile = async (file: File, type: 'source' | 'target') => {
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

  // 先显示预览图
  if (type === 'source') {
    formData.value.sourceImage = {
      transfer_method: 'local_file',
      type: 'image',
      file,
      url: URL.createObjectURL(file),
      upload_file_id: ''
    }
  } else {
    formData.value.targetImage = {
      transfer_method: 'local_file',
      type: 'image',
      file,
      url: URL.createObjectURL(file),
      upload_file_id: ''
    }
  }

  // 设置上传状态
  isUploading.value[type] = true

  try {
    const bodyData = new FormData()
    bodyData.append('file', file)
    bodyData.append('user', 'hed-1')

    const response = await fetch(`${import.meta.env.VITE_DIFY_API_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`
      },
      body: bodyData
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()

    // 更新 upload_file_id
    if (type === 'source') {
      formData.value.sourceImage.upload_file_id = data.id
    } else {
      formData.value.targetImage.upload_file_id = data.id
    }
  } catch (error) {
    console.error('上传图片失败:', error)
    alert(t('errors.uploadFailed'))
    // 上传失败时清除预览
    if (type === 'source') {
      formData.value.sourceImage = {
        transfer_method: 'local_file',
        type: 'image',
        file: null,
        url: '',
        upload_file_id: ''
      }
    } else {
      formData.value.targetImage = {
        transfer_method: 'local_file',
        type: 'image',
        file: null,
        url: '',
        upload_file_id: ''
      }
    }
  } finally {
    isUploading.value[type] = false
  }
}

const confirmImageUpload = () => {
  if (imageUrl.value) {
    if (currentUploadType.value === 'source') {
      formData.value.sourceImage = {
        transfer_method: 'remote_url',
        type: 'image',
        file: null,
        url: imageUrl.value,
        upload_file_id: ''
      }
    } else {
      formData.value.targetImage = {
        transfer_method: 'remote_url',
        type: 'image',
        file: null,
        url: imageUrl.value,
        upload_file_id: ''
      }
    }
    closeUploadDialog()
  }
}

const closeUploadDialog = () => {
  showUploadDialog.value = false
  imageUrl.value = ''
}

const canGenerate = computed(() => {
  const sourceValid = formData.value.sourceImage.upload_file_id || formData.value.sourceImage.url
  const targetValid = formData.value.targetImage.upload_file_id || formData.value.targetImage.url
  return sourceValid && targetValid
})

const handleSubmit = async () => {
  if (!canGenerate.value) return
  
  loading.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_DIFY_API_URL}/workflows/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`
      },
      body: JSON.stringify({
        inputs: {
          action: 'switch_face',
          images: [formData.value.sourceImage, formData.value.targetImage]
        },
        response_mode: 'blocking',
        user: 'hed-1'
      })
    })

    const data = await response.json()
    console.log("data", data)
    const imageUrl = data?.data?.outputs?.output?.[0]?.url
    if (!imageUrl) {
      throw new Error(t('errors.generatedImageInvalid'))
    }
    generatedImage.value = imageUrl
  } catch (error) {
    console.error('换脸失败:', error)
    alert(error)
  } finally {
    loading.value = false
  }
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择变化
const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    closeUploadDialog() // 立即关闭上传对话框
    await handleImageFile(file, currentUploadType.value)
  }
  input.value = ''
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

// 清除图片
const clearImage = (type: 'source' | 'target') => {
  if (type === 'source') {
    formData.value.sourceImage = {
      transfer_method: 'local_file',
      type: 'image',
      file: null,
      url: '',
      upload_file_id: ''
    }
  } else {
    formData.value.targetImage = {
      transfer_method: 'local_file',
      type: 'image',
      file: null,
      url: '',
      upload_file_id: ''
    }
  }
}

// 处理图片点击
const handleImageClick = (type: 'source' | 'target') => {
  const image = type === 'source' ? formData.value.sourceImage : formData.value.targetImage
  if (image.url) {
    showImagePreview(image.url)
  } else {
    currentUploadType.value = type
    showUploadDialog.value = true
  }
}

// 监听URL输入变化
watch(() => imageUrl.value, (newUrl) => {
  if (newUrl && currentUploadType.value) {
    if (currentUploadType.value === 'source') {
      formData.value.sourceImage = {
        transfer_method: 'local_file',
        type: 'image',
        file: null,
        url: newUrl,
        upload_file_id: ''
      }
    } else {
      formData.value.targetImage = {
        transfer_method: 'local_file',
        type: 'image',
        file: null,
        url: newUrl,
        upload_file_id: ''
      }
    }
  }
})
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

/* 添加进度条动画 */
.transition-all {
  transition: all 0.2s ease-out;
}
</style>