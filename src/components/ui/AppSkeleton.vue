<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  shape?: 'bar' | 'block'
  lines?: number
  progress?: boolean
}>(), {
  shape: 'bar',
  lines: 1,
  progress: false,
})

const SHAPE_CLASSES = {
  bar: 'h-3.5 rounded-full',
  block: 'h-[34px] rounded-xl',
} as const

const LINE_WIDTHS = ['w-full', 'w-[72%]', 'w-[84%]'] as const

const lineClasses = computed(() =>
  Array.from({ length: props.lines }, (_, i) => LINE_WIDTHS[i % LINE_WIDTHS.length]))

</script>

<template>
  <div aria-hidden="true">
    <div v-if="progress" class="h-1.5 mb-7 rounded-full bg-primary-soft overflow-hidden">
      <div class="h-full w-2/5 rounded-full bg-primary animate-pulse" />
    </div>

    <div class="flex flex-col gap-3.5">
      <div
          v-for="(width, i) in lineClasses"
          :key="i"
          class="bg-surface-active"
          :class="[SHAPE_CLASSES[shape], width]"
      />
    </div>
  </div>
</template>
