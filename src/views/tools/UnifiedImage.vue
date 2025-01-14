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
                    :ref="el => { if (el) imageInputRefs[index] = el as HTMLInputElement }"
                    class="hidden"
                    accept="image/*"
                    @change="(e) => handleImageUpload(e, index)"
                  />
                  <button
                    @click="handleUploadClick(index)"
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
              ref="outputImageRef"
              class="border border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer h-[300px]"
              @click="showImagePreview(generatedImage)"
            >
              <div class="w-full h-full flex items-center justify-center">
                <img
                  v-if="generatedImage"
                  :src="generatedImage"
                  alt="生成的图片"
                  class="w-full h-full object-contain"
                  @load="scrollToOutput"
                />
                <div v-else class="text-black">
                  输出图片预览区域
                </div>
              </div>
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
<!-- 
                  <div class="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      v-model="offloadModel"
                      class="w-4 h-4"
                    >
                    <label class="text-black">将模型卸载到CPU</label>
                  </div>
                  <p class="text-sm text-gray-500">显著减少内存消耗但会降低生成速度</p> -->

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
import { Client } from "@gradio/client"

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
    const result = await client.predict("/generate_image", params)
    
    // 添加调试信息
    console.log('Generated image result:', result)
    console.log('Result data type:', typeof result.data)
    console.log('Result data:', result.data)

    if (result.data && result.data.length > 0) {
      generatedImage.value=result.data[0].url
      console.log('Generated image URL:', generatedImage.value)
    }else{
      console.error('Unexpected image data format:', result.data)
    }
  } catch (error) {
    console.error('Failed to generate image:', error)
  } finally {
    loading.value = false
  }
}

// 处理图片上传
async function handleImageUpload(event: Event, index: number) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  const file = input.files[0]
  images.value[index] = {
    preview: URL.createObjectURL(file),
    url: '',
    upload_file_id: '',
    transfer_method: 'local_file',
    file // 保存File对象以便后续转换为blob
  }
}

// 计算是否可以生成
const canGenerate = computed(() => {
  return promptText.value.trim() !== '' && 
         images.value.some(img => img.preview || img.url)
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

// 创建文件输入引用数组
const imageInputRefs = ref<HTMLInputElement[]>([])

// 处理图片上传按钮点击
const handleUploadClick = (index: number) => {
  imageInputRefs.value[index]?.click()
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
</style>

