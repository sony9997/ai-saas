<template>
  <div class="relative bg-dark-800">
    <PageLayout>
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
        <div class="backdrop-blur-sm bg-white/10 dark:bg-dark-700/70 rounded-2xl p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">文本生成图像</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- 表单区域 -->
            <div class="space-y-4">
              <!-- 提示词输入 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">提示词描述</label>
                <textarea
                  v-model="formData.prompt"
                  rows="4"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-600 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入详细的图片描述..."
                />
              </div>

              <!-- 基础模型选择 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">风格选择</label>
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

              <!-- 生成按钮 -->
              <button
                @click="generateImage"
                :disabled="loading"
                class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {{ loading ? '生成中...' : '生成图片' }}
              </button>
            </div>

            <!-- 图片预览区域 -->
            <div 
              class="flex items-center justify-center border-2 border-dashed border-dark-500 rounded-lg min-h-[360px] cursor-pointer" 
              @click="generatedImage && showImagePreview(generatedImage)"
              :class="{ 'hover:cursor-pointer': generatedImage }"
            >
              <div v-if="loading" class="text-gray-900">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
                <p>正在生成图片...</p>
              </div>
              <img
                v-else-if="generatedImage"
                :src="generatedImage"
                alt="生成的图片"
                class="max-w-full max-h-[600px] rounded-lg"
              />
              <div v-else class="text-gray-900">
                图片预览区域
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()

// 表单数据
const formData = ref({
  prompt: '',
  baseModel: '美丽的现实主义',
  loraModel: '',
  strength: 1.0,
  steps: 30,
  width: 720,
  height: 1024
})

// 状态管理
const loading = ref(false)
const generatedImage = ref('')

// 新增的图片预览功能
const previewImage = ref('')

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

// 生成图片
const generateImage = async () => {
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
          prompt: formData.value.prompt,
          baseModel: formData.value.baseModel,
        },
        response_mode: 'blocking',
        user: 'hed-1'
      })
    })

    const data = await response.json()
    const imageUrl = data?.data?.outputs?.output?.[0]?.url
    if (!imageUrl) {
      throw new Error('生成的图片URL无效')
    }
    generatedImage.value = imageUrl
  } catch (error) {
    console.error('生成图片失败:', error)
    // 这里可以添加错误提示
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