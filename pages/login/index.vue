<template>
  <div class="max-w-[400px] mx-auto">
    <h2 class="text-[24px] font-bold text-center mb-[30px]">
      Log in to system
    </h2>

    <form
      @submit.prevent="login"
      class="flex flex-col items-center gap-y-2"
    >
    <div>
        <label class="flex flex-col gap-y-1">
          Username:
          <TheInput
            v-model="username"
            type="text"
            placeholder="Your username"
          />
        </label>
      </div>

      <div>
        <label class="flex flex-col gap-y-1">
          Password:
          <PasswordInput
            v-model="password"
            type="password"
            placeholder="Your password"
            with-toggler
          />
        </label>
      </div>

      <div>
        <TheButton
          :disabled="isSubmitButtonDisabled || isLoginRequestNow"
          :is-loading="isLoginRequestNow"
          type="submit"
        >
          Log in
        </TheButton>
      </div>

      <p>
        Have not account?
        <RouterLink
          to="/register"
          class="text-blue-500 hover:underline active:text-blue-300"
        >
          Register it!
        </RouterLink>
      </p>
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
import { useUserSession } from '#imports'
import { useRoute, useRouter, useSeoMeta } from '#app'
import PasswordInput from '~/components/PasswordInput.vue'

useSeoMeta({
  title: 'Log in to system'
})

const userSession = useUserSession()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

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

    console.log('>>>', response)

    if (response.status === 200) {
      const redirectTo = route.query.from ? String(route.query.from) : '/'
      await userSession.fetch()
      await router.push(redirectTo)
    }
  } catch (e) {
    error.value = 'Error occured...'
    resetPassword()
  } finally {
    isLoginRequestNow.value = false
  }
}
</script>