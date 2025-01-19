<template>
  <button
    @click="toggleLanguage"
    class="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
    :title="t('common.switchLang')"
  >
    <component
      :is="locale === 'zh' ? 'div' : 'div'"
      class="h-5 w-5 text-gray-300 flex items-center justify-center font-medium"
    >
      {{ locale === 'zh' ? 'EN' : '中' }}
    </component>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  localStorage.setItem('language', newLocale)
}
</script>
