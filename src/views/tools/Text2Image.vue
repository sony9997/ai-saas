<template>
  <div class="relative h-screen bg-dark-800">
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
                <label class="block text-sm font-medium text-gray-900 mb-2">基础模型</label>
                <select 
                  v-model="formData.baseModel"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="墨幽的姐姐——墨幽岚_v1">墨幽的姐姐——墨幽岚_v1.safetensors</option>
                  <option value="beautifulRealistic_v7">beautifulRealistic_v7.safetensors</option>
                  <option value="majicmixFantasy_v30Vae">majicmixFantasy_v30Vae.safetensors</option>
                </select>
              </div>

              <!-- LORA模型设置 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">LORA模型名称</label>
                <select 
                  v-model="formData.loraModel"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="F.1-宫崎骏风格_v1.0.safetensors">F.1-宫崎骏风格_v1.0.safetensors</option>
                  <option value="glass-girl.safetensors">glass-girl.safetensors</option>
                  <option value="mangheXL.safetensors">mangheXL.safetensors</option>
                  <option value="MengX girl_Mix_V40.safetensors">MengX girl_Mix_V40.safetensors</option>
                  <option value="pixel_f2.safetensors">pixel_f2.safetensors</option>
                  <option value="SDXL_动漫Samaritan 3d Cartoon.safetensors">SDXL_动漫Samaritan 3d Cartoon.safetensors</option>
                  <option value="ReminiClay黏土风_SDXLV1.0.safetensors">ReminiClay黏土风_SDXLV1.0.safetensors</option>
                  <option value="xlabsgirlf1.safetensors">xlabsgirlf1.safetensors</option>
                </select>
              </div>

              <!-- Strength设置 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Strength</label>
                <input
                  v-model="formData.strength"
                  type="number"
                  min="0.1"
                  max="1"
                  step="1.0"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Steps设置 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Steps</label>
                <input
                  v-model="formData.steps"
                  type="number"
                  min="15"
                  value="30"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- 图片尺寸设置 -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">宽度</label>
                  <input
                    v-model="formData.width"
                    type="number"
                    min="64"
                    step="64"
                    class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">高度</label>
                  <input
                    v-model="formData.height"
                    type="number"
                    min="64"
                    step="64"
                    class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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

            <!-- 图片预览区域 -->
            <div class="flex items-center justify-center border-2 border-dashed border-dark-500 rounded-lg min-h-[360px]">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()

// 表单数据
const formData = ref({
  prompt: '',
  baseModel: 'beautifulRealistic_v7',
  loraModel: '',
  strength: 1.0,
  steps: 30,
  width: 720,
  height: 1024
})

// 状态管理
const loading = ref(false)
const generatedImage = ref('')

// 生成图片
const generateImage = async () => {
  loading.value = true
  try {
    const response = await fetch('http://218.76.9.139:8535/v1/workflows/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: {
          action: 'txt2img',
          prompt: formData.value.prompt,
          images: []
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