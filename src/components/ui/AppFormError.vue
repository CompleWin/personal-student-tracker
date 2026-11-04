<script setup lang="ts">

withDefaults(defineProps<{
  message?: string | null
  variant?: 'inline' | 'plate'
}>(), {
  variant: 'inline',
})

const VARIANT_CLASSES = {
  inline: 'mt-2 text-[13px] leading-normal text-danger-ink',
  plate: 'mb-5 rounded-field border border-danger bg-danger-soft px-4 py-3 text-sm leading-normal text-danger-ink',
} as const

</script>

<template>
  <p v-if="message" role="alert" :class="VARIANT_CLASSES[variant]">
    {{ message }}
  </p>
</template>
