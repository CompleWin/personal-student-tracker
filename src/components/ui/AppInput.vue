<script setup lang="ts">
import { computed, type StyleValue, useAttrs, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: 'text' | 'number' | 'email' | 'search' | 'password'
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'field' | 'full'
  disabled?: boolean
  wide?: boolean
  variant?: 'default' | 'cell'
  invalid?: boolean
  inputClass?: string
}>(), {
  type: 'text',
  size: 'md',
  rounded: 'full',
  variant: 'default',
  invalid: false,
  inputClass: 'border border-line-strong bg-transparent focus:border-primary',
})

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const rootClass = computed(() => attrs.class as string | string[] | Record<string, boolean> | undefined)
const rootStyle = computed(() => attrs.style as StyleValue | undefined)

const inputAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs
  return rest
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const slots = useSlots()

const sizeClasses = {
  sm: 'min-h-[38px] px-3.5 text-sm',
  md: 'min-h-[46px] px-4 text-base',
  lg: 'min-h-[52px] px-5 text-base',
} as const

const cellSizeClasses = {
  sm: 'px-1 py-0.5 text-xs',
  md: 'px-2 py-1',
  lg: 'px-3 py-1.5 text-lg',
} as const

const paddingLeft = {
  sm: 'pl-9',
  md: 'pl-11',
  lg: 'pl-12',
} as const

const paddingRight = {
  sm: 'pr-9',
  md: 'pr-11',
  lg: 'pr-12',
} as const

const ROUNDED_CLASSES = {
  field: 'rounded-field',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  '4xl': 'rounded-4xl',
  full: 'rounded-full',
} as const

const inputClasses = computed(() => {
  if (props.variant === 'cell') {
    return [
      'h-full w-full text-center bg-transparent font-code',
      'placeholder:text-fg-faint',
      'focus:outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      cellSizeClasses[props.size],
    ]
  }
  return [
    'w-full transition text-fg',
    'placeholder:text-fg-faint',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    props.invalid ? 'border border-danger bg-danger-soft' : props.inputClass,
    sizeClasses[props.size],
    ROUNDED_CLASSES[props.rounded],
    slots.left ? paddingLeft[props.size] : '',
    slots.right ? paddingRight[props.size] : '',
  ]
})

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div v-if="variant === 'default'"
       class="relative"
       :class="[rootClass, wide ? 'w-full' : '']"
       :style="rootStyle">
  <span v-if="$slots.left"
        class="absolute left-4 inset-y-0 flex items-center text-fg-faint pointer-events-none">
    <slot name="left" />
  </span>
    <input
        v-bind="inputAttrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="onInput"
    />
    <span v-if="$slots.right"
          class="absolute right-4 inset-y-0 flex items-center text-fg-faint">
    <slot name="right" />
  </span>
  </div>

  <input v-else
         v-bind="attrs"
         :type="type"
         :value="modelValue"
         :placeholder="placeholder"
         :disabled="disabled"
         :class="inputClasses"
         @input="onInput"
  />
</template>
