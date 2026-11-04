<script setup lang="ts">

withDefaults(defineProps<{
  value: string | number
  tone?: 'accent' | 'success'
}>(), {
  tone: 'accent',
})

const TONE_CLASSES = {
  accent: 'bg-primary-soft',
  success: 'bg-success-soft',
} as const

const VALUE_CLASSES = {
  accent: 'text-primary-ink',
  success: 'text-success',
} as const

</script>

<template>
  <span
      class="inline-flex items-center gap-[7px] h-8 px-3.5 rounded-full whitespace-nowrap
             text-[13px] text-fg-subtle"
      :class="TONE_CLASSES[tone]"
  >
    <span class="font-extrabold text-sm" :class="VALUE_CLASSES[tone]">{{ value }}</span>
    <slot />
  </span>
</template>
