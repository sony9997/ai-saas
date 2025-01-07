<script setup lang="ts">
defineProps<{
  loading?: boolean
  type?: 'submit' | 'button'
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="loading"
    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot>Submit</slot>
  </button>
</template>
