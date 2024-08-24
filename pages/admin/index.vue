<template>
  <div class="max-w-[420px] mx-auto">
    <p class="text-center font-bold text-[42px]">
      Admin: <u>{{ userSession.session.value.user.name }}</u>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useUserSession } from '#imports'

const userSession = useUserSession()
</script>