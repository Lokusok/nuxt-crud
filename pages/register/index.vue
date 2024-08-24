<template>
  <div class="max-w-[400px] mx-auto">
    <h2 class="text-[24px] font-bold text-center mb-[30px]">
      Register in our system
    </h2>

    <form
      class="flex flex-col items-center gap-y-2"
      @submit.prevent="registerUser"
    >
      <div>
        <label class="flex flex-col gap-y-1">
          Username:
          <TheInput
            v-model="username"
            v-bind="usernameAttrs"
            type="text"
            placeholder="Your username"
          />
        </label>

        <span
          v-show="errors.username"
          class="text-red-500"
        >
          {{ errors.username }}
        </span>
      </div>

      <div>
        <label class="flex flex-col gap-y-1">
          Password:
          <PasswordInput
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            placeholder="Your password"
            with-toggler
          />
        </label>

        <span
          v-show="errors.password"
          class="text-red-500"
        >
          {{ errors.password }}
        </span>
      </div>

      <div>
        <label class="flex flex-col gap-y-1">
          Password confirm:
          <PasswordInput
            v-model="passwordConfirm"
            v-bind="passwordConfirmAttrs"
            type="password"
            placeholder="Confirm password"
            with-toggler
          />
        </label>

        <span
          v-show="errors.passwordConfirm"
          class="text-red-500"
        >
          {{ errors.passwordConfirm }}
        </span>
      </div>

      <div>
        <TheButton
          :disabled="isSubmitButtonDisabled || isRegisterRequestNow"
          :is-loading="isRegisterRequestNow"
          type="submit"
        >
          Register
        </TheButton>
      </div>

      <p>
        Already have account?
        <RouterLink
          to="/login"
          class="text-blue-500 hover:underline active:text-blue-300"
        >
          Log in now!
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
import { useForm } from '#imports'
import { useRouter, useSeoMeta } from '#app'

import * as yup from 'yup'

import PasswordInput from '~/components/PasswordInput.vue'
import OAuthProviders from '~/components/OAuthProviders.vue'

useSeoMeta({
  title: 'Register in our system'
})

const router = useRouter()

const formSchema = yup.object({
  username: yup.string().required('Required field!').min(2, 'Minimum 2 letters!'),
  password: yup.string().required('Required field!').min(4, 'Minimum 4 letters!').oneOf([yup.ref('passwordConfirm')], 'Passwords must be equals'),
  passwordConfirm:  yup.string().required('Required field!').min(4, 'Minimum 4 letters!').oneOf([yup.ref('password')], 'Passwords must be equals')
})

const { defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: '',
    password: '',
    passwordConfirm: ''
  }
})

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

const error = ref('')

const isRegisterRequestNow = ref(false) 

const isSubmitButtonDisabled = computed(() => {
  const isEmpty = username.value.length === 0 || password.value.length === 0 || passwordConfirm.value.length === 0
  const isPasswordsEqual = (
    (password.value.length > 0 && passwordConfirm.value.length > 0) &&
    (password.value === passwordConfirm.value)
  )

  return isEmpty || !isPasswordsEqual
})

watch(error, () => {
  if (!error.value.length) return
  setTimeout(() => error.value = '', 3000)
})

function resetPasswords() {
  password.value = ''
  passwordConfirm.value = ''
}

async function registerUser() {
  isRegisterRequestNow.value = true

  await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const response = await $fetch('/api/session/register', {
      method: 'POST',
      body: {
        username: username.value.trim(),
        password: password.value.trim(),
        passwordConfirm: passwordConfirm.value.trim(),
      }
    })
  
    if (response.status === 200) {
      await router.push('/login')
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = 'Error occured...'
      resetPasswords()
    }
  } finally {
    isRegisterRequestNow.value = false
  }
}
</script>