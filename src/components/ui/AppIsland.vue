<script setup lang="ts">

withDefaults(defineProps<{
  variant?: 'island' | 'panel'
  padding?: 'md' | 'sm' | 'none'
  as?: 'section' | 'div' | 'article' | 'aside'
}>(), {
  variant: 'island',
  padding: 'md',
  as: 'section',
})

const VARIANT_CLASSES = {
  island: 'bg-surface-island border border-line rounded-island',
  panel: 'bg-surface-muted border border-line rounded-panel',
} as const

const PADDING_CLASSES = {
  md: 'p-[18px] md:p-7',
  sm: 'p-4 md:p-5',
  none: '',
} as const

</script>

<template>
  <component :is="as" :class="[VARIANT_CLASSES[variant], PADDING_CLASSES[padding]]">
    <slot />
  </component>
</template>
