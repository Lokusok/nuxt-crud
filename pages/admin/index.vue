<template>
  <div class="max-w-[420px] mx-auto">
    <p class="text-center font-bold text-[42px] mb-[10px]">
      Admin: <u>{{ userSession.session.value.user.name }}</u>
    </p>

    <div class="flex flex-col items-center">
      <p class="text-[20px] font-bold mb-[15px]">
        Select active language:
      </p>

      <div class="flex gap-x-2">
        <TheButton
          :disabled="activeLanguage === 'RU'"
          @click="changeLanguage('RU')"
        >
          RU
        </TheButton>

        <TheButton
          :disabled="activeLanguage === 'EN'"
          @click="changeLanguage('EN')"
        >
          EN
        </TheButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserSession } from '#imports'
import TheButton from '~/components/TheButton.vue';

const userSession = useUserSession()

const activeLanguage = ref('EN')

function changeLanguage(value: string) {
  activeLanguage.value = value
}
</script>