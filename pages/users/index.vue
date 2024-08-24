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
          {{ $t('users.title') }}
        </h2>
      </div>

      <OptionsBar
        v-model="searchQuery"
        :is-loading="isSearchRequestNow"
        :option="activeUsersOptionStorage"
        :mode="activeModeStorage"
        @change-mode="setActiveMode"
        @change-option="setActiveUsersOption"
      />

      <FadeTransition mode="out-in">
        <div
          v-if="users.data.length"
          :key="activeModeStorage"
          :class="{
            'flex flex-col gap-y-3 px-3 max-w-[420px]': activeModeStorage === 'flex',
            'flex flex-wrap justify-center gap-3 max-w-[1024px]': activeModeStorage === 'grid',
            'mx-auto': true
          }"
        >
          <NuxtLink
            v-for="user in users.data"
            :key="user.id"
            :to="`/users/${user.id}`"
            class="hover:opacity-70 active:opacity-50 bg-white border-[2px] border-slate-700 rounded px-4 py-4 flex justify-between items-end gap-x-3"
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

        <div
          v-else
          class="text-center flex flex-col gap-y-4"
        >
          <p class="text-[20px] text-gray-500">...&nbsp;{{ $t('users.empty') }}&nbsp;...</p>
  
          <div class="flex justify-center">
            <TheButton :to="{ name: 'create-user' }">
              <span class="flex gap-x-2 font-bold">
                <UserPlusIcon class="text-[20px]" />
                {{ $t('users.createUserInvite') }}
              </span>
            </TheButton>
          </div>
        </div>
      </FadeTransition>

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
import { useFetch, useRoute, useRouter, useSeoMeta, useState } from '#app'
import { useI18n } from '#imports'
import formatDate from '~/utils/format-date'

import ThePagination from '~/components/ThePagination.vue'
import TheButton from '~/components/TheButton.vue'
import OptionsBar from '~/components/OptionsBar.vue'

import UserPlusIcon from '~/assets/icons/user-plus.svg'

import { useSessionStorage } from '@vueuse/core'
import type { TMode, TOption } from '~/types/users'

const { t } = useI18n()

useSeoMeta({
  title: t('users.headTitle')
})

const router = useRouter()
const route = useRoute()

const searchQueryStorage = useSessionStorage('search-query', '')
const activeUsersOptionStorage = useState<TOption>('active-users-option', () => 'search')
const activeModeStorage = useState<TMode>('active-users-mode', () => 'flex')

const currentPage = ref(Number(route.query.page ?? 1))
const searchQuery = ref(searchQueryStorage.value)
const isSearchRequestNow = ref(false)

watch(searchQuery, (newValue) => {
  searchQueryStorage.value = newValue
})

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

function setActiveUsersOption(value: TOption) {
  activeUsersOptionStorage.value = value
}

function setActiveMode(value: TMode) {
  activeModeStorage.value = value
}
</script>