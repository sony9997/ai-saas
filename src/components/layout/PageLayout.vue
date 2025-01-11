<template>
  <div class="h-auto min-h-fit">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div class="p-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script> 