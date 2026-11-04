<script setup lang="ts">

withDefaults(defineProps<{
  as?: 'p' | 'h2' | 'h3' | 'span' | 'div' | 'label'
  tone?: 'muted' | 'danger'
}>(), {
  as: 'p',
  tone: 'muted',
})

const TONE_CLASSES = {
  muted: 'text-fg-faint',
  danger: 'text-danger',
} as const

</script>

<template>
  <component :is="as" class="block text-[11px] tracking-[0.2em] uppercase" :class="TONE_CLASSES[tone]">
    <slot />
  </component>
</template>
