<script setup lang="ts">
import ParticlesBackground from '@/components/particles/ParticlesBackground.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
    <ParticlesBackground />
    <div class="w-full max-w-md space-y-8 relative z-10">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          <slot name="title">Welcome back</slot>
        </h2>
      </div>
      <div class="bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
