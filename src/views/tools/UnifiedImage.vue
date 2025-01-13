<!-- 统一图片生成 -->

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
          <h1 class="text-3xl font-bold text-black mb-4">统一图片生成</h1>
          
          <div class="text-gray-700 mb-6 space-y-3">
            <p>
              本模块是基于OmniGen模型开发的，OmniGen是一个统一的图像生成模型，可用于执行各种任务，包括但不限于文本到图像生成、主题驱动生成、身份保留生成和图像条件生成。
            </p>
            <p>
              对于多模式图像生成，您应该将字符串作为提示传递，将图像路径列表作为input_images传递。提示中的占位符应采用<code class="bg-gray-100 px-1 rounded">&lt;img&gt;&lt;|image_*|&gt;&lt;/img&gt;</code>的格式（对于第一幅图像，占位符为<code class="bg-gray-100 px-1 rounded">&lt;|image_1|&gt;</code>。对于第二幅图像，占位为<code class="bg-gray-100 px-1 rounded">&lt;|image_2|&gt;</code>）。
            </p>
            <p>
              例如，使用一个女人的图像来生成一个新的图像：<br>
              提示="一个女人拿着一束花面对着相机。这个女人是<code class="bg-gray-100 px-1 rounded">&lt;img&gt;&lt;|image_1|&gt;&lt;/img&gt;</code>。"
            </p>
          </div>
          
          <div class="space-y-4">
            <!-- 提示文本输入 -->
            <div class="w-full">
              <input 
                type="text" 
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="输入提示文本，使用<img></img>表示第i张输入图片"
                v-model="promptText"
              >
            </div>
            
            <!-- 图片上传网格 -->
            <div class="grid grid-cols-3 gap-6">
              <div v-for="(image, index) in images" :key="index" class="space-y-4">
                <!-- 图片预览区域 -->
                <div 
                  class="border border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[370px]"
                  @click="showImagePreview(image.preview)"
                >
                  <div class="w-full h-full flex items-center justify-center relative">
                    <img
                      v-if="image.preview"
                      :src="image.preview"
                      :alt="`图片 ${index + 1}`"
                      class="w-full h-full object-contain"
                    />
                    <div v-else class="text-black text-center">
                      图片预览区域
                    </div>
                    <!-- 图片序号 -->
                    <span class="absolute top-2 left-2 bg-white text-black rounded-full px-2 py-1 text-sm">
                      {{ index + 1 }}
                    </span>
                  </div>
                </div>

                <!-- 上传按钮和URL输入 -->
                <div class="space-y-2">
                  <input
                    type="file"
                    :ref="`imageInput${index}`"
                    class="hidden"
                    accept="image/*"
                    @change="(e) => handleImageUpload(e, index)"
                  />
                  <button
                    @click="$refs[`imageInput${index}`].click()"
                    class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    上传图片 {{index + 1}}
                  </button>
                  <input
                    v-model="image.url"
                    type="text"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :placeholder="'或输入图片URL'"
                  />
                </div>
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
              class="border border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[400px]"
              @click="showImagePreview(generatedImage)"
            >
              <img
                :src="generatedImage"
                alt="生成结果"
                class="w-full h-full object-contain"
              />
            </div>

            <!-- 参数控制区域 -->
            <div class="grid grid-cols-2 gap-6">
              <!-- 常规参数 -->
              <div v-for="param in numericParameters" :key="param.name" class="space-y-2">
                <div class="flex justify-between items-center">
                  <label class="text-black">{{param.label}}</label>
                  <input 
                    type="number" 
                    v-model="param.value"
                    class="w-20 px-2 py-1 border border-gray-300 rounded text-black"
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
                    <label class="text-black">Seed</label>
                    <div class="flex items-center space-x-2">
                      <input 
                        type="number" 
                        v-model="seed"
                        :disabled="randomizeSeed"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-black"
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
                    <label class="text-black">Randomize seed</label>
                  </div>
                </div>
              </div>

              <!-- 新增参数 -->
              <div class="col-span-2 space-y-6 mt-4">
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label class="text-black">最大输入图片尺寸</label>
                    <input 
                      type="number" 
                      v-model="maxInputImageSize"
                      class="w-20 px-2 py-1 border border-gray-300 rounded text-black"
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
                    <label class="text-black">使用单独的推理过程</label>
                  </div>
                  <p class="text-sm text-gray-500">对不同的引导使用单独的推理过程，这将减少内存消耗</p>

                  <div class="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      v-model="offloadModel"
                      class="w-4 h-4"
                    >
                    <label class="text-black">将模型卸载到CPU</label>
                  </div>
                  <p class="text-sm text-gray-500">显著减少内存消耗但会降低生成速度</p>

                  <div class="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      v-model="useInputSizeAsOutput"
                      class="w-4 h-4"
                    >
                    <label class="text-black">使用输入图片尺寸作为输出尺寸</label>
                  </div>
                  <p class="text-sm text-gray-500">自动调整输出图片尺寸以匹配输入图片，有助于提升性能</p>
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
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

