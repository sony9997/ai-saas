<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import Navbar from './components/layout/Navbar.vue'

const { checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <Navbar />
    <div class="pt-16">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900;
}
</style>
