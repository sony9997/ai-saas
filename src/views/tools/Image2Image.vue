<template>
  <div class="relative h-screen bg-dark-800">
    <PageLayout>
      <!-- 调整返回按钮位置 -->
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
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">图像生成图像</h1>
          
          <div class="space-y-4">
            <!-- 第一排:预览区域 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 参考图片预览 -->
              <div 
                class="border border-dashed border-gray-300 dark:border-dark-500 rounded-lg overflow-hidden cursor-pointer h-[400px]"
                @click="showImagePreview(inputImagePreview)"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <img
                    v-if="inputImagePreview"
                    :src="inputImagePreview"
                    alt="输入参考图片"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-gray-900 dark:text-gray-100">
                    参考图片预览区域
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

            <!-- 第二排:输入图片和风格选择 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 输入图片上传区域 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">输入参考图片</label>
                <div class="space-y-2">
                  <div class="relative">
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleImageUpload"
                      class="hidden"
                      ref="fileInput"
                    />
                    <button 
                      @click="$refs.fileInput.click()"
                      class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                      </svg>
                      选择图片
                    </button>
                  </div>
                  <div class="text-center text-gray-900 dark:text-gray-100">或</div>
                  <input
                    v-model="formData.image.url"
                    type="text"
                    placeholder="输入图片URL..."
                    class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- 风格选择 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">风格选择</label>
                <select 
                  v-model="formData.baseModel"
                  class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="墨幽岚">墨幽岚</option>
                  <option value="美丽的现实主义">美丽的现实主义</option>
                  <option value="麦橘写实">麦橘写实</option>
                  <option value="国风">国风</option>
                  <option value="墨幽二次元">墨幽二次元</option>
                  <option value="麦橘幻想">麦橘幻想</option>
                </select>
              </div>
            </div>

            <!-- 第三排:提示词 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 正向提示词 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">正向提示词</label>
                <textarea
                  v-model="formData.prompt"
                  rows="4"
                  class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入正向提示词..."
                />
              </div>

              <!-- 反向提示词 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">反向提示词</label>
                <textarea
                  v-model="formData.negative_prompt"
                  rows="4"
                  class="w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入反向提示词..."
                />
              </div>
            </div>

            <!-- 第四排:生成按钮 -->
            <div>
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
            alt="预览图片"
            class="max-w-full max-h-[90vh] object-contain"
            @click.stop
          />
          <button 
            class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            @click="closeImagePreview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()

// 表单数据
const formData = ref({
  prompt: '1girl',
  baseModel: '麦橘写实',
  negative_prompt: '',
  image:{
    transfer_method: 'local_file',
    type: 'image',
    upload_file_id: '',
    url: ''
  }
})

// 状态管理
const loading = ref(false)
const inputImagePreview = ref('')
const generatedImage = ref('')
const user='hed-1'

// 添加图片预览相关的状态
const previewImage = ref('')
const fileInput = ref<HTMLInputElement>()

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

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // 本地预览
  const reader = new FileReader()
  reader.onload = (e) => {
    inputImagePreview.value = e.target?.result as string
    formData.value.image.url = '' // 清空URL输入
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

    // 保存上传后的文件ID到formData.image中
    formData.value.image.upload_file_id = data.id
    formData.value.image.transfer_method = 'local_file'
  } catch (error) {
    console.error('上传图片失败:', error)
    alert('上传图片失败,请重试')
  }
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
    alert('请先上传图片或输入图片URL')
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
    alert('生成图片失败,请重试')
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