<template>
  <div class="max-w-[400px] mx-auto">
    <h2 class="text-[24px] font-bold text-center mb-[30px]">
      Log in to system
    </h2>

    <form
      class="flex flex-col items-center gap-y-2"
    >
    <div>
        <label class="flex flex-col gap-y-1">
          Username:
          <TheInput
            type="text"
            placeholder="Your username"
          />
        </label>
      </div>

      <div>
        <label class="flex flex-col gap-y-1">
          Password:
          <TheInput
            type="password"
            placeholder="Your password"
          />
        </label>
      </div>

      <div>
        <TheButton type="submit">Log in</TheButton>
      </div>
    </form>
  </div>
</template>