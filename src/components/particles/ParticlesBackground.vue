<script setup lang="ts">
import { ParticlesComponent as Particles } from 'vue3-particles'
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import { particlesConfig } from './config'

const particlesInit = async (engine: Engine) => {
  await loadSlim(engine)
}
</script>

<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :options="particlesConfig"
    class="absolute inset-0"
  />
</template>
