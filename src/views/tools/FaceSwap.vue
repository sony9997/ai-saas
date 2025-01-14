<template>
  <div class="relative h-screen bg-dark-800">
    <PageLayout>
      <!-- 返回按钮 -->
      <div class="absolute top-0 left-4">
        <button 
          class="p-3 text-gray-100 dark:text-gray-200 bg-gray-700/80 dark:bg-dark-600/80 rounded-lg hover:bg-gray-600/90 dark:hover:bg-dark-500/90 transition-all duration-200 shadow-lg backdrop-blur-sm"
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
      </div>

      <div class="container mx-auto px-4 py-6">
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">人脸替换</h1>
          
          <div class="space-y-4">
            <!-- 第一排：预览区域 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 源图片预览 -->
              <div 
                class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[400px]"
                @click="showImagePreview(sourceImagePreview)"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <img
                    v-if="sourceImagePreview"
                    :src="sourceImagePreview"
                    alt="源图片"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-gray-900 dark:text-gray-100">
                    源图片预览区域
                  </div>
                </div>
              </div>

              <!-- 生成图片预览 -->
              <div 
                class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[400px]"
                @click="showImagePreview(generatedImage)"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <div v-if="loading" class="text-gray-900 dark:text-gray-100">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
                    <p>正在生成图片...</p>
                  </div>
                  <img
                    v-else-if="generatedImage"
                    :src="generatedImage"
                    alt="生成的图片"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-gray-900 dark:text-gray-100">
                    生成图片预览区域
                  </div>
                </div>
              </div>
            </div>

            <!-- 第二排：图片上传区域 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 源图片上传 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">源图片</label>
                <div class="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    ref="sourceImageInput"
                    @change="handleSourceImageUpload"
                  />
                  <button
                    @click="triggerSourceImageUpload"
                    class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    选择图片
                  </button>
                  <input
                    v-model="formData.sourceImage.url"
                    type="text"
                    placeholder="输入图片URL..."
                    class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- 目标图片上传 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">目标图片</label>
                <div class="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    ref="targetImageInput"
                    @change="handleTargetImageUpload"
                  />
                  <button
                    @click="triggerTargetImageUpload"
                    class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    选择图片
                  </button>
                  <input
                    v-model="formData.targetImage.url"
                    type="text"
                    placeholder="输入图片URL..."
                    class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- 生成按钮 -->
            <button
              @click="generateImage"
              :disabled="loading"
              class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {{ loading ? '生成中...' : '生成图片' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 图片预览Modal -->
      <div 
        v-if="previewImage"
        class="fixed inset-0 bg-black/80 dark:bg-black/90 z-50 flex items-center justify-center p-4"
        @click="closeImagePreview"
      >
        <img 
          :src="previewImage" 
          alt="预览图片"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()

// 表单数据
const formData = ref({
  sourceImage: {
    transfer_method: 'local_file',
    type: 'image',
    upload_file_id: '',
    url: ''
  },
  targetImage: {
    transfer_method: 'local_file', 
    type: 'image',
    upload_file_id: '',
    url: ''
  }
})

// 状态管理
const loading = ref(false)
const sourceImagePreview = ref('')
const targetImagePreview = ref('')
const generatedImage = ref('')
const previewImage = ref('')
const sourceImageInput = ref<HTMLInputElement>()
const targetImageInput = ref<HTMLInputElement>()
const user = 'hed-1'

// 计算属性:判断是否可以生成
const canGenerate = computed(() => {
  return sourceImagePreview.value && targetImagePreview.value
})

// 处理源图片上传
const handleSourceImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // 本地预览
  const reader = new FileReader()
  reader.onload = (e) => {
    sourceImagePreview.value = e.target?.result as string
    formData.value.sourceImage.url = '' // 清空URL输入
  }
  reader.readAsDataURL(file)

  // 上传到服务器
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

    formData.value.sourceImage.upload_file_id = data.id
    formData.value.sourceImage.transfer_method = 'local_file'
  } catch (error) {
    console.error('上传图片失败:', error)
    alert('上传图片失败,请重试')
  }
}

// 处理目标图片上传
const handleTargetImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // 本地预览
  const reader = new FileReader()
  reader.onload = (e) => {
    targetImagePreview.value = e.target?.result as string
    formData.value.targetImage.url = '' // 清空URL输入
  }
  reader.readAsDataURL(file)

  // 上传到服务器
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

    formData.value.targetImage.upload_file_id = data.id
    formData.value.targetImage.transfer_method = 'local_file'
  } catch (error) {
    console.error('上传图片失败:', error)
    alert('上传图片失败,请重试')
  }
}

// 生成图片
const generateImage = async () => {
  if (!sourceImagePreview.value || !targetImagePreview.value) {
    alert('请先上传源图片和目标图片')
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
          action: 'switch_face',
          images: [formData.value.sourceImage, formData.value.targetImage]
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
    alert('生成图片失败,请重试')
  } finally {
    loading.value = false
  }
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

// 监听源图片URL变化
watch(() => formData.value.sourceImage.url, (newUrl) => {
  if (newUrl) {
    sourceImagePreview.value = newUrl
    formData.value.sourceImage.transfer_method = 'remote_url'
    formData.value.sourceImage.upload_file_id = '' // 清空file_id
  }
})

// 监听目标图片URL变化
watch(() => formData.value.targetImage.url, (newUrl) => {
  if (newUrl) {
    targetImagePreview.value = newUrl
    formData.value.targetImage.transfer_method = 'remote_url'
    formData.value.targetImage.upload_file_id = '' // 清空file_id
  }
})

</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 添加过渡动画 */
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