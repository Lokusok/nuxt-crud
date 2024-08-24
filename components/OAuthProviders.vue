<template>
  <div
    title="Under Construct"
    class="flex gap-x-3 text-gray-300 cursor-default"
  >
    <div>
      <NuxtLink
        to="http://localhost:3001/auth/github"
        class="text-blue-500 hover:underline cursor-pointer active:text-blue-400"
      >
        GitHub
      </NuxtLink>
    </div>
    <div>
      <NuxtLink
        to="http://localhost:3001/auth/google"
        class="text-blue-500 hover:underline cursor-pointer active:text-blue-400"
      >
        Google
      </NuxtLink>
    </div>
    <div>
      <NuxtLink
        to="http://localhost:3001/auth/discord"
        class="text-blue-500 hover:underline cursor-pointer active:text-blue-400"
      >
        Discord
      </NuxtLink>
    </div>
  </div>
</template>