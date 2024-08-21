<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';

watchEffect((onCleanup) => {
  if (import.meta.server) return

  const teleportsNode = document.querySelector('#teleports')
  const nuxtWrapper = document.querySelector('#__nuxt')

  if (!teleportsNode || !nuxtWrapper) return

  const mutationObserver = new MutationObserver((entries) => {
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