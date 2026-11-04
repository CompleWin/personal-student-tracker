<script setup lang="ts">
import type { ToastType } from '../../composables/useToast.ts'

withDefaults(defineProps<{
  type?: ToastType
  closable?: boolean
}>(), {
  type: 'success',
  closable: true,
})

defineEmits<{
  close: []
  mouseenter: []
  mouseleave: []
}>()

const TYPE_CLASSES = {
  success: 'bg-success',
  error: 'bg-danger',
  info: 'bg-surface-inverse',
} as const

</script>

<template>
  <div
      role="status"
      class="flex items-start gap-3 w-[400px] max-w-[calc(100vw-2.5rem)]
             rounded-panel px-4 py-3.5 text-white shadow-modal"
      :class="TYPE_CLASSES[type]"
      @mouseenter="$emit('mouseenter')"
      @mouseleave="$emit('mouseleave')"
  >
    <svg class="size-[18px] flex-none mt-px" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <template v-if="type === 'success'">
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.5 2.5 4.5-5" />
      </template>
      <template v-else-if="type === 'error'">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </template>
      <template v-else>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-4M12 8h.01" />
      </template>
    </svg>

    <span class="flex-1 text-sm leading-normal"><slot /></span>

    <button
        v-if="closable"
        type="button"
        aria-label="Закрыть"
        class="flex-none size-[26px] -mr-1 -mt-0.5 inline-flex items-center justify-center rounded-full
               opacity-75 cursor-pointer transition hover:opacity-100 hover:bg-white/20
               focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        @click="$emit('close')"
    >
      <svg class="size-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</template>
