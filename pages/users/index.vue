<template>
  <div
    v-if="status === 'pending'"
    class="flex justify-center"
  >
    <TheSpinner />
  </div>

  <template v-else>
    <template v-if="users.status === 200">
      <div class="flex justify-center mb-[20px]">
        <h2 class="text-center text-[30px] font-bold">
          List of users
        </h2>
      </div>

      <div class="relative max-w-[450px] mx-auto">
        <div class="h-[120px]">
          <FadeTransition mode="out-in">
            <SearchBar
              v-if="activeMode === 'search'"
              v-model="searchQuery"
              :is-loading="isSearchRequestNow"
              class="mb-[30px]"
            />

            <div v-else>
              Layout settings
            </div>
          </FadeTransition>
        </div>

        <div class="absolute right-0 top-[30%] -translate-y-[50%] flex flex-col gap-y-[15px]">
          <button
            :class="{
              'pointer-events-none bg-blue-600 opacity-50': activeMode === 'search'
            }"
            class="bg-blue-800 text-white w-[30px] h-[30px] rounded-full flex justify-center items-center transition-colors"
            @click="setActiveMode('search')"
          >
            <SearchIcon class="pl-[1.5px] pt-[1.5px] text-[23px]" />
          </button>

          <button
            :class="{
              'pointer-events-none bg-blue-600 opacity-50': activeMode === 'layouts'
            }"
            class="bg-blue-800 text-white w-[30px] h-[30px] rounded-full flex justify-center items-center transition-colors"
            @click="setActiveMode('layouts')"
          >
            <GridIcon class="pl-[1.5px] pt-[1.5px] text-[23px]" />
          </button>
        </div>
      </div>

      <div
        v-if="users.data.length"
        class="flex flex-col mx-auto gap-y-3 px-3 max-w-[420px]"
      >
        <NuxtLink
          v-for="user in users.data"
          :key="user.id"
          :to="`/users/${user.id}`"
          class="hover:opacity-70 active:opacity-50 bg-white border-[2px] border-slate-700 rounded px-4 py-4 flex justify-between items-end"
        >
          <div class="flex flex-col gap-y-2">
            <span class="text-xl">{{ user.name }}</span>
            <span class="text-gray-300 text-sm">{{ user.email }}</span>
          </div>

          <div class="text-gray-500 text-[13px]">
            {{ formatDate(user.createdAt) }}
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center flex flex-col gap-y-4">
        <p class="text-[20px] text-gray-500">...&nbsp;Users empty&nbsp;...</p>

        <div class="flex justify-center">
          <TheButton :to="{ name: 'create-user' }">
            <span class="flex gap-x-2 font-bold">
              <UserPlusIcon class="text-[20px]" />
              Create here
            </span>
          </TheButton>
        </div>
      </div>

      <div
        v-if="!searchQuery.length"
        class="flex justify-center pt-[20px]"
      >
        <ThePagination
          :current-page="currentPage"
          :max-page="users.max_page"
          @change="handlePaginationChange"
        />
      </div>
    </template>

    <TheAlert
      v-else
      variation="danger"
    >
      Error!
    </TheAlert>
  </template>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useFetch, useRoute, useRouter, useSeoMeta } from '#app'
import formatDate from '~/utils/format-date'

import ThePagination from '~/components/ThePagination.vue'
import SearchBar from '~/components/SearchBar.vue'

import UserPlusIcon from '~/assets/icons/user-plus.svg'
import GridIcon from '~/assets/icons/grid.svg'
import SearchIcon from '~/assets/icons/search.svg'
import { useSessionStorage } from '@vueuse/core'

useSeoMeta({
  title: 'List of users'
})

const router = useRouter()
const route = useRoute()
const searchQuerySessionStorage = useSessionStorage('search-query', '')

const currentPage = ref(Number(route.query.page ?? 1))
const searchQuery = ref(searchQuerySessionStorage.value)
const isSearchRequestNow = ref(false)

watch(searchQuery, (newValue) => {
  searchQuerySessionStorage.value = newValue
})

const activeMode = ref('search')

const { data: users, status } = useFetch(() => `/api/users?page=${currentPage.value}&query=${searchQuery.value}`, {
  watch: [currentPage, searchQuery]
})

watchEffect(() => {
  if (status.value !== 'pending' && users.value?.data?.length === 0) {
    currentPage.value = 1
    return router.replace({ path: '/users', query: {} })
  }

  const newQuery: Record<string, any> = {
    page: currentPage.value,
  }

  if (searchQuery.value.length)
    newQuery['query'] = searchQuery.value

  router.push({ path: '/users', query: newQuery })
})

function handlePaginationChange(page: number) {
  currentPage.value = page
}

function setActiveMode(value: string) {
  activeMode.value = value
}
</script>