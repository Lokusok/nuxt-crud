<template>
  <div class="bg-slate-100 min-h-screen flex flex-col">
    <header class="bg-slate-800">
      <div class="relative container mx-auto px-4 py-6">
        <div class="absolute left-4 top-[50%] -translate-y-[50%]">
          <NuxtLink class="hover:opacity-50" to="/">
            <img src="~assets/logo.png" width="50" height="50" />
          </NuxtLink>
        </div>

        <nav>
          <ul class="flex gap-x-5 justify-center">
            <li>
              <NuxtLink
                to="/"
                activeClass="underline"
                class="text-white text-[20px] hover:opacity-70"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/users"
                activeClass="underline"
                class="text-white text-[20px] hover:opacity-70"
              >
                Users
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="{ name: 'create-user' }"
                activeClass="underline"
                class="text-white text-[20px] hover:opacity-70"
              >
                Create user
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="absolute right-4 top-[50%] -translate-y-[50%] text-white flex gap-x-3 items-center">
          <NuxtLink
            to="/login"
            activeClass="underline"
            class="text-white text-[20px] hover:opacity-70"
          >
            Login
          </NuxtLink>

          /

          <NuxtLink
            to="/register"
            activeClass="underline"
            class="text-white text-[20px] hover:opacity-70"
          >
            Register
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="grow">
      <div class="container mx-auto py-3 px-3 my-3">
        <slot />
      </div>
    </div>

    <footer class="bg-slate-800 py-4">
      <div class="container mx-auto text-center">
        <span class="text-white text-sm">
          &copy; Lokusok Nuxt CRUD
        </span>
      </div>
    </footer>
  </div>

</template>