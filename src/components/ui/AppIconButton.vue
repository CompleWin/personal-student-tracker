<script setup lang="ts">

withDefaults(defineProps<{
  label: string
  tone?: 'neutral' | 'primary' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  active?: boolean
  disabled?: boolean
}>(), {
  tone: 'neutral',
  size: 'md',
  active: false,
  disabled: false,
})

const TONE_CLASSES = {
  neutral: 'text-fg-subtle hover:bg-surface-page hover:text-fg',
  primary: 'text-fg-subtle hover:bg-primary-soft hover:text-primary',
  danger: 'text-fg-subtle hover:bg-danger-soft hover:text-danger',
} as const

const SIZE_CLASSES = {
  xs: 'size-[26px]',
  sm: 'size-8',
  md: 'size-9',
  lg: 'size-[38px]',
} as const

const ACTIVE_CLASSES = 'bg-primary-soft text-primary'

</script>

<template>
  <button
      type="button"
      :title="label"
      :aria-label="label"
      :aria-pressed="active"
      :disabled="disabled"
      class="inline-flex items-center justify-center flex-none rounded-full cursor-pointer transition
             focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
             disabled:opacity-50 disabled:cursor-not-allowed"
      :class="[SIZE_CLASSES[size], active ? ACTIVE_CLASSES : TONE_CLASSES[tone]]"
  >
    <slot />
  </button>
</template>
