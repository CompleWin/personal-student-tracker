<script setup lang="ts">

withDefaults(defineProps<{
  modelValue: boolean
  align?: 'center' | 'start'
}>(), {
  align: 'center',
})

const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const BOX_CLASSES = {
  on: 'border-primary bg-primary text-white',
  off: 'border-line-strong text-transparent',
} as const

</script>

<template>
  <label class="flex cursor-pointer text-[15px] text-fg"
         :class="align === 'start' ? 'items-start gap-3' : 'items-center gap-2.5'">
    <input
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span
        class="flex size-[18px] shrink-0 items-center justify-center rounded-md border transition-colors
               peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2"
        :class="[modelValue ? BOX_CLASSES.on : BOX_CLASSES.off, align === 'start' ? 'mt-0.5' : '']"
    >
      <svg
          width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
      >
        <path d="m5 12 5 5L20 7" />
      </svg>
    </span>
    <slot />
  </label>
</template>
