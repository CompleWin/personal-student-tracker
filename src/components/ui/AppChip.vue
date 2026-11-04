<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

withDefaults(defineProps<{
  active?: boolean
  size?: 'num' | 'sm' | 'md'
  disabled?: boolean
  to?: RouteLocationRaw
}>(), {
  active: false,
  size: 'md',
  disabled: false,
})

const SIZE_CLASSES = {
  num: 'min-w-[31px] justify-center px-1.5 py-[5px] text-[13px]',
  sm: 'px-3 py-1.5 text-[13px]',
  md: 'px-3.5 py-2 text-sm',
} as const

const STATE_CLASSES = {
  on: 'bg-primary border-primary text-white',
  off: 'border-line text-fg hover:border-primary hover:text-primary',
} as const

</script>

<template>
  <component
      :is="to ? RouterLink : 'button'"
      :to="to"
      :type="to ? undefined : 'button'"
      :disabled="to ? undefined : disabled"
      :aria-pressed="to ? undefined : active"
      class="inline-flex items-center gap-2 border rounded-full whitespace-nowrap
             cursor-pointer transition
             focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
             disabled:opacity-50 disabled:cursor-not-allowed"
      :class="[SIZE_CLASSES[size], active ? STATE_CLASSES.on : STATE_CLASSES.off]"
  >
    <slot />
  </component>
</template>
