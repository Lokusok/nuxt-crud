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
import { useUserSession, useI18n, useCookieLocale, watchEffect } from '#imports'
import TheButton from '~/components/TheButton.vue';

const userSession = useUserSession()

const { locale, setLocale, setLocaleCookie } = useI18n()

const cookieLocale = useCookieLocale()

watchEffect(() => {
  console.log('Cookie locale: ', cookieLocale.value)
})

function changeLanguage(value: string) {
  setLocale(value)
  setLocaleCookie(value)
}
</script>