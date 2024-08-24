<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { onMounted, useI18n } from '#imports'
import { useStorage } from '@vueuse/core'

const { locale, setLocale } = useI18n()
const localeStorage = useStorage('locale', locale.value)

watch(locale, (newValue) => {
  localeStorage.value = newValue
})

onMounted(() => {
  setLocale(localeStorage.value)
})

watchEffect((onCleanup) => {
  if (import.meta.server) return

  const teleportsNode = document.querySelector('#teleports')
  const nuxtWrapper = document.querySelector('#__nuxt')

  if (!teleportsNode || !nuxtWrapper) return

  const mutationObserver = new MutationObserver(() => {
    if (teleportsNode.children.length > 1) {
      nuxtWrapper.setAttribute('inert', '')
    } else {
      nuxtWrapper.removeAttribute('inert')
    }
  })

  mutationObserver.observe(teleportsNode, { childList: true })

  onCleanup(() => {
    mutationObserver.disconnect()
  })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
</style>