<template>
  <div class="relative h-screen bg-dark-800">
    <div 
      v-show="loading"
      class="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm"
    >
      <div class="relative">
        <div class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
        <div class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-400/50 absolute inset-0 rotate-45"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="h-16 w-16 rounded-full bg-blue-500/10 animate-pulse"></div>
        </div>
      </div>
    </div>
    
    <iframe
      v-show="!loading"
      src="https://om.qimuinfo.top/chatbot/yq0gM2PT1tVnZtFo"
      class="absolute inset-0 w-full h-full overflow-hidden"
      frameborder="0"
      scrolling="no"
      allow="microphone"
      @load="loading = false"
      style="overflow: hidden;"
    >
    </iframe>

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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const loading = ref(true)
</script>

<style scoped>
.animate-spin {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
