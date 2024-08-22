<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useUserSession } from '#imports';

const userSession = useUserSession()

watchEffect(() => {
  console.group('Session:')
  console.log('Is logged in: ', userSession.loggedIn.value)
  console.log('User info: ', userSession.user.value)
  console.log('Session: ', userSession.session.value)
  console.groupEnd()
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