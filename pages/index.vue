<template>
  <div
    v-if="status === 'pending'"
    class="flex justify-center"
  >
    <TheSpinner />
  </div>

  <template v-else>
    <TheAlert
      v-if="users.status !== 200"
      variation="danger"
    >
      Error!
    </TheAlert>

    <template v-else>
      <div class="flex justify-center mb-[20px]">
        <h2 class="text-center text-[30px] font-bold">
          List of users
        </h2>
      </div>

      <div class="flex flex-col gap-y-3 px-3">
        <NuxtLink
          v-for="user in users.data"
          :key="user.id"
          :to="`/users/${user.id}`"
          class="hover:opacity-70 active:opacity-50 bg-white border-[2px] border-slate-700 rounded px-4 py-4 flex flex-col gap-y-2"
        >
          <span class="text-xl">{{ user.name }}</span>
          <span class="text-gray-300 text-sm">{{ user.email }}</span>
        </NuxtLink>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useFetch, useSeoMeta } from '#app';

useSeoMeta({
  title: 'List of users'
})

const { data: users, status } = useFetch('/api/users')
</script>