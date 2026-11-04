<script setup lang="ts">

import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
  color?: 'primary' | 'black' | 'red' | 'slate' | 'gray' | 'white'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'lg' | 'xl' | '2xl' | '4xl' | 'full'
  loading?: boolean
  disabled?: boolean
  wide?: boolean
  icon?: boolean
  to?: RouteLocationRaw
}>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  rounded: 'full',
  loading: false,
  disabled: false,
  wide: false,
  icon: false
})

const isAction = computed(() => !props.icon && (props.variant === 'solid' || props.variant === 'outline'))

const isMuted = computed(() => props.disabled && !props.loading && props.variant === 'solid')

const MUTED_CLASSES = 'bg-surface-active text-fg-faint'

const variantClasses = computed(() => {
  const map = {
    solid: {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      black: 'bg-fg text-surface-page hover:bg-primary hover:text-white',
      red:   'bg-danger text-white hover:bg-danger-hover',
      slate: 'bg-neutral text-white hover:bg-neutral-hover',
      gray:  'bg-surface-active text-fg hover:bg-surface-strong',
      white: 'bg-white text-primary hover:bg-primary-soft',
    },
    outline: {
      primary: 'border-2 border-primary text-primary hover:bg-primary-soft',
      black: 'border-2 border-fg text-fg hover:bg-fg hover:text-surface-page',
      red:   'border-2 border-danger text-danger hover:bg-danger-soft',
      slate: 'border-2 border-neutral text-fg hover:bg-neutral-soft',
      gray:  'border-2 border-line-strong text-fg-muted hover:border-fg hover:text-fg',
      white: 'border-2 border-white text-white hover:bg-white hover:text-primary',
    },
    ghost: {
      primary: 'text-primary hover:bg-primary-soft',
      black: 'text-fg hover:bg-surface-active',
      red:   'text-danger hover:bg-danger-soft',
      slate: 'text-fg-muted hover:bg-neutral-soft',
      gray:  'text-fg-subtle hover:bg-surface-page hover:text-fg',
      white: 'text-white hover:bg-white/16',
    },
    link: {
      primary: 'text-primary hover:text-primary-hover',
      black: 'text-fg hover:text-primary',
      red:   'text-danger hover:text-danger-hover',
      slate: 'text-fg-muted hover:text-fg',
      gray:  'text-fg-faint hover:text-primary',
      white: 'text-white hover:opacity-75',
    },
  }
  return map[props.variant][props.color]
})

const ACTION_SIZE_CLASSES = {
  xs: 'min-h-8 px-4 text-[11px]',
  sm: 'min-h-[38px] px-5 text-[12px]',
  md: 'min-h-[46px] px-[26px] text-[13px]',
  lg: 'min-h-[52px] px-8 text-[14px]',
  xl: 'min-h-[58px] px-9 text-[15px]',
} as const

const QUIET_SIZE_CLASSES = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-2.5 text-lg',
  xl: 'px-7 py-3 text-xl',
} as const

const ICON_SIZE_CLASSES = {
  xs: 'size-5',
  sm: 'size-6',
  md: 'size-7',
  lg: 'size-8',
  xl: 'size-9',
} as const

const sizeClasses = computed(() => {
  if (props.icon) return ICON_SIZE_CLASSES[props.size]
  return isAction.value ? ACTION_SIZE_CLASSES[props.size] : QUIET_SIZE_CLASSES[props.size]
})

const ROUNDED_CLASSES = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '4xl': 'rounded-4xl',
  full: 'rounded-full',
} as const

const ACTION_TYPOGRAPHY =
  'inline-flex items-center justify-center gap-2 font-primary font-extrabold tracking-[0.1em] uppercase'

const FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'

const classes = computed(() => [
  isMuted.value ? MUTED_CLASSES : variantClasses.value,
  sizeClasses.value,
  ROUNDED_CLASSES[props.rounded],
  isAction.value ? ACTION_TYPOGRAPHY : '',
  props.icon ? 'inline-flex items-center justify-center' : '',
  props.wide ? 'w-full' : '',
  FOCUS_RING,
  'cursor-pointer transition disabled:cursor-not-allowed',
  isMuted.value ? '' : 'disabled:opacity-50',
])

</script>

<template>
  <component
      :is="to ? RouterLink : 'button'"
      :to="to"
      :class="classes"
      :disabled="to ? undefined : (disabled || loading)"
  >
    <slot v-if="!loading" />
    <slot v-else name="loading">...</slot>
  </component>
</template>
