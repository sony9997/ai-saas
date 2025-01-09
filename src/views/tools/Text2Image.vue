<template>
  <div class="relative h-screen bg-dark-800">
    <PageLayout>
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
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入详细的图片描述..."
                />
              </div>

              <!-- 基础模型选择 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">基础模型</label>
                <select 
                  v-model="formData.baseModel"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="majicmixFantasy_v3OVae">majicmixFantasy_v3OVae</option>
                  <option value="majicmixRealistic_v7">majicmixRealistic_v7</option>
                </select>
              </div>

              <!-- LORA模型设置 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">LORA模型名称</label>
                <input
                  v-model="formData.loraModel"
                  type="text"
                  class="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入LORA模型名称"
                />
              </div>

              <!-- Strength设置 -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Strength</label>
                <input
                  v-model="formData.strength"
                  type="number"
                  min="0"
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
                  min="1"
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
import PageLayout from '@/components/layout/PageLayout.vue'

// 表单数据
const formData = ref({
  prompt: '',
  baseModel: 'majicmixFantasy_v3OVae',
  loraModel: '',
  strength: 0.5,
  steps: 20,
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
        'Authorization': 'Bearer app-ScnXmap00TaBi16pXayWKmJ8'
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