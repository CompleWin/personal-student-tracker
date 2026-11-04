<script setup lang="ts">

withDefaults(defineProps<{
  variant?: 'ink' | 'accent' | 'success' | 'muted' | 'danger'
}>(), {
  variant: 'muted',
})

const VARIANT_CLASSES = {
  ink: 'bg-fg text-surface-page',
  accent: 'bg-primary-soft text-primary-ink',
  success: 'bg-success-soft text-success',
  muted: 'bg-surface-active text-fg-subtle',
  danger: 'bg-danger-soft text-danger',
} as const

</script>

<template>
  <span
      class="inline-flex items-center h-[26px] px-3 rounded-full
             font-primary font-bold text-[10.5px] tracking-[0.14em] uppercase whitespace-nowrap"
      :class="VARIANT_CLASSES[variant]"
  >
    <slot />
  </span>
</template>
