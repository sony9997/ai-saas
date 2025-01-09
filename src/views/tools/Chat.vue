<template>
  <div class="relative h-screen bg-dark-800">
        <iframe
            src="https://om.qimuinfo.top/chatbot/yq0gM2PT1tVnZtFo"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="microphone">
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

const router = useRouter()
</script>
