<template>
  <div class="mx-auto">
    <div class="border-b border-b-gray-200 pb-[20px] mb-[20px]">
      <p class="text-center font-bold text-[42px] mb-[10px]">
        {{ $t('admin.titleBeforeName') }}: <u>{{ userSession.session.value.user.name }}</u>
      </p>
  
      <p class="text-center text-gray-800 font-bold text-[20px]">
        Email: {{ userSession.session.value.user.email }}
      </p>
    </div>

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
import { useUserSession, useI18n, useSeoMeta } from '#imports'
import TheButton from '~/components/TheButton.vue';

const userSession = useUserSession()

const { locale, setLocale, t } = useI18n()

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