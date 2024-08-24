<template>
  <Teleport to="#teleports">
    <FadeTransition>
      <TheModal
        v-if="props.isShow"
        @close="handleClose"
      >
        <div class="pb-1 border-b-2 border-blue-800">
          <h2 class="text-[20px] font-bold text-center">
            {{ props.title }}
          </h2>
        </div>

        <div class="my-3">
          <p class="text-center max-w-[300px]">
            {{ props.body }}
          </p>
        </div>

        <div class="pt-4 border-t-2 border-blue-800 flex justify-end gap-x-3">
          <TheButton
            :disabled="props.isButtonsDisabled"
            @click="handleCancelClick"
          >
            {{ props.cancelText }}
          </TheButton>
          <TheButton
            :disabled="props.isButtonsDisabled"
            variation="danger"
            @click="handleConfirmClick"
          >
            {{ props.confirmText }}
          </TheButton>
        </div>
      </TheModal>
    </FadeTransition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  isShow: boolean
  title: string
  body: string
  isButtonsDisabled?: boolean
  cancelText?: string
  confirmText?: string
}>(), {
  isButtonsDisabled: false,
  cancelText: 'Cancel',
  confirmText: 'Confirm'
})

const emit = defineEmits<{
  close: []
  cancel: []
  confirm: []
}>()

function handleClose() {
  emit('close')
}

function handleCancelClick() {
  emit('cancel')
  emit('close')
}

function handleConfirmClick() {
  emit('confirm')
}
</script>