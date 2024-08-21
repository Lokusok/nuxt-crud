<template>
  <Transition name="fade">
    <slot />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>