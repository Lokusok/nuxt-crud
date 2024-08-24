<template>
  <div class="max-w-[720px] mx-auto">
    <p class="text-center font-bold text-[42px] mb-[10px]">
      {{ $t('admin.titleBeforeName') }}: <u>{{ userSession.session.value.user.name }}</u>
    </p>

    <div class="flex flex-col items-center">
      <p class="text-[20px] font-bold mb-[15px]">
        {{ $t('admin.language.select') }}:
      </p>

      <div class="flex gap-x-2">
        <TheButton
          :disabled="locale === 'ru'"
          @click="changeLanguage('ru')"
        >
          RU
        </TheButton>

        <TheButton
          :disabled="locale === 'en'"
          @click="changeLanguage('en')"
        >
          EN
        </TheButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSession, useI18n, useSeoMeta, watch, onMounted } from '#imports'
import { useStorage } from '@vueuse/core';
import TheButton from '~/components/TheButton.vue';

const userSession = useUserSession()

const { locale, setLocale, t } = useI18n()
const localeStorage = useStorage('locale', locale.value)

watch(locale, (newValue) => {
  localeStorage.value = newValue
})

onMounted(() => {
  setLocale(localeStorage.value)
})

useSeoMeta({
  title: () => {
    void locale.value; // For correct changes
    return t('admin.headTitle')
  }
})

function changeLanguage(value: string) {
  setLocale(value)
}
</script>