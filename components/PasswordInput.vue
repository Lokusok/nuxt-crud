<template>
  <div class="relative">
    <TheInput
      v-bind="$attrs"
      :type="inputType"
    />
    <button
      v-if="props.withToggler"
      type="button"
      class="absolute right-0 top-[50%] translate-x-[40px] -translate-y-[50%]"
      @click="toggleVisibility"
    >
      <EyeIcon
        v-if="inputType === 'password'"
        class="text-[24px] hover:opacity-80 active:opacity-50"
      />
      <EyeOffIcon
        v-if="inputType === 'text'"
        class="text-[24px] hover:opacity-80 active:opacity-50"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheInput from './TheInput.vue'

import EyeIcon from '~/assets/icons/eye.svg'
import EyeOffIcon from '~/assets/icons/eye-off.svg'

const props = withDefaults(defineProps<{
  withToggler?: boolean
}>(), {
  withToggler: false
})

const inputType = ref<'password' | 'text'>('password')

function toggleVisibility() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>