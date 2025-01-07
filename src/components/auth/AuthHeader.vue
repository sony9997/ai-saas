<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="text-center">
    <h2 class="text-3xl font-bold text-white">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-sm text-gray-300">
      {{ subtitle }}
    </p>
  </div>
</template>
