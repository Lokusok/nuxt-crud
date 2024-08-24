<template>
  <div class="max-w-[400px] mx-auto">
    <h2 class="text-[24px] font-bold text-center mb-[30px]">
      {{ $t('login.title') }}
    </h2>

    <form
      class="flex flex-col items-center gap-y-2"
      @submit.prevent="login"
    >
      <div>
        <label class="flex flex-col gap-y-1">
          {{ $t('login.form.name.label') }}:
          <TheInput
            v-model="username"
            :placeholder="$t('login.form.name.placeholder')"
            type="text"
          />
        </label>
      </div>

      <div>
        <label class="flex flex-col gap-y-1">
          {{ $t('login.form.password.label') }}:
          <PasswordInput
            v-model="password"
            type="password"
            :placeholder="$t('login.form.password.placeholder')"
            with-toggler
          />
        </label>
      </div>

      <div class="flex flex-start">
        <label class="flex gap-x-3">
          {{ $t('login.form.remember.label') }}:
          <input
            v-model="remember"
            type="checkbox"
          >
        </label>
      </div>

      <div>
        <TheButton
          :disabled="isSubmitButtonDisabled || isLoginRequestNow"
          :is-loading="isLoginRequestNow"
          type="submit"
        >
          {{ $t('login.form.submit') }}
        </TheButton>
      </div>

      <p>
        {{ $t('login.form.notHaveAccount.defaultText') }}
        <RouterLink
          to="/register"
          class="text-blue-500 hover:underline active:text-blue-300"
        >
          {{ $t('login.form.notHaveAccount.linkText') }}
        </RouterLink>
      </p>

      <OAuthProviders />
    </form>

    <FadeTransition>
      <TheAlert
        v-if="error.length"
        variation="danger"
      >
        {{ error }}
      </TheAlert>
    </FadeTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserSession, useI18n } from '#imports'
import { useRoute, useRouter, useSeoMeta } from '#app'

import OAuthProviders from '~/components/OAuthProviders.vue'
import PasswordInput from '~/components/PasswordInput.vue'

const { t } = useI18n()

useSeoMeta({
  title: t('login.headTitle')
})

const userSession = useUserSession()

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const remember = ref(false)

const error = ref('')

const isLoginRequestNow = ref(false) 

const isSubmitButtonDisabled = computed(() => {
  const isEmpty = username.value.length === 0 || password.value.length === 0
  return isEmpty
})

watch(error, () => {
  if (!error.value.length) return
  setTimeout(() => error.value = '', 3000)
})

function resetPassword() {
  password.value = ''
}

async function login() {
  isLoginRequestNow.value = true

  await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const response = await $fetch('/api/session/login', {
      method: 'POST',
      body: {
        username: username.value.trim().toLowerCase(),
        password: password.value.trim().toLowerCase(),
      }
    })

    if (response.status === 200) {
      const redirectTo = route.query.from ? String(route.query.from) : '/'
      await userSession.fetch()

      // Not want remember - log out on tab close
      if (!remember.value) {
        window.onbeforeunload = () => {
          userSession.clear()
        }
      }

      await router.push(redirectTo)
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = t('requests.login.error')
    }
    resetPassword()
  } finally {
    isLoginRequestNow.value = false
  }
}
</script>