const router = useRouter()
const user = 'hed-1'

// 状态管理
const loading = ref(false)
const promptText = ref('')
const previewImage = ref('')
const generatedImage = ref('')
const saveGenerated = ref(false)

// 图片数据
const images = ref([
  { preview: '', url: '', upload_file_id: '', transfer_method: 'local_file' },
  { preview: '', url: '', upload_file_id: '', transfer_method: 'local_file' },
  { preview: '', url: '', upload_file_id: '', transfer_method: 'local_file' }
])

// 参数配置
const numericParameters = ref([
  { name: 'height', label: '高度', value: 1024, min: 128, max: 2048, step: 64 },
  { name: 'width', label: '宽度', value: 1024, min: 128, max: 2048, step: 64 },
  { name: 'guidance_scale', label: '引导比例', value: 2.5, min: 1, max: 5, step: 0.1 },
  { name: 'img_guidance_scale', label: '图像引导比例', value: 1.6, min: 1, max: 2, step: 0.1 },
  { name: 'inference_steps', label: '推理步数', value: 50, min: 1, max: 100, step: 1 }
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

// 计算是否可以生成
const canGenerate = computed(() => {
  return images.value.some(img => img.preview) && promptText.value.trim() !== ''
})

// 处理图片上传
const handleImageUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // 本地预览
  const reader = new FileReader()
  reader.onload = (e) => {
    images.value[index].preview = e.target?.result as string
    images.value[index].url = '' // 清空URL输入
  }
  reader.readAsDataURL(file)

  // 上传到服务器
  try {
    const bodyData = new FormData()
    bodyData.append('file', file)
    bodyData.append('user', user)

    const response = await fetch('http://218.76.9.139:8535/v1/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
      },
      body: bodyData
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || '上传失败')
    }

    images.value[index].upload_file_id = data.id
    images.value[index].transfer_method = 'local_file'
  } catch (error) {
    console.error('上传图片失败:', error)
    alert('上传图片失败,请重试')
  }
}

// 生成图片
const generateImage = async () => {
  if (!canGenerate.value) {
    alert('请输入提示文本并至少上传一张图片')
    return
  }

  loading.value = true
  try {
    // 如果启用随机种子，生成新的种子值
    if (randomizeSeed.value) {
      seed.value = Math.floor(Math.random() * 2147483648)
    }

    const response = await fetch('http://218.76.9.139:8535/v1/workflows/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: {
          prompt: promptText.value,
          images: images.value.filter(img => img.preview || img.url),
          parameters: {
            ...Object.fromEntries(numericParameters.value.map(p => [p.name, p.value])),
            seed: seed.value,
            max_input_image_size: maxInputImageSize.value,
            separate_cfg_infer: separateCfgInfer.value,
            offload_model: offloadModel.value,
            use_input_image_size_as_output: useInputSizeAsOutput.value
          }
        },
        response_mode: 'blocking',
        user: user
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
</style>

