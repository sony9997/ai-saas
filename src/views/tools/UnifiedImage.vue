<!-- 统一图片生成 -->

<template>
  <div class="relative bg-dark-8s00">
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

      <div class="container mx-auto px-4 py-6">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-6 h-full">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ t('unifiedImage.title') }}</h1>
          <div class="text-gray-700 dark:text-gray-300 mb-6 space-y-3">
            <p>{{ t('unifiedImage.description') }}</p>
            <p></p>
            <p>
              {{ t('unifiedImage.modelDescription1') }}<code class="bg-gray-100 dark:bg-dark-600 px-1 rounded">&lt;img&gt;&lt;|image_*|&gt;&lt;/img&gt;</code>{{ t('unifiedImage.modelDescription2') }}<code class="bg-gray-100 dark:bg-dark-600 px-1 rounded">&lt;|image_1|&gt;</code>{{ t('unifiedImage.modelDescription3') }}<code class="bg-gray-100 dark:bg-dark-600 px-1 rounded">&lt;|image_2|&gt;</code>）
              {{ t('unifiedImage.modelDescription4') }}
            </p>
            <p>
              {{ t('unifiedImage.example') }}<br>
              {{ t('unifiedImage.examplePrompt') }}="A woman holds a bouquet of flowers and faces the camera. The woman is <code class="bg-gray-100 dark:bg-dark-600 px-1 rounded">&lt;img&gt;&lt;|image_1|&gt;&lt;/img&gt;</code>."
            </p>
          </div>
          <div class="space-y-4">
            <!-- 图片上传网格 -->
            <div class="grid grid-cols-3 gap-6">
              <div v-for="(image, index) in images" :key="index">
                <!-- 图片预览/上传区域 -->
                <div 
                  class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[200px] relative"
                  :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': isDragging[index] }"
                  @click="handlePreviewAreaClick(index)"
                  @dragenter.prevent="handleDragEnter(index)"
                  @dragleave.prevent="handleDragLeave(index)"
                  @dragover.prevent
                  @drop.prevent="handleDrop($event, index)"
                >
                  <div class="w-full h-full flex items-center justify-center">
                    <template v-if="image.preview">
                      <img
                        :src="image.preview"
                        :alt="`Image ${index + 1}`"
                        class="w-full h-full object-contain"
                      />
                      <!-- 删除按钮 -->
                      <button 
                        class="absolute top-2 right-2 p-1.5 bg-gray-800/70 dark:bg-dark-600/70 hover:bg-gray-900/70 dark:hover:bg-dark-500/70 rounded-full text-white transition-all duration-200"
                        @click.stop="clearImage(index)"
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
                      <p>{{ t('unifiedImage.dragDrop') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 提示文本输入 -->
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                {{ t('unifiedImage.prompt') }}
              </label>
              <textarea
                v-model="promptText"
                rows="4"
                class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="t('unifiedImage.promptPlaceholder')"
              />
            </div>

            <!-- 生成按钮 -->
            <button
              @click="generateImage"
              :disabled="loading || !canGenerate"
              class="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {{ loading ? t('unifiedImage.generating') : t('unifiedImage.startGenerate') }}
            </button>

            <!-- 生成结果预览 -->
            <div 
              ref="outputImageRef"
              class="border border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[300px]"
              @click="showImagePreview(generatedImage)"
            >
              <div class="w-full h-full flex items-center justify-center">
                <div v-if="loading" class="text-gray-900 dark:text-gray-100">
                  <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
                  <p>{{ t('unifiedImage.generating') }}</p>
                </div>
                <img
                  v-else-if="generatedImage"
                  :src="generatedImage"
                  alt="生成的图片"
                  class="w-full h-full object-contain"
                  @load="scrollToOutput"
                />
                <div v-else-if="!loading" class="text-center text-gray-900 dark:text-gray-100">
                  {{ t('unifiedImage.outputPreview') }}
                </div>
              </div>
            </div>

            <!-- 参数控制区域 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 常规参数 -->
              <div v-for="param in numericParameters" :key="param.name" class="space-y-2">
                <div class="flex justify-between items-center">
                  <label class="text-black dark:text-white">{{param.label}}</label>
                  <input 
                    type="number" 
                    v-model="param.value"
                    class="w-20 px-2 py-1 border border-gray-300 rounded text-black dark:text-white"
                  >
                </div>
                <input 
                  type="range" 
                  v-model="param.value"
                  :min="param.min"
                  :max="param.max"
                  :step="param.step"
                  class="w-full"
                >
              </div>

              <!-- 种子参数 -->
              <div class="col-span-2 space-y-4 mt-4">
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label class="text-black dark:text-white">{{ t('unifiedImage.seed') }}</label>
                    <div class="flex items-center space-x-2">
                      <input 
                        type="number" 
                        v-model="seed"
                        :disabled="randomizeSeed"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-black dark:text-white"
                      >
                      <button 
                        @click="refreshSeed"
                        class="p-1 text-gray-600 hover:text-gray-800"
                        :disabled="randomizeSeed"
                      >
                        <i class="fas fa-sync-alt"></i>
                      </button>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    v-model="seed"
                    :disabled="randomizeSeed"
                    min="0"
                    max="2147483647"
                    step="1"
                    class="w-full"
                  >
                  <div class="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox"
                      v-model="randomizeSeed"
                      class="w-4 h-4"
                    >
                    <label class="text-black dark:text-white">{{ t('unifiedImage.randomizeSeed') }}</label>
                  </div>
                </div>
              </div>

              <!-- 新增参数 -->
              <div class="col-span-2 space-y-6 mt-4">
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label class="text-black dark:text-white">{{ t('unifiedImage.maxInputImageSize') }}</label>
                    <input 
                      type="number" 
                      v-model="maxInputImageSize"
                      class="w-20 px-2 py-1 border border-gray-300 rounded text-black dark:text-white"
                    >
                  </div>
                  <input 
                    type="range" 
                    v-model="maxInputImageSize"
                    min="128"
                    max="2048"
                    step="64"
                    class="w-full"
                  >
                </div>

                <div class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      v-model="separateCfgInfer"
                      class="w-4 h-4"
                    >
                    <label class="text-black dark:text-white">{{ t('unifiedImage.separateCfgInfer') }}</label>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-300">{{ t('unifiedImage.separateCfgInferDescription') }}</p>

                  <div class="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      v-model="useInputSizeAsOutput"
                      class="w-4 h-4"
                    >
                    <label class="text-black dark:text-white">{{ t('unifiedImage.useInputSizeAsOutput') }}</label>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-300">{{ t('unifiedImage.useInputSizeAsOutputDescription') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 图片预览弹窗 -->
      <div
        v-if="previewImage"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        @click="closeImagePreview"
      >
        <img
          :src="previewImage"
          alt="预览图片"
          class="max-w-[90%] max-h-[90vh] object-contain"
        />
      </div>

      <!-- 上传对话框 -->
      <div v-if="showUploadDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-96" @click.stop>
          <h3 class="text-lg font-semibold mb-4">{{ t('unifiedImage.uploadDialogTitle') }}</h3>
          
          <!-- 本地上传选项 -->
          <div 
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 cursor-pointer hover:border-blue-500"
            @click="triggerFileInput"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <p class="mt-2">{{ t('unifiedImage.uploadFromLocal') }}</p>
            </div>
          </div>

          <!-- URL输入选项 -->
          <div class="mb-4">
            <input 
              type="text" 
              v-model="imageUrl"
              :placeholder="t('unifiedImage.uploadFromUrl')"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <!-- 按钮组 -->
          <div class="flex justify-end space-x-2">
            <button 
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              @click="closeUploadDialog"
            >
              {{ t('unifiedImage.cancel') }}
            </button>
            <button 
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              @click="confirmImageUpload"
              :disabled="!imageUrl"
            >
              {{ t('unifiedImage.confirm') }}
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
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'
import { Client } from "@gradio/client"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

// 状态管理
const loading = ref(false)
const promptText = ref('')
const previewImage = ref('')
const generatedImage = ref('')

// 图片数据
interface ImageData {
  preview: string
  url: string
  upload_file_id: string
  transfer_method: string
  file?: File // 使file成为可选属性
}

interface APIResponse {
  data: Array<{
    url: string
  }>
}

const images = ref<ImageData[]>([
  { preview: '', url: '', upload_file_id: '', transfer_method: 'local_file' },
  { preview: '', url: '', upload_file_id: '', transfer_method: 'local_file' },
  { preview: '', url: '', upload_file_id: '', transfer_method: 'local_file' }
])

// 参数配置
const numericParameters = computed(() => [
  { name: 'height', label: t('unifiedImage.height'), value: 1024, min: 128, max: 2048, step: 64 },
  { name: 'width', label: t('unifiedImage.width'), value: 1024, min: 128, max: 2048, step: 64 },
  { name: 'guidance_scale', label: t('unifiedImage.guidanceScale'), value: 2.5, min: 1, max: 5, step: 0.1 },
  { name: 'img_guidance_scale', label: t('unifiedImage.imgGuidanceScale'), value: 1.6, min: 1, max: 2, step: 0.1 },
  { name: 'inference_steps', label: t('unifiedImage.inferenceSteps'), value: 50, min: 1, max: 100, step: 1 }
])

// 新增参数
const maxInputImageSize = ref(1024)
const separateCfgInfer = ref(true)
const offloadModel = ref(false)
const useInputSizeAsOutput = ref(false)

// 种子相关状态
const seed = ref(52)
const randomizeSeed = ref(true)

// 刷新种子
const refreshSeed = () => {
  seed.value = Math.floor(Math.random() * 2147483648)
}

// 将图片转换为blob对象
async function getImageBlob(image: any) {
  if (!image.preview) return null
  
  if (image.transfer_method === 'local_file') {
    // 本地文件已经是File对象(继承自Blob)
    return image.file
  } else if (image.url) {
    // URL需要fetch获取blob
    try {
      const response = await fetch(image.url)
      return await response.blob()
    } catch (error) {
      console.error('Failed to fetch image:', error)
      return null
    }
  }
  return null
}

// 生成图片
async function generateImage() {
  if (!canGenerate.value || loading.value) return
  
  loading.value = true
  try {
    // 转换所有图片为blob
    const imageBlobs = await Promise.all(images.value.map(getImageBlob))
    
    // 连接到gradio客户端
    const client = await Client.connect(import.meta.env.VITE_GRADIO_SERVER_URL)
    
    // 准备参数
    const params = {
      text: promptText.value,
      img1: imageBlobs[0],
      img2: imageBlobs[1],
      img3: imageBlobs[2],
      height: numericParameters.value.find(p => p.name === 'height')?.value || 1024,
      width: numericParameters.value.find(p => p.name === 'width')?.value || 1024,
      guidance_scale: numericParameters.value.find(p => p.name === 'guidance_scale')?.value || 2.5,
      img_guidance_scale: numericParameters.value.find(p => p.name === 'img_guidance_scale')?.value || 1.6,
      inference_steps: numericParameters.value.find(p => p.name === 'inference_steps')?.value || 50,
      seed: randomizeSeed.value ? -1 : seed.value,
      separate_cfg_infer: separateCfgInfer.value,
      offload_model: offloadModel.value,
      use_input_image_size_as_output: useInputSizeAsOutput.value,
      max_input_image_size: maxInputImageSize.value,
      randomize_seed: randomizeSeed.value,
      save_images: false
    }
    
    // 调用API
    const result = await client.predict("/generate_image", params) as APIResponse
    
    // 添加调试信息
    console.log('Generated image result:', result)
    console.log('Result data type:', typeof result.data)
    console.log('Result data:', result.data)

    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      generatedImage.value = result.data[0].url
      console.log('Generated image URL:', generatedImage.value)
    } else {
      console.error('Unexpected image data format:', result.data)
    }
  } catch (error) {
    console.error('Failed to generate image:', error)
  } finally {
    loading.value = false
  }
}

// 计算是否可以生成
const canGenerate = computed(() => {
  return promptText.value.trim() !== ''
})

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

// 监听URL变化
for (let i = 0; i < images.value.length; i++) {
  watch(() => images.value[i].url, (newUrl) => {
    if (newUrl) {
      images.value[i].preview = newUrl
      images.value[i].transfer_method = 'remote_url'
      images.value[i].upload_file_id = ''
    }
  })
}

// 拖放状态
const isDragging = ref(Array(3).fill(false))
const currentUploadIndex = ref(-1)
const showUploadDialog = ref(false)
const imageUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

// 处理预览区域点击
const handlePreviewAreaClick = (index: number) => {
  if (images.value[index].preview) {
    showImagePreview(images.value[index].preview)
  } else {
    currentUploadIndex.value = index
    showUploadDialog.value = true
  }
}

// 处理拖放事件
const handleDragEnter = (index: number) => {
  isDragging.value[index] = true
}

const handleDragLeave = (index: number) => {
  isDragging.value[index] = false
}

const handleDrop = async (event: DragEvent, index: number) => {
  isDragging.value[index] = false
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    await handleImageFile(file, index)
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
    await handleImageFile(input.files[0], currentUploadIndex.value)
    closeUploadDialog()
  }
}

// 处理图片文件
const handleImageFile = async (file: File, index: number) => {
  images.value[index] = {
    preview: URL.createObjectURL(file),
    url: '',
    upload_file_id: '',
    transfer_method: 'local_file',
    file
  }
}

// 确认图片上传
const confirmImageUpload = () => {
  if (imageUrl.value && currentUploadIndex.value !== -1) {
    images.value[currentUploadIndex.value] = {
      preview: imageUrl.value,
      url: imageUrl.value,
      upload_file_id: '',
      transfer_method: 'remote_url'
    }
    closeUploadDialog()
  }
}

// 关闭上传对话框
const closeUploadDialog = () => {
  showUploadDialog.value = false
  imageUrl.value = ''
  currentUploadIndex.value = -1
}

// 清除图片
const clearImage = (index: number) => {
  images.value[index] = {
    preview: '',
    url: '',
    upload_file_id: '',
    transfer_method: ''
  }
}

// 添加ref
const outputImageRef = ref<HTMLElement | null>(null)

// 滚动到输出图片
const scrollToOutput = () => {
  if (outputImageRef.value) {
    outputImageRef.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    })
  }
}
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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
</style>