<template>
  <div class="max-w-[400px] mx-auto flex flex-col gap-y-4">
    <h2 class="text-center text-[40px] font-bold shadow-text first-letter:text-green-600">
      Nuxt <span class="text-green-600">CRM</span>
    </h2>

    <p class="text-justify text-[18px] mb-3">
      {{ $t('home.description') }}
    </p>
    <AuthState v-slot="{ loggedIn }">
      <div
        v-if="loggedIn"
        class="flex justify-center"
      >
        <NuxtLink
          to="/stats"
          class="flex items-center gap-x-3 bg-green-600 text-white px-4 py-2 rounded text-xl font-bold hover:bg-green-500 active:opacity-70"
        >
          {{ $t('home.inviteToStats') }}
          <StatisticsIcon />
        </NuxtLink>
      </div>
    </AuthState>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useSeoMeta } from '#app'
import StatisticsIcon from '~/assets/icons/statistics.svg'

const { t } = useI18n()

useSeoMeta({
  title: t('home.headTitle')
})
</script>