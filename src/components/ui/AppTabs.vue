<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import AppChip from './AppChip.vue'

withDefaults(defineProps<{
  tabs: { id: string; label: string; count?: number | string | null; to?: RouteLocationRaw }[]
  modelValue: string
  variant?: 'pill' | 'underline'
  ariaLabel?: string
}>(), {
  variant: 'pill',
})

defineEmits<{
  'update:modelValue': [id: string]
}>()

const UNDERLINE_CLASSES = {
  on: 'border-primary text-primary',
  off: 'border-transparent text-fg-faint hover:text-fg',
} as const

</script>

<template>
  <div
      role="tablist"
      :aria-label="ariaLabel"
      class="flex flex-wrap"
      :class="variant === 'pill' ? 'gap-2' : 'gap-7 border-b border-line'"
  >
    <template v-for="tab in tabs" :key="tab.id">
      <AppChip
          v-if="variant === 'pill'"
          role="tab"
          :aria-selected="tab.id === modelValue"
          :active="tab.id === modelValue"
          :to="tab.to"
          @click="$emit('update:modelValue', tab.id)"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined && tab.count !== null"
              :class="tab.id === modelValue ? 'text-white/70' : 'text-fg-faint'">· {{ tab.count }}</span>
        <slot name="trailing" :tab="tab" />
      </AppChip>

      <component
          :is="tab.to ? RouterLink : 'button'"
          v-else
          :to="tab.to"
          :type="tab.to ? undefined : 'button'"
          role="tab"
          :aria-selected="tab.id === modelValue"
          class="inline-flex items-center gap-2 pb-3.5 -mb-px border-b-2 cursor-pointer transition
                 text-[12px] tracking-[0.12em] uppercase font-extrabold
                 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          :class="tab.id === modelValue ? UNDERLINE_CLASSES.on : UNDERLINE_CLASSES.off"
          @click="$emit('update:modelValue', tab.id)"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined && tab.count !== null" class="text-fg-faint">{{ tab.count }}</span>
        <slot name="trailing" :tab="tab" />
      </component>
    </template>

    <span v-if="$slots.end" class="ml-auto pb-3.5 text-[13px] text-fg-faint">
      <slot name="end" />
    </span>
  </div>
</template>
