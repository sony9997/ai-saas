<script setup lang="ts">
defineProps<{
  modelValue: string
  type?: string
  label: string
  placeholder?: string
  required?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-200">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="type || 'text'"
        :placeholder="placeholder"
        :required="required"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      />
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-400">{{ error }}</p>
  </div>
</template>
