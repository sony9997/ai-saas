<template>
  <div class="relative bg-white">
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
        <div class="backdrop-blur-sm bg-white rounded-2xl p-6">
          <h1 class="text-3xl font-bold text-black mb-4">AI 换脸</h1>
          
          <div class="space-y-4">
            <!-- 第一排:预览区域 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 源图片预览 -->
              <div 
                class="border border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[300px]"
                @click="showImagePreview(sourceImagePreview)"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <img
                    v-if="sourceImagePreview"
                    :src="sourceImagePreview"
                    alt="源图片"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-black">
                    源图片预览区域
                  </div>
                </div>
              </div>

              <!-- 目标图片预览 -->
              <div 
                class="border border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[300px]"
                @click="showImagePreview(targetImagePreview)"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <img
                    v-if="targetImagePreview"
                    :src="targetImagePreview"
                    alt="目标图片"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-black">
                    目标图片预览区域
                  </div>
                </div>
              </div>
            </div>

            <!-- 第二排:上传按钮和生成结果 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 源图片上传 -->
              <div>
                <input
                  type="file"
                  ref="sourceImageInput"
                  class="hidden"
                  accept="image/*"
                  @change="handleSourceImageUpload"
                />
                <button
                  @click="$refs.sourceImageInput.click()"
                  class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  上传源图片
                </button>
              </div>

              <!-- 目标图片上传 -->
              <div>
                <input
                  type="file"
                  ref="targetImageInput"
                  class="hidden"
                  accept="image/*"
                  @change="handleTargetImageUpload"
                />
                <button
                  @click="$refs.targetImageInput.click()"
                  class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  上传目标图片
                </button>
              </div>
            </div>

            <!-- 生成按钮 -->
            <div class="flex justify-center">
              <button
                @click="generateImage"
                class="py-2 px-8 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!canGenerate || loading"
              >
                {{ loading ? '生成中...' : '开始生成' }}
              </button>
            </div>

            <!-- 生成结果预览 -->
            <div 
              v-if="generatedImage"
              class="border border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[300px]"
              @click="showImagePreview(generatedImage)"
            >
              <img
                :src="generatedImage"
                alt="生成结果"
                class="w-full h-full object-contain"
              />
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
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()
const sourceImageInput = ref<HTMLInputElement | null>(null)
const targetImageInput = ref<HTMLInputElement | null>(null)
const sourceImagePreview = ref<string>('')
const targetImagePreview = ref<string>('')
const generatedImage = ref<string>('')
const previewImage = ref<string>('')
const loading = ref(false)

// 计算是否可以生成图片
const canGenerate = computed(() => {
  return sourceImagePreview.value && targetImagePreview.value && !loading.value
})

// 处理源图片上传
const handleSourceImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      sourceImagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(input.files[0])
  }
}

// 处理目标图片上传
const handleTargetImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      targetImagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(input.files[0])
  }
}

// 显示图片预览
const showImagePreview = (image: string) => {
  if (image) {
    previewImage.value = image
  }
}

// 关闭图片预览
const closeImagePreview = () => {
  previewImage.value = ''
}

// 生成图片
const generateImage = async () => {
  if (!canGenerate.value) return

  loading.value = true
  try {
    // TODO: 调用换脸API
    // 这里需要添加实际的API调用逻辑
    await new Promise(resolve => setTimeout(resolve, 2000)) // 模拟API调用
    generatedImage.value = sourceImagePreview.value // 临时使用源图片作为结果
  } catch (error) {
    console.error('生成失败:', error)
    alert('生成失败,请重试')
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