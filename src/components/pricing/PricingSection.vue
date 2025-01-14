<script setup lang="ts">
import { ref, computed } from 'vue'
import { pricingTiers } from '@/config/pricing'
import type { PricingTier } from '@/types'

const billingPeriod = ref<'month' | 'year'>('month')

const adjustedPrice = (tier: PricingTier) => {
  if (tier.price === 0) return 'FREE'
  const basePrice = Number(tier.price)
  const yearlyDiscount = 0.2 // 20% discount for yearly billing
  const price = billingPeriod.value === 'year' 
    ? basePrice * 12 * (1 - yearlyDiscount)
    : basePrice
  return `¥${price.toFixed(2)}`
}
</script>

<template>
  <div class="py-24 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          选择适合您的方案
        </h2>
        <p class="mt-4 text-xl text-gray-300">
          无论您是个人用户还是企业团队，我们都能为您提供最适合的解决方案
        </p>
      </div>

      <!-- Billing Toggle -->
      <div class="mt-12 flex justify-center">
        <div class="relative bg-gray-800 p-0.5 rounded-lg flex">
          <button
            @click="billingPeriod = 'month'"
            :class="[
              billingPeriod === 'month' 
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-gray-200',
              'relative py-2 px-6 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 transition-colors duration-200'
            ]"
          >
            Monthly billing
          </button>
          <button
            @click="billingPeriod = 'year'"
            :class="[
              billingPeriod === 'year'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-gray-200',
              'ml-0.5 relative py-2 px-6 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 transition-colors duration-200'
            ]"
          >
            Yearly billing
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="mt-12 grid gap-8 lg:grid-cols-4">
        <div
          v-for="tier in pricingTiers"
          :key="tier.name"
          class="relative flex flex-col rounded-2xl border border-purple-500 bg-gray-800 p-8 shadow-xl transition-transform duration-300 hover:scale-105"
          :class="{ 'ring-2 ring-purple-500': tier.popular }"
        >
          <!-- Popular Badge -->
          <div
            v-if="tier.popular"
            class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white"
          >
            Most Popular
          </div>

          <!-- Discount Badge -->
          <div
            v-if="tier.discount"
            class="absolute top-4 right-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white"
          >
            {{ tier.discount }}% OFF
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-bold text-white">{{ tier.name }}</h3>
            <p class="mt-4 text-gray-300">{{ tier.description }}</p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-white">{{ adjustedPrice(tier) }}</span>
              <span v-if="tier.price !== 0" class="text-gray-300">/{{ billingPeriod }}</span>
            </p>
          </div>

          <ul class="mb-8 space-y-4 flex-1">
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex items-center text-gray-300"
            >
              <svg class="h-5 w-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ feature }}
            </li>
          </ul>

          <button
            class="mt-8 w-full rounded-lg py-3 px-6 text-center text-sm font-semibold transition-colors duration-200"
            :class="[
              tier.price === 0
                ? 'bg-white text-purple-600 hover:bg-gray-100'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            ]"
          >
            {{ tier.price === 0 ? 'Start for free' : 'Subscribe now' }}
          </button>
        </div>
      </div>

      <p class="mt-8 text-center text-gray-400">
        Unused coins roll over to the next billing period.
      </p>
    </div>
  </div>
</template>
